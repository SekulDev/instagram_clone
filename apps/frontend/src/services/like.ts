import { request } from "./instance";

export async function like(postId: number) {
    try {
        const { data, success } = await request({
            method: "POST",
            url: `/like/${postId}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function unlike(postId: number) {
    try {
        const { data, success } = await request({
            method: "DELETE",
            url: `/like/${postId}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
