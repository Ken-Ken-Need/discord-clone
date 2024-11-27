import { currentProfile } from "./current-profile";
const getServers = async () => {
    const user = await currentProfile();
    console.log("In getServers:", user.servers)
    return user.servers;
}

export default getServers;