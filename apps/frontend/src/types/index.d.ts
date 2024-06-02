import { HTMLAttributes } from "vue";
import { RouteLocationRaw, RouterLink } from "vue-router";

export type ApiResponse<T> = {
    data: T;
    success: boolean;
};

export type User = {
    id: number;
    email: string;
    login: string;
    label: string;
    bio: string;
    avatar_url: string;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    is_following?: number;
};

export type NavbarItemProps = {
    class?: HTMLAttributes["class"];
    style?: HTMLAttributes["style"];
    route?: RouteLocationRaw;
    label: string;
    icon?: any;
    avatar?: string;
    onClick?: () => void;
    isSearch?: boolean;
};
