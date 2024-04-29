import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Invalid Email" }),
    password: z.string().min(1, "Password is required"),
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
