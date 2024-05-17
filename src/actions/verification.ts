"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const EmailVerification = async (
    token: string
): Promise<{
    type: "error" | "success";
    message: string;
}> => {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken)
        return { type: "error", message: "Tokens does not exists" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { type: "error", message: "Token has expired" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser)
        return { type: "error", message: "Email does not exists" };

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return {
        type: "success",
        message: "Email verified",
    };
};
