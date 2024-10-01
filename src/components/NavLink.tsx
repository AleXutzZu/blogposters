"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
    to: string,
    name: string
}

export default function NavLink(props: Props) {
    const pathName = usePathname();
    return (
        <Link href={props.to} className={`text-xl text-amber-50 font-bold hover:text-amber-200 transition-colors ease-in duration-300 ${pathName === props.to ? "text-amber-200" : ""}`} >{props.name}</Link>
    )
}