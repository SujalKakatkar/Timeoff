// src/layouts/dashboard-layout.tsx
import { AppSidebar } from "@/components/dashboard-items/app-sidebar"
import { SiteHeader } from "@/components/dashboard-items/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import type { SidebarItem } from "@/types/sidebar"

interface Props {
    sidebarItems: SidebarItem[]
}

export default function DashboardLayout({ sidebarItems }: Props) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar sidebarItems={sidebarItems} variant="inset" />
            <SidebarInset>
                <SiteHeader sidebarItems={sidebarItems} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}