import { LayoutDashboardIcon, FileChartColumnIcon, Tag, ClipboardList, CalendarDays, Users } from "lucide-react"
import type { SidebarItem } from "@/types/sidebar"

export const managerSidebarItems: SidebarItem[] = [
    { title: "Overview", url: "/manager", icon: <LayoutDashboardIcon /> },
    { title: "Leave Requests", url: "/manager/leave-requests", icon: <ClipboardList /> },
    { title: "Leave Types", url: "/manager/leave-types", icon: <Tag /> },
    { title: "Holidays", url: "/manager/holidays", icon: <CalendarDays /> },
    { title: "Reports", url: "/manager/reports", icon: <FileChartColumnIcon /> },
]

export const EmployeeSidebarItems: SidebarItem[] = [
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
export const HRSidebarItems: SidebarItem[] = [
    {
        title: "overview",
        url: "/hr",
        icon: (
            <LayoutDashboardIcon
            />
        ),
    },
    {
        title: "Managers",
        url: "/hr/managers",
        icon: (
            <Users />
        )
    },
    {
        title: "Leave Requests",
        url: "/hr/leave-requests",
        icon: (
            <ClipboardList
            />
        ),
    },
    {
        title: "Leave Types",
        url: "/hr/leave-types",
        icon: (
            <Tag
            />
        ),
    },
    {
        title: "Holidays",
        url: "/hr/holidays",
        icon: (
            <CalendarDays
            />
        ),
    },
    {
        title: "Reports",
        url: "/hr/reports",
        icon: (
            <FileChartColumnIcon
            />
        ),
    },

]