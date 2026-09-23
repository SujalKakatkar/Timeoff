import type z from "zod";
import { BaseEmployeeTableSchema } from "./base-employee-table-schema";


export const ManagerEmployeeTableSchema = BaseEmployeeTableSchema.omit({ dept: true })

export type ManagerEmployeeRow = z.infer<typeof ManagerEmployeeTableSchema>