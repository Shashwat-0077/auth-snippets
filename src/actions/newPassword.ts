"use server";

import { getPasswordTokenByToken } from "@/data/passwordTokens";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schema";
import { hash } from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
): Promise<{
    type: "error" | "success";
    message: string;
}> => {
    if (!token) return { type: "error", message: "Invalid link" };

    // check if the fields are correct
    const validationFields = NewPasswordSchema.safeParse(values);
    if (!validationFields.success)
        return {
            type: "error",
            message: "Invalid Fields",
        };

    // check if both the password entered by the user matches
    const { password, confirmPassword } = validationFields.data;
    if (password !== confirmPassword)
        return {
            type: "error",
            message: "Passwords Does not match",
        };

    // check of the token exists
    const existingToken = await getPasswordTokenByToken(token);
    if (!existingToken)
        return {
            type: "error",
            message: "Invalid link",
        };

    console.log({ token: existingToken.expires, now: new Date() });

    // check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired)
        return {
            type: "error",
            message: "Link has been Expired",
        };

    // check if their is user connected to the given token
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser)
        return {
            type: "error",
            message: "Email Does not exists",
        };

    const hashedPassword = await hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordReset.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        type: "success",
        message: "Password Updated!",
    };
};
