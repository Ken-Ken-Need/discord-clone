import getServers from "@/lib/gerServers";
import { Server } from "@/database/models";
import connectDB from "@/database/connectDB";
import { Avatar } from "@/components/ui/avatar";
import { Schema } from "mongoose";

const ServerPage = async () => {
    await connectDB();
    const serverList = await getServers();
    return (
        <div >
            {serverList.map(async (server: Schema.Types.ObjectId, index: number) => {
                const s = await Server.findOne(server);
                return <Avatar key={index} className="bg-slate-500 text-zinc-100 text-xl m-5" >
                    {s.name}
                </Avatar>;
            })}
        </div>
    )
}

export default ServerPage;