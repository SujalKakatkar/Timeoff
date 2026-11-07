import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { DragHandle } from "../table-draggable";
import { CircleCheckIcon, EllipsisVerticalIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { HrEmployeeTableSchema } from "./hr-employee-table-schema";



export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof HrEmployeeTableSchema>
>()

export const HrEmployeeColumns = columnHelper.columns([
    columnHelper.display({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.userId} />,
    }),

    columnHelper.accessor("userId", {
        header: "Employee Id",
        cell: ({ row }) => {
            return <h1>{row.original.userId}</h1>
        },
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
    columnHelper.accessor("active", {
        header: "Active",
        cell: ({ row }) => {
            return <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.active ? (
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


    columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.role}
            </Badge>
        ),
    }),
    columnHelper.accessor("manager", {
        header: "Manager",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.manager}
            </Badge>
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
                            onClick={e => e.stopPropagation()}
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