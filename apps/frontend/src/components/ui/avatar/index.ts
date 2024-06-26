import { type VariantProps, cva } from "class-variance-authority";

export { default as Avatar } from "./Avatar.vue";
export { default as AvatarImage } from "./AvatarImage.vue";
export { default as AvatarFallback } from "./AvatarFallback.vue";

export const avatarVariant = cva(
    "inline-flex items-center justify-center font-normal dark:text-foreground text-background select-none shrink-0 bg-background dark:bg-foreground overflow-hidden",
    {
        variants: {
            size: {
                sm: "h-6 w-6 text-xs",
                base: "h-10 w-10 text-xl",
                lg: "h-36 w-36 text-5xl",
            },
            shape: {
                circle: "rounded-full",
                square: "rounded-md",
            },
        },
    },
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;
