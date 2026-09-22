import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import type { LeaveHistorySchema } from "./leave-history-table-schema";
import { Badge } from "@/components/ui/badge";
import { CircleCheckIcon, CircleX, LoaderIcon } from "lucide-react";


export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof LeaveHistorySchema>
>()

export const LeaveHistoryColumn = columnHelper.columns([

    columnHelper.accessor("leaveType", {
        header: "Type",
        cell: ({ row }) => (
            <div className="w-32">
                <h1 >
                    {row.original.leaveType}
                </h1>
            </div>
        ),
    }),
    columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: ({ row }) => (

            <p>{row.original.startDate.toString()}</p>
        ),
    }),

    columnHelper.accessor("endDate", {
        header: "End Date",
        cell: ({ row }) => (

            <p>{row.original.endDate.toString()}</p>
        ),
    }),
    columnHelper.accessor("requestedDays", {
        header: "Requested Days",
        cell: ({ row }) => (

            <p>{row.original.requestedDays.toString()}</p>
        ),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.status === "PENDING" ? (
                    <LoaderIcon
                    />
                ) : (
                    row.original.status === "APPROVED" ? (

                        <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
                    ) : (
                        <CircleX className="fill-destructive dark:fill-destructive" />
                    )

                )}
                {row.original.status}
            </Badge>
        ),
    }),

]) 