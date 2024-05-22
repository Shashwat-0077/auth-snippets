import { db } from "@/lib/db";

export const getPasswordTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.passwordReset.findUnique({
            where: {
                token,
            },
        });

        return passwordToken;
    } catch {
        return null;
    }
};

export const getPasswordTokenByEmail = async (email: string) => {
    try {
        const passwordToken = await db.passwordReset.findFirst({
            where: {
                email,
            },
        });

        return passwordToken;
    } catch {
        return null;
    }
};
