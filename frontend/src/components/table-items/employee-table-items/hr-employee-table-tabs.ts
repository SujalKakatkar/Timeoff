import type { TableTabs } from "@/types/types";
import type { HrEmployeeTableRow } from "./hr-employee-table-schema";


export const HrEmployeeTabs: TableTabs<HrEmployeeTableRow>[] = [
    {
        value: "all",
        label: "All",
        filter: () => true
    },
    {
        value: "Managers",
        label: "Managers",
        filter: (row: HrEmployeeTableRow) => row.role == "MANAGER"
    },
    {
        value: "Employee",
        label: "Employee",
        filter: (row: HrEmployeeTableRow) => row.role !== "MANAGER"
    },

]