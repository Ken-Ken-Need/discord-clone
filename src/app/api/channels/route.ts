import { Channel } from "@/database/models";
import { currentProfile } from "@/lib/current-profile";
import getServerFromID from "@/lib/getServerFromID";
import { NextResponse } from "next/server";
import { URL } from 'url';

export async function POST(req: Request) {
    try {
        // Parse the URL and extract the query parameters
        const url = new URL(req.url);
        const serverID = url.searchParams.get('serverID');

        // Parse the request body
        const { name } = await req.json();
        const user = await currentProfile();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await getServerFromID(String(serverID));
        const newChannel = new Channel({
            name: name,
            server: server._id,
        });
        const savedChannel = await newChannel.save();

        server.channels.push(savedChannel.id);
        await server.save();
        return new NextResponse("Channel created", { status: 200 });
    } catch (e) {
        console.log("[CHANNEL POST]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
