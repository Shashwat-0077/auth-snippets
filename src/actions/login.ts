"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

// TODO : Look into server actions Progressive enhancement for more good code(idk if its optimize or do something else but it has its pros so do look into it)

/**
 * This is the server action to get the user logged in
 * @param {object} values - Takes a object that has email and password of the user
 * @param {string} callbackUrl - Give the url that you want ot redirect to after login
 * @returns A Promise that have data like : {type : "error" | "success" , message : string}
 */
export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
): Promise<{
    type: "error" | "success";
    message: string;
}> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success)
        return { type: "error", message: "Invalid Fields!" };

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    // Check if the user exists or
    // check if user is mistakenly trying to login with Credential login when they have account in OAuth login
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            type: "error",
            message: "Invalid Credentials",
        };
    }

    // check if the email is verified or not
    if (!existingUser.emailVerified) {
        // check the password input by user, matches the password stored in the database
        // if yes then ONLY send the new verification token
        const passwordsMatch = await compare(password, existingUser.password);
        if (!passwordsMatch) {
            return {
                type: "error",
                message: "Invalid Credentials",
            };
        }

        const verificationToken = await generateVerificationToken(
            existingUser.email
        );
        sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {
            type: "success",
            message: "Confirmation Email Sent!",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            // By default only URLs on the same host as the origin are allowed
            // according to the auth.js documentation
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            // this run when the user inputs the wrong email or password
            switch (error.type) {
                //cspell:disable-next-line
                case "CredentialsSignin":
                    return {
                        type: "error",
                        message: "Invalid Credentials",
                    };
                default:
                    return { type: "error", message: "Something Went Wrong" };
            }
        }

        // Error is important to throw, otherwise signIn function will not redirect
        // not sure if its a bug or a behavior but we still need to do this
        throw error;
    }

    return { type: "success", message: "Email Sent!" };
};
