
import z from 'zod'

export const HrOverviewTableSchema = z.object({
    id:z.number(),
    name:z.string(),
    manager:z.string(),
    role: z.string(), 
    totalLeaves:z.number(),
    usedLeaves:z.number(),
    remainingLeaves:z.number()
})