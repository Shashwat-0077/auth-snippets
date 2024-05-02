"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaRedditAlien } from "react-icons/fa6";

export default function Socials({
    callbackUrl,
}: {
    callbackUrl?: string | null;
}) {
    const onClick = (provider: "google" | "github" | "twitter" | "reddit") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="w-full flex justify-around mb-3 bg-white/15 rounded-md p-3">
            <div className="google text-4xl" onClick={() => onClick("google")}>
                <FaGoogle className="hover:scale-125 transition cursor-pointer p-1" />
            </div>
            <div className="github text-4xl" onClick={() => onClick("github")}>
                <FaGithub className="hover:scale-125 transition cursor-pointer p-1" />
            </div>
            <div className="twitter text-4xl" onClick={() => {}}>
                <FaXTwitter className="hover:scale-125 transition cursor-pointer p-1" />
            </div>
            <div className="reddit text-4xl" onClick={() => {}}>
                <FaRedditAlien className="hover:scale-125 transition cursor-pointer p-1" />
            </div>
        </div>
    );
}
