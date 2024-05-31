import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/config/env";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAvatarUrl(avatarUrl: string) {
    if (avatarUrl.length > 0) {
        return `${env.BACKEND_URL}/public/${avatarUrl}`;
    }
    return "default";
}
