import type { TableTabs } from "@/types/table";
import type { LeaveHistoryTableRow } from "./leave-history-table-schema";



export const LeaveHistoryTableTabs: TableTabs<LeaveHistoryTableRow>[] = [
    {
        value: "all",
        label: "All",
        filter: () => true
    },
    {
        value: "pending",
        label: "Pending",
        filter: (row: LeaveHistoryTableRow) => row.status === "PENDING"
    },
    {
        value: "approved",
        label: "Approved",
        filter: (row: LeaveHistoryTableRow) => row.status === "APPROVED"
    },
    {
        value: "rejected",
        label: "Rejected",
        filter: (row: LeaveHistoryTableRow) => row.status === "REJECTED"
    },

]