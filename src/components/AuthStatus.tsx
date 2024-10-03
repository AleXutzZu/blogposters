"use client";

import {logoutAction} from "@/lib/authActions";
import {useFormState} from "react-dom";

type Props = {
    username: string,
}

export default function AuthStatus(props: Props) {
    const [, formAction] = useFormState(logoutAction, {});

    return <div>
        <p>Welcome, {props.username}</p>

        <form action={formAction}>
            <button>Log out</button>
        </form>
    </div>
}