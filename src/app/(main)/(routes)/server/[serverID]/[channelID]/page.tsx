import { ChatInput } from "@/components/chat/chat-input";
import ChatHeader from "@/components/chat/chatHeader";
import getChannelFromID from "@/lib/getChannelFromID";

interface ChannelPageProps {
    params: {
        serverID: string;
        channelID: string;
    }
}
const ChannelPage = async ({ params }: ChannelPageProps) => {
    const { channelID } = await params;
    const channel = await getChannelFromID(channelID);

    return (
        <div className="bg-[#313338] flex flex-col h-full text-white">
            <ChatHeader />
            <div className="flex-1">Future messages</div>
            <ChatInput name={channel.name} type="channel" apiUrl="/api/socket/messages" query={{
                channelID: String(channel._id),
                serverID: String(channel.server),
            }} />
        </div>
    )
}

export default ChannelPage;