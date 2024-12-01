const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full" >
            <div className="h-full w-[300px] bg-indigo-950 text-zinc-50 z-30 flex-col fixed inset-y-0">
                channels
            </div>
            <main className="pl-[300px]">
                {children}
            </main>
        </div>
    )
}

export default MainLayout;