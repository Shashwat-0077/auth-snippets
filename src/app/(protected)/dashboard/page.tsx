import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import React from "react";

export default function DashBoardPage() {
    return (
        <div>
            DashBoardPage
            <form action={logout}>
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    );
}
