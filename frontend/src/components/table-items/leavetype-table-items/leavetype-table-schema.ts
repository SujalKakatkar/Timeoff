
import z from 'zod'

export const leaveTypeTableSchema =z.object({
    id:z.string(),
    name:z.string(),
    allocatedDays:z.number(),
    isPaid:z.boolean(),
})