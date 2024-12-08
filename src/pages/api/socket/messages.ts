import { Channel, Message, Server } from "@/database/models";
import { NextResponseServerIO } from "@/database/socketTypes";
import { currentProfilePage } from "@/lib/current-profile-pages";
import { Schema } from "mongoose";
import { NextApiRequest } from "next";
const handler = async (req: NextApiRequest, res: NextResponseServerIO) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const user = await currentProfilePage(req);
        const { content } = req.body;
        const { serverID, channelID } = req.query;

        if (!user) {
            return res.status(401).json({ error: "Unauthorzied" });
        }

        if (!serverID) {
            return res.status(400).json({ error: "ServerID missing" });
        }

        if (!channelID) {
            return res.status(400).json({ error: "ChannelID missing" });
        }

        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }

        const server = await Server.findOne({ _id: serverID }).populate('members');

        if (!server) {
            return res.status(404).json({ error: "Server not found" });
        }

        const channel = await Channel.findOne({ _id: channelID });

        if (!channel) {
            return res.status(404).json({
                error: "Channel not found"
            })
        }

        const member = server.members.filter((m: { user: Schema.Types.ObjectId }) => String(m.user) === String(user._id))[0];

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const message = new Message({
            content: content,
            channel: channel,
            member: member,
        })
        await message.save();

        const channelKey = `chat:${channelID} :messages`;
        res?.socket.server?.io?.emit(channelKey, message);

    } catch (e) {
        console.log("[MESSAGE_POST]", e);
        return res.status(500).json({ message: "Internal error" });
    }
}

export default handler;