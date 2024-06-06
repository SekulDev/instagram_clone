<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { Comment, Post } from "@/types";
import { onMounted, reactive, watch } from "vue";

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
            <Avatar size="base">
                <AvatarImage :src="getAvatarUrl(props.post.author.avatar_url)" alt="avatar" />
                <AvatarFallback>
                    <img src="@/assets/img/default_avatar.png" alt="avatar" />
                </AvatarFallback>
            </Avatar>
            <span class="text-sm">
                <span class="font-semibold">{{ props.post.author.login }}</span>
                {{ props.post.description }}

                <span class="text-primary block">
                    <!-- @TODO CLICK ON TAGS -->
                    {{ props.post.tags.map((tag) => "#" + tag.name).join(" ") }}
                </span>

                <span class="text-secondary-foreground mt-3 block">{{
                    new Date(props.post.created_at).toLocaleDateString("pl-PL")
                }}</span>
            </span>
        </div>
        <div class="flex w-full gap-4 p-3" v-for="comment in comments.comments">
            <Avatar size="base">
                <AvatarImage :src="getAvatarUrl(comment.author.avatar_url)" alt="avatar" />
                <AvatarFallback>
                    <img src="@/assets/img/default_avatar.png" alt="avatar" />
                </AvatarFallback>
            </Avatar>
            <span class="text-sm">
                <span class="font-semibold">{{ comment.author.login }}</span>
                {{ comment.content }}

                <span class="text-secondary-foreground mt-1 block">{{
                    new Date(comment.created_at).toLocaleDateString("pl-PL")
                }}</span>
            </span>
        </div>
    </div>
</template>