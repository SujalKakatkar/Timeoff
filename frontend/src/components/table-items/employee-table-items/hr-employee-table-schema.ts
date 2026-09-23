import z from "zod";
import { BaseEmployeeTableSchema } from "./base-employee-table-schema";


export const HrEmployeeTableSchema = BaseEmployeeTableSchema.extend({
    role: z.enum(["Manager", "employee"]),
    manager: z.string().nullable()
})

export type HrEmployeeTableRow = z.infer<typeof HrEmployeeTableSchema>