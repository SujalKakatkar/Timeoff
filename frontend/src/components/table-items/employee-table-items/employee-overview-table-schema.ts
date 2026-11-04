
import z from 'zod'


export const EmployeeTableSchema = z.object({
    userId: z.number(),
    name: z.string(),
    dept: z.string(),
    active: z.boolean()
})
export type EmployeeTableRow = z.infer<typeof EmployeeTableSchema>;
