import { request } from "./instance";

type AuthResponse = {
    access_token: string;
};

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
        return data;
    } catch (e) {
        return false;
    }
}
