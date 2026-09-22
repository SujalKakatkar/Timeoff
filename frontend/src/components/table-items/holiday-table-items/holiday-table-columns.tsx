

import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import {  EllipsisVerticalIcon } from "lucide-react";
import type { HolidayTableSchema } from "./holiday-table-schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof HolidayTableSchema>
>()

export const HolidayColumns = columnHelper.columns([

    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={
                        table.getIsSomePageRowsSelected() &&
                        !table.getIsAllPageRowsSelected()
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor("id", {
        header: "Holiday id",
        cell: ({ row }) => {
            return <h1>{row.original.id}</h1>
        },
        enableHiding: false,
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
    columnHelper.accessor("date", {
        header: "Date",
        cell: ({ row }) => (

            <p>{row.original.date.toString()}</p>
        ),
    }),
    

    columnHelper.display({
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            className="flex size-8 text-muted-foreground data-open:bg-muted"
                            size="icon"
                        />
                    }
                >
                    <EllipsisVerticalIcon
                    />
                    <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }),
]) 