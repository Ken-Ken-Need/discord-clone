import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import ChatHeader from "@/components/chat/chatHeader";
import { currentProfile } from "@/lib/current-profile";
import getChannelFromID from "@/lib/getChannelFromID";
import getServerFromID from "@/lib/getServerFromID";
import { Schema } from "mongoose";
import { any, string, unknown } from "zod";

interface ChannelPageProps {
    params: {
        serverID: string;
        channelID: string;
    }
}
const ChannelPage = async ({ params }: ChannelPageProps) => {
    const { channelID, serverID } = await params;
    const channel = await getChannelFromID(channelID);
    const server = await getServerFromID(serverID);
    const user = await currentProfile();

    const member = server.members.filter((m: { user: Schema.Types.ObjectId; }) => String(m.user) === String(user._id))[0];


    return (
        <div className="bg-[#313338] flex flex-col h-full text-white">
            <ChatHeader />
            <div className="flex-1">
                <ChatMessages
                    member={{
                        _id: String(member._id),
                        name: member.className,
                        user: user.username,
                    }}
                    name={channel.name}
                    chatID={String(channel._id)}
                    type="channel"
                    apiUrl="/api/messages"
                    socketUrl="/api/socket/messages"
                    socketQuery={{
                        channelID: channelID,
                        serverID: serverID,
                    }}
                    paramKey="channelID"
                    paramValue={channelID}
                />
            </div>

            <ChatInput name={channel.name} type="channel" apiUrl="/api/socket/messages" query={{
                channelID: String(channel._id),
                serverID: String(channel.server),
            }} />
        </div>
    )
}

export default ChannelPage;