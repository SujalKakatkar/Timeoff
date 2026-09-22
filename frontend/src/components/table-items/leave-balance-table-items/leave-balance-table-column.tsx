import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import type { LeaveBalanceSchema } from "./leave-balance-table-schema";

export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof LeaveBalanceSchema>
>()

export const LeaveBalanceColumns = columnHelper.columns([
    columnHelper.accessor("typeName", {
        header: "Type",
        cell: ({ row }) => (
            <div className="w-32">
                <h1 >
                    {row.original.typeName}
                </h1>
            </div>
        ),
    }),
    columnHelper.accessor("allocatedDays", {
        header: "Allocated Days",
        cell: ({ row }) => (

            <p>{row.original.allocatedDays.toString()}</p>
        ),
    }),

    columnHelper.accessor("usedDays", {
        header: "Used Days",
        cell: ({ row }) => (

            <p>{row.original.usedDays.toString()}</p>
        ),
    }),
    columnHelper.accessor("remainingDays", {
        header: "Remaining Days",
        cell: ({ row }) => (

            <p>{row.original.remainingDays.toString()}</p>
        ),
    }),

]) 