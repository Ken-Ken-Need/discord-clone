import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { User } from "@/database/models";

export const initialProfile = async () => {
    const curUser = await currentUser();

    if (!curUser) {
        return RedirectToSignIn;
    }

    const user = User.findOne({ userID: curUser.id });
    if (user) {
        return user;
    }

    const newUser = await User.create({
        userID: curUser.id,
        username: `${curUser.firstName} ${curUser.lastName}`,
        email: curUser.emailAddresses[0].emailAddress,
    })

    return newUser;
}