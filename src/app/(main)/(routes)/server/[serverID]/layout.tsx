import { ChannelBar } from "@/components/channels/channel-bar";
import getServerFromID from "@/lib/getServerFromID";
import { ChannelType } from "@/database/typesOfSchemas";
import { ChannelSwitch } from "@/components/channels/channel-switch";
import { Separator } from "@/components/ui/separator";
const MainLayout = async ({ children, params }: { children: React.ReactNode, params: { serverID: string } }) => {
    const { serverID } = await params;
    const s = await getServerFromID(serverID);
    return (
        <div className="h-full" >
            <div className="h-full w-[300px] bg-slate-900 text-zinc-50 z-30 flex-col fixed inset-y-0">
                <ChannelBar />
                <Separator className="bg-zinc-700 rounded-full" />
                {s.channels.map((channel: ChannelType) => {
                    return (
                        <ChannelSwitch key={String(channel._id)} channelId={String(channel._id)} serverID={serverID} channelName={channel.name} />
                    )
                })}
            </div>
            <main className="pl-[300px] w-full h-screen fixed">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;