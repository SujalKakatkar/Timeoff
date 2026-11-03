import { TimeSeriesChart } from "@/components/chart-items/chart-area-interactive"
import { SectionCards } from "@/components/dashboard-items/section-cards"
import { DataTable } from "@/components/table-items/data-table";
import { EmployeeColumns } from "@/components/table-items/employee-table-items/employee-overview-table-columns";
import { type EmployeeTableRow } from "@/components/table-items/employee-table-items/employee-overview-table-schema";
import { EmployeeTabs } from "@/components/table-items/employee-table-items/employee-overview-table-tabs";

import { fakeEmployees } from "@/fake-data/fake-data";
import { useHRStore } from "@/store/useHRStore";
import { useEffect, useState } from "react";
import { buildHrStats } from "@/components/stats/buildHrStats";

function HROverviewPage() {
    const [days, setDays] = useState<number>(7);
    
    const getStats = useHRStore(s => s.getStats)
    const stats = useHRStore(s => s.stats)
    const getChartData = useHRStore(s => s.getChartData);
    const chartData = useHRStore(s => s.chartData)
    useEffect(() => {
        getStats();
    }, [])
    useEffect(() => {
        getChartData(days);
    }, [days, getChartData])

    return (
        <>
            {stats && <SectionCards cardItems={buildHrStats(stats)} />}
            <div className="px-4 lg:px-6">
                <TimeSeriesChart
                    title="Leave activity"
                    description="Last 30 days"
                    data={chartData}
                    days={days}
                    setDays={setDays}
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