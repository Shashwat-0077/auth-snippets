"use server";

import { RegisterSchema } from "@/schema";
import * as z from "zod";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

// TODO : Look into server actions Progressive enhancement for more good code(idk if its optimize or do something else but it has its pros so do look into it)

/**
 * This is the server action to create a new user and store the information in the database
 * @param {object} values - Takes a object that has name, email and password of the user
 * @returns A Promise that have data like : {type : "error" | "success" , message : string}
 */
export const register = async (
    values: z.infer<typeof RegisterSchema>,
    callbackUrl?: string | null
): Promise<{ type: "error" | "success"; message: string }> => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { type: "error", message: "Invalid Fields!" };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { type: "error", message: "Email already taken" };

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO : Send verification token email

    return { type: "success", message: "User Created!" };
};
