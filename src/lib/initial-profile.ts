import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { User } from "@/database/models";
import connectDB from "@/database/connectDB";

export const initialProfile = async () => {
    await connectDB();
    const curUser = await currentUser();

    if (!curUser) {
        return RedirectToSignIn;
    }

    // Await the findOne operation
    const user = await User.findOne({ userID: curUser.id });
    if (user) {
        return user;
    }

    // Create and save the new user
    const newUser = new User({
        userID: curUser.id,
        username: `${curUser.firstName} ${curUser.lastName}`,
        email: curUser.emailAddresses[0].emailAddress,
    });

    await newUser.save(); // Save the new user to the database

    return newUser;
}
