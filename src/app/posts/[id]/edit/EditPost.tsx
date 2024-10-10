"use client";
import Link from "next/link";
import {ForwardRefEditor} from "@/lib/editor/Editor";
import {format} from "date-fns";
import {useRef, useState} from "react";
import {MDXEditorMethods} from "@mdxeditor/editor";

type Props = {
    username: string,
    body: string,
    title: string,
    id: number,
    editedAt: Date | null,
    createdAt: Date,
    updateAction: (title: string, body: string) => Promise<void>,
}

export function EditPostArea(props: Props) {
    const ref = useRef<MDXEditorMethods | null>(null);
    const [title, setTitle] = useState(props.title);

    return (
        <div className="flex flex-col mt-10 mx-5 lg:mx-64 space-y-4">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-700 rounded-2xl"></div>
                <div className="flex flex-col flex-grow">
                    <input className="font-bold text-xl md:text-3xl border rounded-2xl flex-grow" value={title}
                           onChange={(e) => setTitle(e.target.value)}/>

                    <Link href={`/users/${props.username}`}
                          className="text-xl">by {props.username} </Link>
                </div>
            </div>
            <ForwardRefEditor markdown={props.body} ref={ref} className="border-x"/>
            <div
                className="flex justify-between border-t py-2 border-b items-start sm:items-center flex-col sm:flex-row">
                <div className="flex space-x-4">
                    <button className="bg-green-500 py-0.5 px-3 font-bold text-white rounded-xl" onClick={async () => {
                        await props.updateAction(title, ref.current!.getMarkdown());
                    }}>Save
                    </button>
                    <Link href={`/posts/${props.id}`} className="bg-red-500 py-0.5 px-3 font-bold text-white rounded-xl">Cancel</Link>
                </div>
                <div className="relative group">
                    {props.editedAt && <div
                        className="absolute p-1 rounded-xl bg-gray-800 text-white bottom-6 invisible group-hover:visible transition-all ease-in-out duration-200">
                        <p className="text-sm">Edited at <span
                            className="italic">{format(props.editedAt, "dd/MM/yyyy, HH:mm")}</span></p>
                    </div>}
                    <p className="text-sm">Created at <span
                        className="italic">{format(props.createdAt, "dd/MM/yyyy, HH:mm")}</span></p>
                </div>
            </div>
        </div>);
}