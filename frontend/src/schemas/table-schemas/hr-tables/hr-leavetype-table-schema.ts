
import z from 'zod'

export const HrLeaveTypeTableSchema=z.object({
    id:z.number(),
    name:z.string(),
    daysPerYear:z.number(),
    isPaid:z.boolean(),
})