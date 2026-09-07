import z from "zod";

export const depts = z.enum(["HR", "SALES", "DEV", "MARKETING"]);

export type Dept = z.infer<typeof depts>

export const ProfileSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Minimum 2 characters required")
        .max(50, "Name is too long"),

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
    department: depts,
})


export type ProfileSchemaType =z.infer<typeof ProfileSchema>