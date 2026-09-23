import type { TableTabs } from "@/types/table";
import type { EmployeeTableRow } from "./employee-overview-table-schema";


export const EmployeeTabs: TableTabs<EmployeeTableRow>[] = [
    {
        value:"all",
        label:"All",
        filter:() => true
    },
    {
        value: "present",
        label: "Present",
        filter: (row:EmployeeTableRow) => row.isActive
    },
    {
        value: "on-leave",
        label: "On Leave",
        filter: (row:EmployeeTableRow) => !row.isActive
    },
   
]