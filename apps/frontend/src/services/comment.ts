import { Comment } from "@/types";

import { request } from "./instance";

export async function getPostComments(postId: number) {
    try {
        const { data, success } = await request<Comment[]>({
            url: `/comment/post/${postId}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function addPostComment(postId: number, content: string) {
    try {
        const { data, success } = await request<Comment>({
            url: `/comment/post/${postId}`,
            method: "POST",
            data: { content },
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
