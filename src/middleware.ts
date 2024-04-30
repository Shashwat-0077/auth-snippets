import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    authRoutesPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;

    const isAPIAuthRoute = nextUrl.pathname.startsWith(authRoutesPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

    if (isAPIAuthRoute) return;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // makes an absolute url
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoutes) {
        const UrlWithCallBack = new URL("/auth/login", nextUrl);
        UrlWithCallBack.searchParams.append("callbackUrl", nextUrl.pathname);
        return Response.redirect(UrlWithCallBack);
    }

    return;
});

export const config = {
    //cspell:disable-next-line
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
