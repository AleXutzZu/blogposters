import * as zod from "zod";
import {prisma} from "@/lib/prisma";
import {validateRequest} from "@/lib/authActions";
import {redirect} from "next/navigation";

export default function Create() {
    return (
        <div className="bg-white flex-grow flex items-center justify-center flex-col ">
            <h1 className="font-bold text-2xl">Create a new post</h1>

            <form action={createPostAction}>
                <input type="text" name="title" placeholder="Title" required/>
                <textarea name="description" placeholder="Description" required/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

async function createPostAction(formData: FormData): Promise<void> {
    "use server";
    const {user} = await validateRequest();

    if (!user) {
        throw new Error("Not authorized");
        // return {message: "Not authenticated"};
    }

    const schema = zod.object({
        title: zod.string(),
        description: zod.string(),
    });

    const parsedValues = schema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
    });

    if (!parsedValues.success) {
        throw new Error("Failed to create post");
        // return {message: "Invalid inputs"};
    }


    const {id} = await prisma.post.create({
        data: {
            title: parsedValues.data.title,
            body: parsedValues.data.description,
            userId: user.id,
            createdAt: new Date(),
        }
    });
    return redirect(`/posts/${id}`);
}