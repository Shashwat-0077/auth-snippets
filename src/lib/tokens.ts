import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { PasswordReset, VerificationToken } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { getPasswordTokenByEmail } from "@/data/passwordTokens";

export const generateVerificationToken = async (
    email: string
): Promise<VerificationToken> => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        // if the user exists we will delete the previous token
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // we will create a new verification token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};

export const generateResetPasswordToken = async (
    email: string
): Promise<PasswordReset> => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 15);

    const existingToken = await getPasswordTokenByEmail(email);

    if (existingToken) {
        await db.passwordReset.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordToken = await db.passwordReset.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordToken;
};
