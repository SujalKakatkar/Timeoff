import z from 'zod'

export const BaseEmployeeTableSchema = z.object({
    userId: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.number(),
    email: z.email(),
    dept: z.string(),
    active: z.boolean()
})