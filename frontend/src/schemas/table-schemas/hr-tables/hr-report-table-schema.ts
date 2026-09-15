
import z from 'zod'

export const EmployeeReportTableSchema = z.object({
    id:z.string(),
    name:z.string(),
    manager:z.string(),
    role: z.string(), //todo: needs attention while configuration it is enum in backend
    totalLeaves:z.number(),
    usedLeaves:z.number(),
    remainingLeaves:z.number()
})