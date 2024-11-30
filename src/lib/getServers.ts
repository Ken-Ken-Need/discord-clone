import { currentProfile } from "./current-profile";
import { redirect } from "next/navigation";
const getServers = async () => {
    const user = await currentProfile();
    if (!user) {
        return redirect('/');
    }
    console.log("In getServers:", user.servers)
    return user.servers;
}

export default getServers;