import {ForwardRefEditor} from "@/lib/editor/Editor";

export default function Create() {
    return (
        <div className="bg-white flex-grow flex items-center justify-center flex-col ">
            <h1 className="font-bold text-2xl">Create a new post</h1>

            <ForwardRefEditor markdown={"# Hello, world!"} className="border mx-auto"/>
        </div>
    )
}