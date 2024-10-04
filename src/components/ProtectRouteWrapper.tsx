import {validateRequest} from "@/lib/authActions";
import {permanentRedirect} from "next/navigation";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    redirectTo?: string;
    invert?: boolean;
}

export default async function ProtectRouteWrapper(props: Props) {
    const {user} = await validateRequest();

    const invert = props.invert ?? false;

    const xor = (a: boolean, b: boolean): boolean => {
        return (a && !b) || (!a && b)
    }

    if (!(xor(invert, user as unknown as boolean))) permanentRedirect(props.redirectTo ?? "/login");

    return <>{props.children}</>;
}
