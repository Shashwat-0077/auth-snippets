"use server";
import * as z from "zod";
import { getPasswordTokenByToken } from "@/data/passwordTokens";
import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generateResetPasswordToken } from "@/lib/tokens";
import { sendRestPasswordVerification } from "@/lib/mail";

export const ResetPassword = async (
    value: z.infer<typeof ResetSchema>
): Promise<{
    type: "error" | "success";
    message: string;
}> => {
    const validationData = ResetSchema.safeParse(value);

    if (validationData.error) {
        return { type: "error", message: "Invalid Email!" };
    }

    const { email } = validationData.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return {
            type: "error",
            message: "Email not found",
        };
    }

    const passwordToken = await generateResetPasswordToken(email);
    await sendRestPasswordVerification(
        passwordToken.email,
        passwordToken.token
    );

    return {
        type: "success",
        message: "Reset email sent",
    };
};
