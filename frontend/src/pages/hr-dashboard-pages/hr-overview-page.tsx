import { TimeSeriesChart } from "@/components/chart-items/chart-area-interactive"
import { dailyLeaveActivity } from "@/components/chart-items/fake-chart-data"
import { SectionCards } from "@/components/dashboard-items/section-cards"
import { DataTable } from "@/components/table-items/data-table";
import { EmployeeColumns } from "@/components/table-items/employee-table-items/employee-overview-table-columns";
import { fakeEmployees, type EmployeeTableRow } from "@/components/table-items/employee-table-items/employee-overview-table-schema";
import { EmployeeTabs } from "@/components/table-items/employee-table-items/employee-table-tabs";
import type { StatsCardType } from "@/types/staticTypes";
import { CalendarOff, Clock, TrendingUp, Users } from "lucide-react";


//static data for testing

const hrDashboardStats: StatsCardType[] = [
    {
        title: "Total Employees",
        count: 180,
        description: "12 managers · 168 individual contributors",
        icon: <Users />,
        footerHeadline: "4 new joiners this month",
        footerSubtext: "12 managers · 168 ICs",
    },
    {
        title: "On Leave Today",
        count: 24,
        description: "13% of total workforce",
        icon: <CalendarOff />,
        footerHeadline: "13% of workforce is out",
        footerSubtext: "Compared to 18 yesterday",

    },
    {
        title: "Pending Approvals",
        count: 7,
        description: "3 pending for more than 2 days",
        icon: <Clock />,
        footerHeadline: "3 pending for 2+ days",
        footerSubtext: "Needs manager attention",
    },
    {
        title: "Avg. Leave Balance",
        count: 12.4,
        description: "Days remaining per employee",
        icon: <TrendingUp />,
        footerHeadline: "Trending down this quarter",
        footerSubtext: "Per employee, org-wide",
    },
];



function HROverviewPage() {
    return (
        <>
            <SectionCards cardItems={hrDashboardStats} />
            <div className="px-4 lg:px-6">
                <TimeSeriesChart
                    title="Leave activity"
                    description="Last 30 days"
                    data={dailyLeaveActivity}
                    series={[{ key: "onLeave", label: "Employees on leave", color: "var(--primary)" }]}
                    ranges={[
                        { value: "7d", label: "Last 7 days", days: 7 },
                        { value: "30d", label: "Last 30 days", days: 30 },
                        { value: "90d", label: "Last 3 months", days: 90 },
                    ]}
                    defaultRange="30d"
                />

            </div>
            <DataTable<EmployeeTableRow>
                data={fakeEmployees}
                columns={EmployeeColumns}
                tableTabs={EmployeeTabs}
            />
        </>
    )
}
export default HROverviewPage