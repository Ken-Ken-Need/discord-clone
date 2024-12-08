import { getAuth } from "@clerk/nextjs/server";
import { User } from "@/database/models";
import connectDB from "@/database/connectDB";
import { NextApiRequest } from "next";
export const currentProfilePage = async (req: NextApiRequest) => {
    await connectDB();
    const { userId } = await getAuth(req);
    if (!userId) {
        return;
    }

    const user = await User.findOne({ userID: userId }).populate('servers').exec();
    return user
}