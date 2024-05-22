"use client";

import { login } from "@/actions/login";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Alert } from "@/components/MyUI/alert";
import { useSearchParams } from "next/navigation";
import Socials from "@/components/MyUI/socials";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

// TODO : Make a different page for 2FA, having both on the same is a bit clunky or make a sub components (one for form and one for 2fa) and handles those in a parent component

export default function LoginPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with different provider"
            : ""; // to catch the error when the user try different OAuth providers with same mail

    const [message, setMessage] = useState("");
    const [responseType, setResponseType] = useState<"error" | "success">(
        "error"
    );
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        // clear the values
        setResponseType("error");
        setMessage("");

        // set the values after getting response
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data) {
                        if (data?.twoFactor) {
                            setShowTwoFactor(true);
                        } else {
                            setResponseType(data.type);
                            setMessage(data.message);
                        }
                    }
                })
                .catch(() => {
                    setResponseType("error");
                    setMessage("Something Went Wrong at form");
                });
        });
    };

    return (
        <>
            <h1 className="text-2xl mb-4">
                {showTwoFactor ? "Two factor Verification" : "Login Page"}
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center w-[20rem]"
                >
                    <div className="space-y-4 w-full">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="w-full grid place-content-center">
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="example@mail.com"
                                                    type="email"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    variant={"link"}
                                    type="button"
                                    className="mt-3 px-0 self-start font-normal"
                                    asChild
                                >
                                    <Link href="/auth/reset-password-request">
                                        Forget you password ?
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <Alert
                        message={message || urlError}
                        variant={responseType || (urlError ? "error" : "")}
                        className="w-full mt-4"
                    />
                    <Button className="w-full mt-3 mb-3" disabled={isPending}>
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                    <Socials callbackUrl={callbackUrl} />
                </form>
            </Form>
            <Link
                href={
                    callbackUrl
                        ? `/auth/register?callbackUrl=${callbackUrl}`
                        : "/auth/register"
                }
                className="hover:underline"
            >
                Don&apos;t have an account? Register here
            </Link>
        </>
    );
}
