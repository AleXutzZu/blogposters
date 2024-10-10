import {validateRequest} from "@/lib/authActions";
import {notFound, redirect} from "next/navigation";
import {PostParams} from "@/app/posts/[id]/page";
import {EditPostArea} from "@/app/posts/[id]/edit/EditPost";


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

    const savePostAction = async (title: string, body: string) => {
        "use server";
        const {user} = await validateRequest();
        if (!user) redirect("/login");

        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                title,
                body,
                editedAt: new Date(),
            }
        });
        redirect(`/posts/${post.id}`);
    }

    return (
        <div className="bg-white flex-grow">
            <EditPostArea username={user.username} {...post} updateAction={savePostAction}/>
        </div>
    )
}

