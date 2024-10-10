import {prisma} from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";
import Link from "next/link";
import {format} from "date-fns";
import {validateRequest} from "@/lib/authActions";
import {LikeButton} from "@/components/LikeButton";
import {revalidatePath} from "next/cache";
import {serialize} from "next-mdx-remote/serialize";
import PostRendererClient from "@/app/posts/[id]/PostRendererClient";

export type PostParams = {
    params: { id: string }
}

export default async function Post({params}: PostParams) {
    if (isNaN(Number(params.id))) notFound();

    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    if (!post) notFound();

    const serializedData = await serialize(post.body);

    const likes = await prisma.like.count({
        where: {
            postId: post.id
        }
    });

    const postOwner = await prisma.user.findUnique({
        where: {
            id: post.userId
        },
    });

    const addLike = async () => {
        "use server";
        const {user} = await validateRequest();
        if (!user) redirect("/login");

        await prisma.like.create({
            data: {
                postId: post.id,
                userId: user.id,
            }
        });
        revalidatePath(`/posts/${post.id}`);
    }

    const removeLike = async () => {
        "use server";
        const {user} = await validateRequest();
        if (!user) redirect("/login");

        await prisma.like.delete({
            where: {
                userId_postId: {
                    postId: post.id,
                    userId: user.id,
                }
            }
        });
        revalidatePath(`/posts/${post.id}`);
    }

    let isLiked = false;

    const {user} = await validateRequest();
    if (user) {
        const like = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId: post.id
                }
            }
        });
        if (like) isLiked = true;
    }

    return (
        <div className="bg-white flex-grow">
            <div className="flex flex-col mt-10 mx-5 lg:mx-64 space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-2xl flex-shrink-0"></div>
                    <div className="flex flex-col flex-grow">
                        <h1 className="font-bold text-xl md:text-3xl mr-1 break-all">{post.title}</h1>
                        {postOwner &&
                            <Link href={`/users/${postOwner.username}`}
                                  className="text-xl">by {postOwner.username} </Link>}
                        {!postOwner && <p className="text-xl">By [Deleted User]</p>}
                    </div>
                </div>
                <PostRendererClient serializedData={serializedData}/>
                <div
                    className="flex justify-between border-t py-2 border-b items-start sm:items-center flex-col sm:flex-row">
                    <div className="flex space-x-10">
                        <LikeButton addLike={addLike} removeLike={removeLike} likes={likes} isLiked={isLiked}/>
                        <div className="flex space-x-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                            </svg>
                            <p>Comments</p>
                        </div>
                    </div>
                    <div className="relative group">
                        {post.editedAt && <div
                            className="absolute p-1 rounded-xl bg-gray-800 text-white bottom-6 invisible group-hover:visible transition-all ease-in-out duration-200">
                            <p className="text-sm">Edited at <span
                                className="italic">{format(post.editedAt, "dd/MM/yyyy, HH:mm")}</span></p>
                        </div>}
                        <p className="text-sm">Created at <span
                            className="italic">{format(post.createdAt, "dd/MM/yyyy, HH:mm")}</span></p>
                    </div>
                </div>
            </div>
        </div>);
}