import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/NavLink";


export default function NavMenu() {

    return (
        <nav className="flex justify-between px-8 py-4 bg-blue-600 items-center">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt={"MySpace"} width={48} height={48}/>
            </Link>
            <div className="flex space-x-12 items-center justify-center">
                <NavLink to={"/about"} name={"About"}/>
                <NavLink to={"/blog"} name={"Blog"}/>
                <NavLink to={"/users"} name={"Users"}/>
            </div>
        </nav>
    )
}