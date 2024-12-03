"use client";

import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface ChannelProps {
    channelName: string,
    channelId: string,
    serverID: string,
}
export const ChannelSwitch = ({ channelName, channelId, serverID }: ChannelProps) => {
    const params = useParams();
    const router = useRouter();
    return (
        <div onClick={() => {
            router.push(`/server/${serverID}/${channelId}`)
        }} className={cn("text-zinc-400 h-[36px] text-xl m-1 pl-3 transition-all  hover:bg-slate-800 hover:text-zinc-300", {
            "bg-slate-600 text-zinc-200 rounded-full": (params.channelID === channelId),
        })} ><b className="m-1">#</b>{channelName}</div>
    )
}