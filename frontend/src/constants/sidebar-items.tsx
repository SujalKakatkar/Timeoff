import {
    LayoutDashboardIcon,
    FileChartColumnIcon,
    Tag,
    ClipboardList,
    CalendarDays,
    Users,
    UserRound,
    FilePlus,
    History,
    Wallet,
} from "lucide-react"
import type { SidebarItem } from "@/types/sidebar"

export const managerSidebarItems: SidebarItem[] = [
    { title: "Overview", url: "/manager", icon: <LayoutDashboardIcon /> },
    { title: "Leave Requests", url: "/manager/leave-requests", icon: <ClipboardList /> },
    { title: "Leave Types", url: "/manager/leave-types", icon: <Tag /> },
    { title: "Holidays", url: "/manager/holidays", icon: <CalendarDays /> },
    { title: "Reports", url: "/manager/reports", icon: <FileChartColumnIcon /> },
    { title: "Profile", url: "/manager/profile", icon: <UserRound /> },
]

export const EmployeeSidebarItems: SidebarItem[] = [
    { title: "Overview", url: "/employee", icon: <LayoutDashboardIcon /> },
    { title: "Apply for Leave", url: "/employee/create-leave", icon: <FilePlus /> },
    { title: "Leave History", url: "/employee/leave-history", icon: <History /> },
    { title: "Leave Balance", url: "/employee/leave-balance", icon: <Wallet /> },
    { title: "Holidays", url: "/employee/holidays", icon: <CalendarDays /> },
    { title: "Reports", url: "/employee/reports", icon: <FileChartColumnIcon /> },
    { title: "Profile", url: "/employee/profile", icon: <UserRound /> },
]

export const HRSidebarItems: SidebarItem[] = [
    { title: "Overview", url: "/hr", icon: <LayoutDashboardIcon /> },
    { title: "Employees", url: "/hr/employees", icon: <Users /> },
    { title: "Managers", url: "/hr/managers", icon: <UserRound /> },
    { title: "Leave Requests", url: "/hr/leave-requests", icon: <ClipboardList /> },
    { title: "Leave Types", url: "/hr/leave-types", icon: <Tag /> },
    { title: "Holidays", url: "/hr/holidays", icon: <CalendarDays /> },
    { title: "Reports", url: "/hr/reports", icon: <FileChartColumnIcon /> },
    { title: "Profile", url: "/hr/profile", icon: <UserRound /> },
]
