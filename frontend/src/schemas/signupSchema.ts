import { z } from "zod";

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(2, "username must be at least 2 characters")
            .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .max(20),

        email: z
            .string()
            .trim()
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(50, "Password must be at most 50 characters")
            // .refine((val) => val === val.trim(), {
            //     message: "Password cannot start or end with a space",
            // })
            // .refine((val) => /\S/.test(val), {
            //     message: "Password cannot be blank or only whitespace",
            // })
            // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            // .regex(/[0-9]/, "Password must contain at least one number")
            // .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
            ,

        confirmPassword: z
            .string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignupSchemaType = z.infer<typeof signupSchema>;