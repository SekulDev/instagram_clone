import { useUserStore } from "@/stores/user";

import { request } from "./instance";

type AuthResponse = {
    access_token: string;
};

export function logout() {
    window.localStorage.removeItem("jwt");
    const userStore = useUserStore();
    userStore.onLogout();
}

export async function login(username: string, password: string) {
    try {
        const { data, success } = await request<AuthResponse>({
            method: "POST",
            data: {
                username,
                password,
            },
            url: "/auth/login",
        });
        if (!success) {
            return false;
        }

        window.localStorage.setItem("jwt", data.access_token);
        const userStore = useUserStore();
        userStore.onLogin();
        return data;
    } catch (e) {
        return false;
    }
}

export async function register(email: string, login: string, label: string, password: string) {
    try {
        const { data, success } = await request<AuthResponse>({
            method: "POST",
            data: {
                email,
                login,
                label,
                password,
            },
            url: "/auth/register",
        });
        if (!success) {
            return false;
        }

        window.localStorage.setItem("jwt", data.access_token);
        const userStore = useUserStore();
        userStore.onLogin();
        return data;
    } catch (e) {
        return false;
    }
}

export async function forgotPassword(email: string) {
    try {
        const { data, success } = await request<{ id: string }>({
            method: "POST",
            data: { email },
            url: "/auth/forgot-password",
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}

export async function changePassword(uid: string, password: string) {
    try {
        const { data, success } = await request({
            method: "PUT",
            data: {
                password,
            },
            url: `/auth/change-password/${uid}`,
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
