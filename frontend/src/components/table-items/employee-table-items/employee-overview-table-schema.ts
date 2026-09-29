

import z from 'zod'
import { BaseEmployeeTableSchema } from './base-employee-table-schema';

//

export const EmployeeTableSchema = BaseEmployeeTableSchema
export type EmployeeTableRow = z.infer<typeof EmployeeTableSchema>;


//fake data

