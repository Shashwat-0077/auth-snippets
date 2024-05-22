"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "@/components/MyUI/alert";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { EmailVerification } from "@/actions/emailVerification";

export default function NewVerificationPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [message, setMessage] = useState("");
    const [responseType, setResponseType] = useState<"error" | "success">(
        "error"
    );

    const onSubmit = useCallback(() => {
        console.log(token);
        if (!token) {
            setResponseType("error");
            setMessage("Missing Token");
            return;
        }
        EmailVerification(token)
            .then((data) => {
                setResponseType(data.type);
                setMessage(data.message);
            })
            .catch(() => {
                setMessage("Something went wrong ");
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="relative bg-white/15 backdrop-blur-md flex flex-col justify-center items-center p-5 rounded text-center">
            <h1 className="w-full text-xl pb-5">Confirming your email</h1>
            {!message.trim() && <BarLoader color="#fff" />}
            <Alert variant={responseType} message={message} />
            <Link href="/auth/login" className="pt-3 hover:underline">
                Back to Login
            </Link>
        </div>
    );
}
