
import { ServerType } from "@/database/typesOfSchemas";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ServerItemProps {
    server: ServerType;
}

const NavigationAction: React.FC<ServerItemProps> = ({ server }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="bg-slate-500 w-[48px] h-[48px] rounded-[24px] text-zinc-100 text-xl hover:rounded-[16px] transition-all overflow-hidden">
                        {server.name}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-opacity-80 bg-black" side="right" sideOffset={15}>
                    {server.name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default NavigationAction;
