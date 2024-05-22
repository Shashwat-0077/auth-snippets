"use client";
import { ResetPassword } from "@/actions/passwordReset";
import { Alert } from "@/components/MyUI/alert";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<{
        type: "error" | "success";
        message: string;
    }>({
        type: "error",
        message: "",
    });

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setResponse({ type: "error", message: "" });
        startTransition(() => {
            startTransition(() => {
                ResetPassword(values).then((data) => {
                    if (data) {
                        setResponse({ type: data.type, message: data.message });
                    }
                });
            });
        });
    };

    return (
        <>
            <h1 className=" text-2xl mb-4">Reset password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col space-y-4">
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
                        <Button variant={"default"} disabled={isPending}>
                            Reset password
                        </Button>
                        <Alert
                            variant={response.type}
                            message={response.message}
                        />
                        <Link
                            href="/auth/login"
                            className="text-center hover:underline"
                        >
                            Back to the login page
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
}
