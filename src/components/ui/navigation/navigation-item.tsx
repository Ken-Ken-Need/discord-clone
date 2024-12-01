"use client"
import { useParams, useRouter } from "next/navigation";
import {
    cn
} from "@/lib/utils";
import { ActionToolTip } from "@/components/action-tooltip";

interface NavigationItemProps {
    id: string,
    name: string;
}

export const NavigationItem = ({
    id,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
    const onClick = () => {
        router.push(`/server/${id}`)
    }
    return (
        <ActionToolTip side="right" align="center" label={name}>
            <button onClick={onClick} className="group relative flex items-center">
                <div className={cn("absolute left-0 bg-zinc-300 rounded-r-full transition-all w-[4px]", params?.serverID !== id && "group-hover:h-[20px]", params?.serverID === id ? "h-[36px]" : "h-[8px]")}>

                </div>
                <div className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-purple-800 font-bold text-2xl">
                    {name}
                </div>
            </button>
        </ActionToolTip>
    )
}