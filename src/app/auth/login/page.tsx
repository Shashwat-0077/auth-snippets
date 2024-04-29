"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
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

export default function LoginPage() {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <>
            <h1 className="text-2xl">Login Page</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() => {})}
                    className="flex flex-col items-center"
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full mt-6 mb-3">Login</Button>
                    <Link href={"/auth/register"} className="hover:underline">
                        Don&apos;t have an account? register here
                    </Link>
                </form>
            </Form>
        </>
    );
}
