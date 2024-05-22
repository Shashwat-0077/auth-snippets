import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, "Minimum of 6 characters are requires"),
    confirmPassword: z.string(),
});

export const ResetSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Invalid Email" }),
});

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Invalid Email" }),
    password: z.string().min(1, "Password is required"),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password too short"),
});
