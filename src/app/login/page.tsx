"use client";
import {loginAction} from "@/lib/authActions";
import Link from "next/link";
import {useFormState} from "react-dom";

export default function Login() {
    const [state, formAction] = useFormState(loginAction, {});


    return (
        <div className="bg-white flex-grow flex justify-center items-center">
            <form action={formAction} className="grid grid-cols-2 space-y-2.5 p-2">
                <h1 className="font-bold text-4xl col-span-1">Sign in</h1>
                {state.message && <div
                    className="col-span-1  bg-red-500 border rounded-xl font-bold text-white p-2 flex items-center justify-self-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                    </svg>
                    <p>{state.message}</p>
                </div>}
                <label htmlFor="username" className="col-span-2 text-xl">Username</label>
                <input name="username" id="username"
                       className="border rounded-xl h-10 p-2 border-black col-span-2 w-80 sm:w-96"/>
                <label htmlFor="password" className="col-span-2 text-xl">Password</label>
                <input type="password" name="password" id="password"
                       className="border rounded-xl h-10 p-2 border-black col-span-2 w-80 sm:w-96"/>
                <button
                    className="!mt-4 text-lg border rounded-lg font-bold bg-blue-600 text-white hover:border-blue-950 transition-all w-2/3 col-span-2 sm:col-span-1 justify-self-center sm:justify-self-start">
                    Log in
                </button>
                <Link href="/signup" className="text-center text-sm !mt-4 self-center text-blue-600 col-span-2 sm:col-span-1">
                    Not a member? Register here</Link>
            </form>
        </div>
    );
}

