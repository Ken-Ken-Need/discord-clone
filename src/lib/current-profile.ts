import { auth } from "@clerk/nextjs/server";
import { User } from "@/database/models";
import connectDB from "@/database/connectDB";

export const currentProfile = async () => {
    await connectDB();
    const { userId } = await auth();
    if (!userId) {
        return;
    }

    const user = await User.findOne({ userID: userId });
    return user
}