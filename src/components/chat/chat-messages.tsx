"use client";
import { AwaitedReactNode, Fragment, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { useChatQuery } from "@/hooks/user-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";

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

function stringToHexColor(input) {
    // Compute a hash code from the input string
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF; // Extract a byte
        color += ('00' + value.toString(16)).slice(-2); // Convert to hex
    }

    return color;
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

    const color = stringToHexColor(member.user);
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <div className="flex flex-col-reverse mt-auto">{data?.pages?.map((group, index) => {
                return (
                    <Fragment key={index}>
                        {group.items.map((m: { _id: string, content: string }) => {
                            return (
                                <div key={String(m._id)} className="m-5">
                                    <div className="flex flex-row">
                                        <div className={`bg-[${color}] w-7 h-7 rounded-full overflow-hidden`}>{member.user}</div>
                                        <div className="pl-1 text-zinc-300">
                                            {member.user}
                                        </div>
                                    </div>
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