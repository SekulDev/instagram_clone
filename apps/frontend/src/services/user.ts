import { User } from "@/types";

import { UpdateMeDto } from "@repo/types";

import { request } from "./instance";

export async function getUser() {
    try {
        const { data, success } = await request<User>({
            url: "/user/@me",
        });

        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function getUserByUsername(username: string) {
    try {
        const { data, success } = await request<User>({
            url: `/user/${username}`,
        });

        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function searchUsers(input: string) {
    try {
        const { data, success } = await request({
            url: `/user/search/${input}`,
        });

        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function updateUser(dto: UpdateMeDto) {
    try {
        const { data, success } = await request({
            url: `/user/@me`,
            method: "PUT",
            data: dto,
        });

        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
