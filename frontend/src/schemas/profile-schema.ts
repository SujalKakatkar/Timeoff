import z from "zod";



export const ProfileSchema = z.object({


    phone: z
        .string()
        .trim()
        .length(10, "Mobile number must be exactly 10 digits")
        .regex(/^\d{10}$/, "Mobile number must contain only digits"),

    address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .max(100, "Address is too long"),

    // department list not finalized yet — using test values for now
    departmentId: z.string().min(1, "select the department"),
})
export type ProfileSchemaType = z.infer<typeof ProfileSchema>

export const ProfilePayload = ProfileSchema.transform((v) => ({
    phone: v.phone,
    address: v.address,
    departmentId: Number(v.departmentId)
}))

export type ProfilePayloadType = z.infer<typeof ProfilePayload>

