
import z from 'zod'

export const HrLeaveRequestTableSchema = z.object({
    id:z.number(),
    name:z.string(),
    startDate:z.date(),
    endDate:z.date(),
    noOfDays:z.number(),
    reason:z.string(),
    status:z.string(),
    review: z.string(), //todo:this needs to be improved for approve and reject
})
