
import z from 'zod'

//todo: this table is used for employee dashboard only
export const LeaveBalanceSchema = z.object({
    id:z.string(),
    typeName:z.string(),
    allocatedDays:z.number(),
    usedDays:z.number(),
    remainingDays:z.number()
})