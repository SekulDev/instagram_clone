export type UploadFileResponse = {
    filename: string;
    size: number;
};

export type UpdateMeDto = {
    bio: string;
    label: string;
    avatar_url: string;
};

export type CreatePostDto = {
    description: string;
    images: string[];
};
