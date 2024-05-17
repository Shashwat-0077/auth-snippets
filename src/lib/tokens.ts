import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { VerificationToken } from "@prisma/client";

export const generateVerificationToken = async (
    email: string
): Promise<VerificationToken> => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

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
