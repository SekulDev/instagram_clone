import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/config/env";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAvatarUrl(avatarUrl: string) {
    if (avatarUrl.length > 0) {
        return `${env.BACKEND_URL}/upload/${avatarUrl}`;
    }
    return "default";
}

export function getImageUrl(image: string) {
    return `${env.BACKEND_URL}/upload/${image}`;
}

export function setClipboard(value: string) {
    const clipElem = document.createElement("textarea");
    clipElem.value = value;
    document.body.appendChild(clipElem);
    clipElem.select();
    document.execCommand("copy");
    document.body.removeChild(clipElem);
}
