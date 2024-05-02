"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
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
            switch (error.type) {
                //cspell:disable-next-line
                case "CredentialsSignin":
                    return { type: "error", message: "Invalid Credentials" };
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
