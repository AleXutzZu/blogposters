"use client";

import {useOptimistic} from "react";

type Props = {
    removeLike: () => Promise<void>;
    addLike: () => Promise<void>;
    isLiked: boolean,
    likes: number,
}

type LikeState = {
    likes: number,
    isLiked: boolean,
}

export function LikeButton(props: Props) {

    const [optimisticLikes, setOptimisticLikes] = useOptimistic<LikeState, "LIKE" | "DISLIKE">({
        likes: props.likes,
        isLiked: props.isLiked,
    }, (state, action) => {
        if (action == "LIKE") {
            return {
                likes: state.likes + 1,
                isLiked: true,
            }
        }
        return {
            likes: state.likes - 1,
            isLiked: false,
        }
    })


    return (
        <div className="flex space-x-2 items-center cursor-default" onClick={async () => {
            if (optimisticLikes.isLiked) {
                setOptimisticLikes("DISLIKE");
                await props.removeLike();
            } else {
                setOptimisticLikes("LIKE");
                await props.addLike();
            }
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor"
                 className={`size-6 stroke-red-700 hover:fill-red-700 ${optimisticLikes.isLiked ? "fill-red-700" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
            </svg>
            <p className="text-red-700 font-bold text-lg">{optimisticLikes.likes}</p>
        </div>);
}