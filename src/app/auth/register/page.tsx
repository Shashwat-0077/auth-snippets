"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
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
import { Alert } from "@/components/MyUI/alert";

export default function RegisterPage() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <>
            <h1 className="text-2xl">Register Page</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() => {})}
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full mt-6">Login</Button>
                </form>
            </Form>
            <Link href={"/auth/login"} className="mt-4 hover:underline">
                Already have an account? Login Here
            </Link>
        </>
    );
}
