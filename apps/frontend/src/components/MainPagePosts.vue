<script setup lang="ts">
import { getAvatarUrl, getImageUrl } from "@/lib/utils";
import { Post } from "@/types";
import { reactive } from "vue";

import { usePostStore } from "@/stores/post";

import { explore } from "@/services/explore";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import PostActionBar from "./post/PostActionBar.vue";
import PostImage from "./post/PostImage.vue";

const postStore = usePostStore();

const postsResult = await explore();

const posts = reactive<Post[]>(postsResult || []);

function onPostClick(postId: number) {
    postStore.setPost(postId);
}
</script>
<template>
    <div class="border-b py-2 sm:w-11/12 md:w-4/12" v-for="post in posts">
        <RouterLink
            :to="{ name: 'Profile', params: { username: post.author.login } }"
            class="flex w-full items-center gap-4 p-3"
        >
            <Avatar size="sm" class="h-8 w-8">
                <AvatarImage :src="getAvatarUrl(post.author.avatar_url)" alt="avatar" />
                <AvatarFallback>
                    <img src="@/assets/img/default_avatar.png" alt="avatar" />
                </AvatarFallback>
            </Avatar>
            <span class="text-sm font-semibold">{{ post.author.login }}</span>
        </RouterLink>
        <div class="aspect-[4/5] w-full overflow-hidden rounded-md border">
            <PostImage :post="post" />
        </div>
        <PostActionBar :on-comment-click="() => onPostClick(post.id)" :post="post" />
        <div class="flex gap-2 px-3 text-sm">
            <RouterLink class="font-semibold" :to="{ name: 'Profile', params: { username: post.author.login } }">
                {{ post.author.login }}
            </RouterLink>
            <span>
                {{ post.description }}
            </span>
        </div>
        <span @click="onPostClick(post.id)" class="text-secondary-foreground cursor-pointer px-3 text-sm">
            Zobacz komentarze
        </span>
    </div>
</template>
