import connectDB from "@/database/connectDB"
import { Channel } from "@/database/models";

const getChannelFromID = async (channelID: string) => {
    await connectDB();
    const channel = Channel.findOne({ _id: channelID });

    return channel;

}

export default getChannelFromID;