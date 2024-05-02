"use client";

import { register } from "@/actions/register";
import { RegisterSchema } from "@/schema";
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

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const [message, setMessage] = useState("");
    const [responseType, setResponseType] = useState<"error" | "success">(
        "error"
    );
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        // clear the values
        setResponseType("error");
        setMessage("");

        // set the values after getting response
        startTransition(() => {
            register(values, callbackUrl).then((data) => {
                setResponseType(data.type);
                setMessage(data.message);
            });
        });
    };

    return (
        <>
            <h1 className="text-2xl">Register Page</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center w-[300px]"
                >
                    <div className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            //cspell:disable-next-line
                                            placeholder="Example Sharma"
                                            type="text"
                                            className="bg-black/10 dark:bg-white/10"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            className="bg-black/10 dark:bg-white/10"
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
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            type="password"
                                            className="bg-black/10 dark:bg-white/10"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Alert
                        message={message}
                        variant={responseType}
                        className="w-full mt-4"
                    />
                    <Button className="w-full mt-6 mb-4" disabled={isPending}>
                        Create an account
                    </Button>
                    <Socials />
                </form>
            </Form>
            <Link
                href={
                    callbackUrl
                        ? `/auth/login?callbackUrl=${callbackUrl}`
                        : "/auth/login"
                }
                className="mt-2 hover:underline"
            >
                Already have an account? Login Here
            </Link>
        </>
    );
}
