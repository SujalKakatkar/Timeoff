import z from 'zod'

export const BaseEmployeeTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.number(),
    email: z.email(),
    dept: z.string(),
    isActive: z.boolean()
})