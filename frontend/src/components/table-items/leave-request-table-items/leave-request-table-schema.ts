
import z from 'zod'

export const LeaveRequestTableSchema = z.object({
    id: z.number(),
    employeeName: z.string(),
    leaveType: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    noOfDays: z.number(),
    reason: z.string(),
    status: z.string(),
    review: z.string(), //todo:this needs to be improved for approve and reject
})


export type LeaveRequestTableRow = z.infer<typeof LeaveRequestTableSchema>