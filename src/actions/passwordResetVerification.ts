"use server";

import { getPasswordTokenByToken } from "@/data/passwordTokens";
import { getUserByEmail } from "@/data/user";

export const ResetPasswordVerify = async (token: string) => {
    const existingToken = await getPasswordTokenByToken(token);

    if (!existingToken)
        return { type: "error", message: "Token does not exists" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { type: "error", message: "Token has expired" };

    const existingUser = getUserByEmail(existingToken.email);
    if (!existingUser)
        return { type: "error ", message: "Email does not exists" };
};
