import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function SettingsPage() {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session)}
            <form action={logout}>
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    );
}
