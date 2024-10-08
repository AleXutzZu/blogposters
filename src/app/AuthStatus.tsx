"use client";

import {logoutAction} from "@/lib/authActions";
import {useFormState} from "react-dom";
import Link from "next/link";

type Props = {
    username: string,
}

export default function AuthStatus(props: Props) {
    const [, formAction] = useFormState(logoutAction, {});

    return (
        <div className="flex flex-col justify-center items-start px-16">
            <p className="text-amber-50">Welcome, <span className="font-bold">{props.username}</span></p>

            <form action={formAction} className="flex items-center justify-between">
                <button className="text-amber-50 rounded-lg p-1 bg-red-400 font-bold text-sm">Log out</button>
                <Link href="/settings" className="font-sm text-amber-50 ml-3">Settings</Link>
            </form>
        </div>
    );
}