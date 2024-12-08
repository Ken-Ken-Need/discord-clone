import qs from "querystring";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSocket } from "@/components/providers/socketProvider"

interface ChatQueryProps {
    queryKey: string,
    apiUrl: string,
    paramKey: "channelID" | "conversationID"
    paramValue: string
}

export const useChatQuery = ({
    queryKey, apiUrl, paramKey, paramValue
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = apiUrl + "?" + qs.stringify(
            {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        )

        const res = await fetch(url);
        return res.json();
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: undefined,
        refetchInterval: isConnected ? false : 1000,
    });


    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
}