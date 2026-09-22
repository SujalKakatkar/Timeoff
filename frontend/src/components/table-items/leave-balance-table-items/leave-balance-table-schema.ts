
import z from 'zod'

//todo: this table is used for employee dashboard only
//todo: make sure the repose should be match this schema the backend has different one. change the backend response dto
export const LeaveBalanceSchema = z.object({
    id: z.number(),
    typeName: z.string(),
    allocatedDays: z.number(),
    usedDays: z.number(),
    remainingDays: z.number()
})