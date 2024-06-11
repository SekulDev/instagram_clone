import { Post } from "@/types";

import { request } from "./instance";

export async function explore() {
    try {
        const { data, success } = await request<Post[]>({
            url: `/explore/`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function exploreByTag(tag: string) {
    try {
        const { data, success } = await request<Post[]>({
            url: `/explore/tag/${tag}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
