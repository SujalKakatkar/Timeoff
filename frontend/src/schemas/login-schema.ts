import z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Username is required'),

    password: z
        .string()
        .trim()
        .min(1, 'Password is required'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>