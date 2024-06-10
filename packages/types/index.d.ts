export type UploadFileResponse = {
    filename: string;
    size: number;
};

export type UpdateMeDto = {
    bio?: string;
    label?: string;
    avatar_url?: string | null;
};

export type CreatePostDto = {
    description: string;
    images: string[];
    tags: string[];
};

export type UpdatePostDto = {
    description: string;
    tags: string[];
};
