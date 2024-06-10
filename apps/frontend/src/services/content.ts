import { UploadResponse } from "@/types";

import { request } from "./instance";

export async function pickImages() {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    return await new Promise<FormData>((resolve) => {
        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = async function () {
                const formData = new FormData();
                formData.append("file", file);

                resolve(formData);
            };
            reader.readAsArrayBuffer(file);
        });
        document.body.appendChild(input);
        input.click();
        setTimeout(() => {
            document.body.removeChild(input);
        }, 0);
    });
}

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
