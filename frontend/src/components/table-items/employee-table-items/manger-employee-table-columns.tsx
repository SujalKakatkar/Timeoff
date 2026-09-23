import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { CircleCheckIcon, LoaderIcon } from "lucide-react";
import type { EmployeeTableSchema } from "./employee-overview-table-schema";
import { Badge } from "@/components/ui/badge";


export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof EmployeeTableSchema>
>()

export const EmployeeColumns = columnHelper.columns([
   
    columnHelper.accessor("name", {
        header: "Employee Name",
        cell: ({ row }) => {
            return <div className="w-50">
                <h1 className="pl-2" >
                    {row.original.name}
                </h1>
            </div>
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
   
]) 