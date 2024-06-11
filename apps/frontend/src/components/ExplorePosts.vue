<script setup lang="ts">
import { getImageUrl } from "@/lib/utils";
import { Post } from "@/types";
import { reactive } from "vue";

import { CommentIcon, LikeIcon } from "@repo/icons";

import { usePostStore } from "@/stores/post";

import { explore, exploreByTag } from "@/services/explore";

import { Skeleton } from "@/components/ui/skeleton";

const postStore = usePostStore();

const props = defineProps<{
    tag?: string;
}>();

const exploreResult = (await (props.tag ? exploreByTag(props.tag) : explore())) || [];

const posts = reactive<Post[]>(exploreResult);

function onPostClick(postId: number) {
    postStore.setPost(postId);
}
</script>
<template>
    <div
        class="post relative aspect-[4/5] w-full cursor-pointer overflow-hidden"
        v-for="post in posts"
        @click="() => onPostClick(post.id)"
    >
        <Suspense>
            <img class="h-full w-full object-cover" :src="getImageUrl(post.images[0])" :alt="`post-${post.id}`" />
            <template #fallback>
                <Skeleton class="h-full w-full" />
            </template>
        </Suspense>
        <div class="post-data absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-3">
            <div class="flex items-center gap-1 font-semibold"><LikeIcon class="h-6 w-6" /> {{ post.likes }}</div>
            <div class="flex items-center gap-1 font-semibold"><CommentIcon class="h-6 w-6" /> {{ post.comments }}</div>
        </div>
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
