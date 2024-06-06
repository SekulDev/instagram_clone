import { Tag } from "@/types";

import { request } from "./instance";

export async function searchTags(input: string) {
    try {
        const { data, success } = await request<Tag[]>({
            url: `/tag/search/${input}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
