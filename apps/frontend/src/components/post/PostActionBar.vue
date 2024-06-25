<script setup lang="ts">
import { setClipboard } from "@/lib/utils";
import { Post } from "@/types";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { LikeIcon, PostCommentIcon, PostLikeIcon, ShareIcon } from "@repo/icons";

import { env } from "@/config/env";

import { like, unlike } from "@/services/like";

const { t } = useI18n();

const props = defineProps<{
    post: Post;
    onCommentClick?: () => void;
}>();

const router = useRouter();

const liked = ref<boolean>(props.post.is_liking == 1 ? true : false);

watch(
    () => props.post,
    () => {
        if (props.post) {
            liked.value = props.post.is_liking == 1 ? true : false;
        } else {
            liked.value = false;
        }
    },
);

async function onLike(bool: boolean) {
    if (bool) {
        await like(props.post.id);
        liked.value = true;
    } else {
        await unlike(props.post.id);
        liked.value = false;
    }
}

function copy() {
    const url = router.resolve({ name: "Post", params: { postId: props.post.id } }).fullPath;
    setClipboard(env.FRONTEND_URL + url);
}
</script>
<template>
    <div class="w-full p-3">
        <div class="flex gap-4">
            <PostLikeIcon
                v-if="!liked"
                class="hover:text-secondary-foreground h-6 w-6 cursor-pointer"
                @click="() => onLike(true)"
            />
            <LikeIcon v-if="liked" class="text-destructive h-6 w-6 cursor-pointer" @click="() => onLike(false)" />
            <PostCommentIcon
                @click="props.onCommentClick"
                class="hover:text-secondary-foreground h-6 w-6 cursor-pointer"
            />
            <ShareIcon @click="copy" class="hover:text-secondary-foreground h-6 w-6 cursor-pointer" />
        </div>
        <div class="pointer-events-none py-2 text-sm">
            <span class="font-semibold">{{ t("components.post.likesCount", props.post.likes) }}</span>
        </div>
    </div>
</template>
