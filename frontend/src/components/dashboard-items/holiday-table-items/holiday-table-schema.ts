
import z from 'zod'

export const HolidayTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.date()
})