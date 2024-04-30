import { db } from "@/lib/db";

/**
 * This function fetch the user from database by email if exists otherwise returns null
 */
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error(Error);
        return null;
    }
};

/**
 * This function fetch the user from database by user ID if exists otherwise returns null
 */
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};
