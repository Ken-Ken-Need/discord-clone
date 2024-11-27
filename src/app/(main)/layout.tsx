import NavigationBar from "@/components/ui/navigation/navigation-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationBar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default MainLayout;