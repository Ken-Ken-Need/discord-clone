import { ChannelBar } from "@/components/channels/channel-bar";
import getServerFromID from "@/lib/getServerFromID";
import { ChannelType } from "@/database/typesOfSchemas";
const MainLayout = async ({ children, params }: { children: React.ReactNode, params: { serverID: string } }) => {
    const s = await getServerFromID(params.serverID);
    console.log("channels:", s.channels)
    return (
        <div className="h-full" >
            <div className="h-full w-[300px] bg-indigo-950 text-zinc-50 z-30 flex-col fixed inset-y-0">
                <ChannelBar />
                {s.channels.map((channel: ChannelType) => {
                    return (
                        <div key={String(channel._id)}>{channel.name}</div>
                    )
                })}
            </div>
            <main className="pl-[300px]">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;