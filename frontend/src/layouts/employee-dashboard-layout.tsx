// hr-dashboard-layout.tsx
import { AppSidebar } from "@/components/dashboard-items/app-sidebar"
import { SiteHeader } from "@/components/dashboard-items/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

import { LayoutDashboardIcon, FileChartColumnIcon, Tag, ClipboardList, CalendarDays } from "lucide-react"
import type { SidebarItem, sidebarUserData } from "@/types/sidebar"

const userData: sidebarUserData = {
    fullName: "sujal",
    email: "sujal@example.com",
}

const EmployeeSidebarItems: SidebarItem[] = [
    {
        title: "overview",
        url: "/employee",
        icon: (
            <LayoutDashboardIcon
            />
        ),
    },
    {
        title: "Add Leave Request",
        url: "/employee/create-leave",
        icon: (
            <ClipboardList
            />
        ),
    },
    {
        title: "Leave Balance",
        url: "/employee/leave-balance",
        icon: (
            <Tag
            />
        ),
    },
    {
        title: "Holidays",
        url: "/employee/holidays",
        icon: (
            <CalendarDays
            />
        ),
    },
    {
        title: "Reports",
        url: "/employee/reports",
        icon: (
            <FileChartColumnIcon
            />
        ),
    },

]

export default function EmployeeDashboardLayout() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar userData={userData} sidebarItems={EmployeeSidebarItems} variant="inset" />
            <SidebarInset>
                <SiteHeader />
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
