"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
    to: string,
    name: string,
    otherClasses?: string,
}

export default function NavLink(props: Props) {
    const pathName = usePathname();
    return (
        <Link href={props.to}
              className={`text-xl  font-bold hover:text-amber-200 transition-colors ease-in duration-300 ${pathName === props.to ? "text-amber-200" : "text-amber-50"} ${props.otherClasses}`}>{props.name}</Link>
    )
}