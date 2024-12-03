"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/user-modal-store";
export const ChannelBar = () => {
    const { onOpen } = useModal();
    return (
        <div>
            <Button onClick={() => onOpen("createChannel")} className="w-3/4 m-5 justify-center bg-indigo-800 "> Create Channel</Button>
            <Separator className="bg-zinc-700 rounded-full" />
        </div>
    )
}