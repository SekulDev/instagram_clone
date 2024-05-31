import type { ApiResponse } from "@/types";
import axios, { type AxiosRequestConfig, isAxiosError } from "axios";

import { env } from "@/config/env";

const instance = axios.create({
    baseURL: env.BACKEND_URL + "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = window.localStorage.getItem("jwt");
        config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : undefined;

        return config;
    },
    (e) => Promise.reject(e),
);

export async function request<T = unknown>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const res = await instance.request<T>(config);

        return {
            data: res.data,
            success: true,
        };
    } catch (e) {
        if (isAxiosError(e)) {
            return {
                data: e.response?.data,
                success: false,
            };
        }

        throw e;
    }
}
