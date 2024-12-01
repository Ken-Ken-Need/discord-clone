import getServers from "@/lib/getServers";
import { NavigationAction } from "@/components/ui/navigation/navigation-actions";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerType } from "@/database/typesOfSchemas";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";

const NavigationBar = async () => {
    const user = await currentProfile();
    if (!user) {
        return redirect("/");
    }
    const serverList = await getServers();
    return (
        <div className="space-y-4 flex flex-col items-center 
        h-full text-primary w-full bg-[#1E1F22] py-3 text-zinc-50">
            <NavigationAction />
            <Separator className="bg-zinc-300 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1">
                {serverList.map((server: ServerType) =>
                    <div key={server._id} className="text-zinc-50 mb-4">
                        <NavigationItem id={String(server._id)} name={server.name} />
                    </div>
                )}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <UserButton appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                }} />
            </div>
        </div>
    )
}

export default NavigationBar;