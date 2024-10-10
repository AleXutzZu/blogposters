import {validateRequest} from "@/lib/authActions";
import {notFound, redirect} from "next/navigation";
import {PostParams} from "@/app/posts/[id]/page";
import Link from "next/link";
import {format} from "date-fns";
import {ForwardRefEditor} from "@/lib/editor/Editor";


export default async function EditPost({params}: PostParams) {
    const {user} = await validateRequest();
    if (!user) redirect("/login");

    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    if (!post) notFound();

    if (post.userId != user.id) throw new Error("It seems you do not have access to edit this post");

    const savePostAction = async () => {
        "use server";
    }

    return (
        <div className="bg-white flex-grow">
            <div className="flex flex-col mt-10 mx-5 lg:mx-64 space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-2xl"></div>
                    <div className="flex flex-col">
                        <input className="font-bold text-5xl border rounded-2xl"/>

                        <Link href={`/users/${user.username}`}
                              className="text-xl">by {user.username} </Link>
                    </div>
                </div>
                <ForwardRefEditor markdown={post.body}/>
                <div
                    className="flex justify-between border-t py-2 border-b items-start sm:items-center flex-col sm:flex-row">
                    <div className="flex space-x-10">
                        <button type="submit">Save</button>
                        <Link href={`/posts/${post.id}`}>Cancel</Link>
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
        </div>
    )
}

