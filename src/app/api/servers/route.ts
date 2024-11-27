import { Channel, Member, Server } from "@/database/models";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        const user = await currentProfile();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }


        const newServer = new Server({
            name: name,
            inviteCode: uuidv4(),
            owner: user._id,
        })
        const savedServer = await newServer.save();

        const newMember = new Member({
            role: 'MOD',
            user: user,
            server: savedServer._id,
        });
        const savedMember = await newMember.save();

        const newChannel = new Channel({
            name: "public",
            server: savedServer._id,
        });
        const savedChannel = await newChannel.save();


        savedServer.members.push(savedMember._id);
        savedServer.channels.push(savedChannel._id);

        user.servers.push(savedServer._id);
        await user.save();
        await savedServer.save();

    } catch (e) {
        console.log("[SERVER POST]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}