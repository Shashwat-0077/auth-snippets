import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { PasswordResetToken, VerificationToken } from "@prisma/client";
import { getPasswordTokenByEmail } from "@/data/passwordTokens";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";

export const generateTwoFactorToken = async (email: string) => {
    // generate a 6 digit random number for 2fa verification
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // lasts for 10 mins
    const expires = new Date(new Date().getTime() + 1000 * 60 * 10);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return twoFactorToken;
};

export const generateVerificationToken = async (
    email: string
): Promise<VerificationToken> => {
    const token = uuidV4();
    // last for an hour
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
): Promise<PasswordResetToken> => {
    const token = uuidV4();
    // lasts for 15 mins
    const expires = new Date(new Date().getTime() + 1000 * 60 * 15);

    const existingToken = await getPasswordTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordToken;
};
