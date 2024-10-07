import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import {validateRequest} from "@/lib/authActions";
import AuthStatus from "@/components/AuthStatus";


export default async function NavMenu() {
    const {user} = await validateRequest();


    return (
        <nav className="flex justify-between px-8 py-4 bg-blue-600 items-center">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt={"MySpace"} width={48} height={48}/>
            </Link>
            <div className="flex space-x-12 items-center justify-center">
                <NavLink to={"/about"} name={"About"}/>
                <NavLink to={"/create"} name={"Post"}/>
                <NavLink to={"/users"} name={"Users"}/>
                {!user && <NavLink to={"/login"} name={"Login"} otherClasses="px-20"/>}
                {user && <AuthStatus username={user.username}/>}
            </div>
        </nav>
    )
}