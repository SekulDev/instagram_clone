<script setup lang="ts">
import { getImageUrl } from "@/lib/utils";
import { Post } from "@/types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { CommentIcon, LikeIcon } from "@repo/icons";

import { usePostStore } from "@/stores/post";

import { Skeleton } from "@/components/ui/skeleton";

const { t } = useI18n();

const postStore = usePostStore();

const props = defineProps<{
    posts?: Post[];
}>();

const postsCount = computed(() => {
    const min = 5;
    const max = 9;
    return Math.floor(Math.random() * (max - min + 1)) + min;
});

function onPostClick(postId: number) {
    postStore.setPost(postId);
}
</script>
<template>
    <div class="flex w-[100%] justify-center gap-2">
        <span class="border-foreground border-t py-3 text-sm font-semibold">{{ t("components.profile.posts") }}</span>
    </div>
    <div class="mb-5 grid w-[100%] auto-rows-max grid-cols-3 gap-1">
        <div
            class="post relative aspect-[4/5] cursor-pointer overflow-hidden"
            @click="() => onPostClick(post.id)"
            v-for="post in props.posts"
            v-if="props.posts"
        >
            <Suspense>
                <img class="h-full w-full object-cover" :src="getImageUrl(post.images[0])" :alt="`post-${post.id}`" />
                <template #fallback>
                    <Skeleton class="h-full w-full" />
                </template>
            </Suspense>
            <div class="post-data absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-3">
                <div class="flex items-center gap-1 font-semibold text-white">
                    <LikeIcon class="h-6 w-6" /> {{ post.likes }}
                </div>
                <div class="flex items-center gap-1 font-semibold text-white">
                    <CommentIcon class="h-6 w-6" /> {{ post.comments }}
                </div>
            </div>
        </div>
        <Skeleton class="aspect-[4/5]" v-else v-for="_ in new Array(postsCount)" />
    </div>
</template>

<style scoped lang="scss">
.post {
    &:hover {
        > .post-data {
            display: flex;
        }
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
}
</style>
