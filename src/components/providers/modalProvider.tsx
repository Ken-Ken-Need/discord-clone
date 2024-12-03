"use client";
import { CreateServerModal } from "@/components/ui/modals/createServerModal";
import { useEffect, useState } from "react";
import { CreateChannelModal } from "../ui/modals/createChannelModal";
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <CreateServerModal />
            <CreateChannelModal />
        </>
    )
}