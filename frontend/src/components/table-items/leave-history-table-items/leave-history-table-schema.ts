import z from 'zod'

//this table will be for employee to get their history of requests
export const LeaveHistory = z.object({
    id:z.string(),
    leaveType:z.string(),
    startDate:z.date(),
    endDate:z.date(),
    requestedDays:z.number(),
    status:z.string(),
})