"use client";
import { Fragment } from "react";
import { useChatQuery } from "@/hooks/user-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

interface ChatMessagesProps {
    name: string,
    member: {
        _id: string,
        name: string,
        user: string,
    },
    chatID: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>,
    paramKey: "channelID" | "conversationID",
    paramValue: string,
    type: "channel" | "conversation",
}
export const ChatMessages = ({
    name, member, chatID, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatID}`
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-400">Loading...</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-400">Something went wrong...</p>
            </div>
        )
    }
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <div className="flex flex-col-reverse mt-auto">{data?.pages?.map((group, index) => {
                return (
                    <Fragment key={index}>
                        {group.items.map(m => {
                            return (
                                <div key={String(m._id)}>
                                    {m.content}
                                </div>
                            )
                        })}
                    </Fragment>
                )
            })}</div>
        </div>
    )
}