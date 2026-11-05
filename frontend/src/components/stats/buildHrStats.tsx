import type { StatsCardType, HrStatsType } from "@/types/types";
import { CalendarOff, ClipboardCheck, UserCog, Users } from "lucide-react";

export function buildHrStats(data: HrStatsType): StatsCardType[] {
    const { totalEmployees, managers, onLeaveToday, pendingLeaveRequests } = data;

    return [
        {
            title: "Total Employees",
            count: totalEmployees,
            icon: <Users />,
            footerHeadline: "Active headcount",
            footerSubtext: "Includes managers and individual contributors",
        },
        {
            title: "Managers",
            count: managers,
            icon: <UserCog />,
            footerHeadline: "People leaders",
            footerSubtext: "Employees with direct reports",
        },
        {
            title: "On Leave Today",
            count: onLeaveToday,
            icon: <CalendarOff />,
            footerHeadline: "Approved leaves only",
            footerSubtext: "Pending requests not counted",
        },
        {
            title: "Pending Approvals",
            count: pendingLeaveRequests,
            icon: <ClipboardCheck />,
            footerHeadline: "Awaiting manager action",
            footerSubtext: "Review and approve or reject",
        },
    ];
}