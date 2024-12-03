import connectDB from "@/database/connectDB"
import { Server } from "@/database/models";

const getServerFromID = async (serverID: string) => {
    await connectDB();
    const server = Server.findOne({ _id: serverID }).populate('channels').exec();
    return server;
}

export default getServerFromID;