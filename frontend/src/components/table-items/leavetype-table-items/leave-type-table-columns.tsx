import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { DragHandle } from "../table-draggable";
import { Badge } from "@/components/ui/badge";
import type { leaveTypeTableSchema } from "./leave-type-table-schema";

export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof leaveTypeTableSchema>
>()

export const leaveTypeTableColumns = columnHelper.columns([
    columnHelper.display({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    }),

    columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row }) => (
            <div className="w-32">
                <h1 >
                    {row.original.name}
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

    columnHelper.accessor("isPaid", {
        header: "Paid?",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.isPaid ? "Paid" : "Not Paid"}
            </Badge>
        ),
    }),

    
]) 