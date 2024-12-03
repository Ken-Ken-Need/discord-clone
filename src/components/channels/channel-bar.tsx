"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/user-modal-store";
export const ChannelBar = () => {
    const { onOpen } = useModal();
    return (
        <Button onClick={() => onOpen("createChannel")} className="w-3/4 m-5  bg-indigo-800 "> Create Channel</Button>
    )
}