import z from 'zod'

//todo:this table will be for employee to get their history of requests
export const LeaveHistorySchema = z.object({
    id: z.string(),
    leaveType: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    requestedDays: z.number(),
    status: z.string(),
})

export type LeaveHistoryTableRow = z.infer<typeof LeaveHistorySchema>