import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation";
import Link from "next/link";

type Props = {
    params: { id: string }
}

export default async function Post({params}: Props) {
    if (isNaN(Number(params.id))) notFound();

    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            likes: true
        }
    });

    if (!post) notFound();

    const user = await prisma.user.findUnique({
        where: {
            id: post.userId
        }
    });
    return (
        <div className="bg-white flex-grow">
            <div className="flex flex-col mt-10 mx-5 lg:mx-64 space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-2xl"></div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-5xl">{post.title}</h1>
                        {user && <Link href={`/users/${user.username}`} className="text-xl">by {user.username} </Link>}
                        {!user && <p className="text-xl">By [Deleted User]</p>}
                    </div>
                </div>
                <p className="">{post.body}</p>
                <div className="flex space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6 fill-red-700 stroke-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                    </svg>
                    <p className="text-red-700 font-bold text-lg">{post.likes.length}</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                    </svg>
                    <p>Comments</p>
                </div>
            </div>
        </div>);
}