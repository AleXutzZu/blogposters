import {validateRequest} from "@/lib/auth";
import {redirect} from "next/navigation";


export default async function Users() {
    const {user} = await validateRequest();

    if (!user) redirect("/login");

    return <div>User list</div>
}