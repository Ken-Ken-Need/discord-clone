"use client";
import { CreateServerModal } from "@/components/ui/modals/createServerModal";
import { useEffect, useState } from "react";
export const ModalProvider = () => {
    console.log("In ModalProvider: this is called")
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
        </>
    )
}