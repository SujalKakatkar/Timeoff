import type { TableTabs } from "@/types/table";
import type { LeaveRequestTableRow } from './leave-request-table-schema'


export const LeaveRequestTableTabs: TableTabs<LeaveRequestTableRow>[] = [
    {
        value: "pending",
        label: "Pending",
        filter: (row: LeaveRequestTableRow) => row.status === "PENDING"
    },
    {
        value: "approved",
        label: "Approved",
        filter: (row: LeaveRequestTableRow) => row.status === "APPROVED"
    },
    {
        value: "rejected",
        label: "Rejected",
        filter: (row: LeaveRequestTableRow) => row.status === "REJECTED"
    },

]