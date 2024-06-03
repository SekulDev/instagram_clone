import { Post } from "@/types";

import { request } from "./instance";

export async function getUserPosts(username: string) {
    try {
        const { data, success } = await request<Post[]>({
            url: `/post/user/${username}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function getPostById(id: number) {
    try {
        const { data, success } = await request<Post>({
            url: `/post/${id}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
