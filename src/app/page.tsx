import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div className="container px-2 flex flex-col justify-center items-center h-dvh">
                <h1 className="">Auth Snippets</h1>
                <Link href="/auth/login" className="text-sm hover:underline">
                    Go to Login Page
                </Link>
            </div>
        </div>
    );
}
