import { UploadResponse } from "@/types";

import { request } from "./instance";

export async function uploadFile(formData: FormData) {
    try {
        const { data, success } = await request<UploadResponse>({
            url: "/content/upload",
            data: formData,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (!success) {
            return false;
        }
        return data;
    } catch (e) {
        return false;
    }
}
