

import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { DragHandle } from "../table-draggable";
import { CircleCheckIcon, EllipsisVerticalIcon, LoaderIcon } from "lucide-react";
import type { EmployeeTableSchema } from "./employee-table-schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof EmployeeTableSchema>
>()

export const EmployeeColumns = columnHelper.columns([
    columnHelper.display({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    }),
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
    columnHelper.accessor("name", {
        header: "Employee Name",
        cell: ({ row }) => {
            return <h1>{row.original.name}</h1>
        },
        enableHiding: false,
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
            <div className="w-32">
                <h1 >
                    {row.original.email}
                </h1>
            </div>
        ),
    }),
    columnHelper.accessor("address", {
        header: "Address",
        cell: ({ row }) => (
            
            <p>{row.original.address}</p>
        ),
    }),
    columnHelper.accessor("phone", {
        header: "Phone",
        cell: ({ row }) => (
            <h1>{row.original.phone}</h1>
        ),
    }),
    columnHelper.accessor("dept", {
        header: "Department",
        cell: ({ row }) => (
           <h1>{row.original.dept}</h1>
        ),
    }),
    //
    columnHelper.accessor("isActive", {
        header: "Active",
        cell: ({ row }) => {
            return <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.isActive ? (
                    <>
                        <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
                        <span>Active</span>
                    </>
                ) : (
                    <>
                            <LoaderIcon
                            />
                            <span>Not Active</span>
                    </>
                )}

            </Badge>
        },
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