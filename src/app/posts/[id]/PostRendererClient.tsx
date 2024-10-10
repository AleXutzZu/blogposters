"use client";

import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";

type Props = {
    serializedData: MDXRemoteSerializeResult
}

export default function PostRendererClient(props: Props) {
    return (
        <MDXRemote {...props.serializedData}/>
    )
}