import Link from "next/link";

//! remember to run mongodb atlas before running the app brother 🙂🙂

export default function Home() {
    return (
        <div>
            <div className="container px-2 flex flex-col justify-center items-center h-dvh">
                <h1 className="">Auth Snippets</h1>
                <Link href="/auth/login" className="text-sm hover:underline">
                    Go to Login Page
                </Link>
                <Link href="/settings" className="text-sm hover:underline">
                    Settings Page
                </Link>
                <Link href="/dashboard" className="text-sm hover:underline">
                    Dashboard Page
                </Link>
                <Link href="/client" className="text-sm hover:underline">
                    Client Page
                </Link>
            </div>
        </div>
    );
}
