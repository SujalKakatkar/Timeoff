import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { DragHandle } from "../table-draggable";
import type { LeaveRequestTableSchema } from "./leave-request-table-schema";
import { Badge } from "@/components/ui/badge";
import { CircleCheckIcon, CircleX, LoaderIcon } from "lucide-react";

export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof LeaveRequestTableSchema>
>()

export const LeaveRequestTableColumns = columnHelper.columns([
    columnHelper.display({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    }),

    columnHelper.accessor("employeeName", {
        header: "Name",
        cell: ({ row }) => (
            <div className="w-32">
                <h1 >
                    {row.original.employeeName}
                </h1>
            </div>
        ),
    }),
    columnHelper.accessor("leaveType", {
        header: "Leave Type",
        cell: ({ row }) => (

            <p>{row.original.leaveType.toString()}</p>
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

    columnHelper.accessor("noOfDays", {
        header: "Used Days",
        cell: ({ row }) => (

            <p>{row.original.noOfDays.toString()}</p>
        ),
    }),
    columnHelper.accessor("reason", {
        header: "Remaining Days",
        cell: ({ row }) => (

            <p>{row.original.reason.toString()}</p>
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

    //todo: anther review with select input for approve or reject


]) 