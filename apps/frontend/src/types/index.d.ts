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
};
