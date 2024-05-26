import { request } from "./instance";

export async function login(username: string, password: string) {
    try {
        type Response = {
            access_token: string;
        };

        const { data, success } = await request<Response>({
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
