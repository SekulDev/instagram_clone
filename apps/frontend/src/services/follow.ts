import { request } from "./instance";

export async function follow(username: string) {
    try {
        const { data, success } = await request({
            method: "POST",
            url: `/follow/${username}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function unfollow(username: string) {
    try {
        const { data, success } = await request({
            method: "DELETE",
            url: `/follow/${username}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
