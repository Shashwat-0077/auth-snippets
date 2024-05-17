import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

//? Quick Tip : Everything that you implement in login or register (server actions/routes) you should also implement that in the next-auth callbacks or events as much as you can for the total or the high security, cause anybody can access the server links and can bypass the server action layer

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            // we are doing this without any checks because we are using trusted OAuth providers,
            // if we use any other shady providers,
            // we need check for verification for ourself
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            //? for any other shady providers add verification check here

            // allow OAuth without email verification cause google or github are trusted
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            //prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            // TODO : add 2fa check

            return true;
        },

        jwt: async ({ token }) => {
            if (!token.sub) return token;

            const user = await getUserById(token.sub);

            if (!user) return token;

            token.role = user.role;

            return token;
        },

        session: async ({ session, token }) => {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});
