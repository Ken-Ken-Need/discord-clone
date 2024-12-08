import { Message } from "@/database/models";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;
export async function GET(req: Request) {
    try {
        const user = await currentProfile();
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor"); // tell the infinite load what to get next. Can be skip or something method 
        const channelID = searchParams.get("channelID");

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!channelID) {
            return new NextResponse("ChannelID missing", { status: 401 });
        }

        let messages = [];
        if (cursor) {
            const message = await Message.findById(cursor);

            messages = await Message.find({ channel: channelID, createdAt: { $lt: message.createdAt } }).limit(MESSAGES_BATCH).populate({
                path: 'member',
                populate: {
                    path: 'user',
                    model: 'User', // Reference to the User model
                }
            }).sort({ createdAt: 1 });
        } else {
            messages = await Message.find({
                channel: channelID
            }).limit(MESSAGES_BATCH).populate({
                path: 'member',
                populate: {
                    path: 'user',
                    model: 'User', // Reference to the User model
                }
            }).sort({ createdAt: -1 });
        }

        let nextCursor = null;
        if (messages.length === MESSAGES_BATCH) {
            nextCursor = String(messages[MESSAGES_BATCH - 1]._id);
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })
    } catch (e) {
        console.log("[MESSAGE GET]", e);
        return new NextResponse("Internal error", { status: 500 })
    }
}