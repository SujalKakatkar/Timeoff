

import { createColumnHelper } from "@tanstack/react-table";
import type z from "zod";
import type { features } from "../table-features";
import { CircleCheckIcon, LoaderIcon } from "lucide-react";
import type { EmployeeTableSchema } from "./employee-overview-table-schema";
import { Badge } from "@/components/ui/badge"




export const columnHelper = createColumnHelper<
    typeof features,
    z.infer<typeof EmployeeTableSchema>
>()

export const EmployeeColumns = columnHelper.columns([
    columnHelper.accessor("userId", {
        header: "Employee Id",
        cell: ({ row }) => {
            return <div className="w-50">
                <h1 className="pl-2" >
                    {row.original.userId}
                </h1>
            </div>
        },
        enableHiding: false,
    }),
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
   
    columnHelper.accessor("dept", {
        header: "Department",
        cell: ({ row }) => (
           <h1>{row.original.dept}</h1>
        ),
    }),
    //
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
    // columnHelper.display({
    //     id: "actions",
    //     cell: () => (
    //         <DropdownMenu>
    //             <DropdownMenuTrigger
    //                 render={
    //                     <Button
    //                         variant="ghost"
    //                         className="flex size-8 text-muted-foreground data-open:bg-muted"
    //                         size="icon"
    //                     />
    //                 }
    //             >
    //                 <EllipsisVerticalIcon
    //                 />
    //                 <span className="sr-only">Open menu</span>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end" className="w-32">
    //                 <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 <DropdownMenuItem>Favorite</DropdownMenuItem>
    //                 <DropdownMenuSeparator />
    //                 <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     ),
    // }),
]) 