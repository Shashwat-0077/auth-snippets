"use server";

import { db } from "@/lib/db";
import { LoginSchema } from "@/schema";
import * as z from "zod";

// TODO : Look into server actions Progressive enhancement for more good code(idk if its optimize or do something else but it has its pros so do look into it)

export const login = async (
    values: z.infer<typeof LoginSchema>
): Promise<{ type: "error" | "success"; message: string }> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success)
        return { type: "error", message: "Invalid Fields!" };

    return { type: "success", message: "Email Sent!" };
};
