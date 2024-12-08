"use client";
import { useSocket } from "@/components/providers/socketProvider";
import { Badge } from "@/components/ui/badge";
export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant={"outline"} className="bg-yellow-600 text-white border-none">
                polling every 1s
            </Badge>
        )
    }

    return (
        <Badge variant={"outline"} className="bg-emerald-600 text-white border-none">
            Live: real time updates
        </Badge>
    )
}