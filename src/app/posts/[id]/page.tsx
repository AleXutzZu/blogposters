import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation";

type Props = {
    params: { id: string }
}

export default async function Post({params}: Props) {
    if (isNaN(Number(params.id))) notFound();

    const post = await prisma.post.findUnique({where: {id: Number(params.id)}});

    if (!post) notFound();

    return <div>
        {post.title}
        {post.body}
    </div>
}