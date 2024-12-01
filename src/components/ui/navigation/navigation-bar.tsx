import getServers from "@/lib/getServers";
import { ServerType } from "@/database/typesOfSchemas";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import NavigationAction from "./navigation-actions";



const NavigationBar = async () => {
    const serverList = await getServers();
    return (
        <div className="space-y-4 flex flex-col items-center 
        h-full text-primary w-full bg-[#1E1F22] py-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Plus className="bg-green-800 w-[48px] h-[48px] rounded-[24px] hover:rounded-[16px] transition-all" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-opacity-80 bg-black" side="right" sideOffset={15}>
                        Create a new server
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Separator className="rounded w-3/4 bg-zinc-400" />
            {serverList.map((s: ServerType, index: number) => {
                return (
                    <NavigationAction key={index} server={s} />
                )
            })}
        </div>
    )
}

export default NavigationBar;