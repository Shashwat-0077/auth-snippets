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
            login(values, callbackUrl).then((data) => {
                if (data) {
                    setResponseType(data.type);
                    setMessage(data.message);
                }
            });
        });
    };

    return (
        <>
            <h1 className="text-2xl">Login Page</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center w-[20rem]"
                >
                    <div className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Email</FormLabel>
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
                                    <FormLabel className="">Password</FormLabel>
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
                    </div>
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
                    <Alert
                        message={message || urlError}
                        variant={responseType || (urlError ? "error" : "")}
                        className="w-full mt-4"
                    />
                    <Button className="w-full mt-3 mb-3" disabled={isPending}>
                        Login
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
