<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { Comment, Post } from "@/types";
import { onMounted, reactive, watch } from "vue";

import { usePostStore } from "@/stores/post";

import { getPostComments } from "@/services/comment";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const props = defineProps<{
    post: Post;
}>();

const comments = reactive<{ comments: Comment[] }>({ comments: [] });

async function refreshComments(postId: number) {
    comments.comments = [];
    const data = await getPostComments(postId);
    if (data != false) {
        comments.comments = data;
    }
}

onMounted(() => {
    refreshComments(props.post.id);
});

watch(
    () => props.post,
    (newValue) => {
        if (props.post) {
            refreshComments(newValue.id);
        }
    },
);
</script>

<template>
    <div class="no-scrollbar h-full w-full flex-1 overflow-y-scroll">
        <div class="flex w-full gap-4 p-3">
            <RouterLink :to="{ name: 'Profile', params: { username: props.post.author.login } }">
                <Avatar size="base">
                    <AvatarImage :src="getAvatarUrl(props.post.author.avatar_url)" alt="avatar" />
                    <AvatarFallback>
                        <img src="@/assets/img/default_avatar.png" alt="avatar" />
                    </AvatarFallback>
                </Avatar>
            </RouterLink>
            <span class="whitespace-pre-line text-sm">
                <span class="font-semibold">{{ props.post.author.login }}</span>
                {{ props.post.description }}

                <span class="text-primary block">
                    <RouterLink
                        @click="usePostStore().hidePost()"
                        :to="{ name: 'Tag', params: { tag: tag.name } }"
                        v-for="tag in props.post.tags"
                    >
                        #{{ tag.name }}
                    </RouterLink>
                </span>

                <span class="text-secondary-foreground mt-3 block">{{
                    new Date(props.post.created_at).toLocaleDateString("pl-PL")
                }}</span>
            </span>
        </div>
        <div class="flex w-full gap-4 p-3" v-for="comment in comments.comments">
            <RouterLink :to="{ name: 'Profile', params: { username: comment.author.login } }">
                <Avatar size="base">
                    <AvatarImage :src="getAvatarUrl(comment.author.avatar_url)" alt="avatar" />
                    <AvatarFallback>
                        <img src="@/assets/img/default_avatar.png" alt="avatar" />
                    </AvatarFallback>
                </Avatar>
            </RouterLink>
            <span class="text-sm">
                <span class="whitespace-pre-line font-semibold">{{ comment.author.login }}</span>
                {{ comment.content }}

                <span class="text-secondary-foreground mt-1 block">{{
                    new Date(comment.created_at).toLocaleDateString("pl-PL")
                }}</span>
            </span>
        </div>
    </div>
</template>
