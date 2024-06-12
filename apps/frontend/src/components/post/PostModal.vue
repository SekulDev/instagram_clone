<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { Post } from "@/types";
import { ref, watch } from "vue";

import { usePostStore } from "@/stores/post";

import PostActionBar from "@/components/post/PostActionBar.vue";
import PostAddComment from "@/components/post/PostAddComment.vue";
import PostComments from "@/components/post/PostComments.vue";
import PostImage from "@/components/post/PostImage.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const postStore = usePostStore();

const props = defineProps<{
    post: Post;
}>();

const open = ref<boolean>(true);

watch(
    () => open,
    (newValue) => {
        if (!newValue) {
            postStore.hidePost();
        }
    },
);

watch(
    () => props.post,
    (newValue) => {
        if (!newValue) {
            open.value = false;
        } else {
            open.value = true;
        }
    },
);

function onCommentAdd() {
    postStore.setPost(props.post.id);
}
</script>
<template>
    <Dialog v-model:open="open">
        <DialogContent class="overflow-hidden !p-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
            <DialogTitle class="sr-only">{{ props.post.id }}</DialogTitle>
            <div class="relative flex md:h-[90vh]">
                <PostImage :post="props.post" />
                <div class="relative flex aspect-[4/5] h-full flex-col overflow-hidden border">
                    <RouterLink
                        :to="{ name: 'Profile', params: { username: props.post.author.login } }"
                        class="flex w-full items-center gap-4 border-b p-3"
                    >
                        <Avatar size="base">
                            <AvatarImage :src="getAvatarUrl(props.post.author.avatar_url)" alt="avatar" />
                            <AvatarFallback>
                                <img src="@/assets/img/default_avatar.png" alt="avatar" />
                            </AvatarFallback>
                        </Avatar>
                        <span class="text-sm font-semibold">{{ props.post.author.login }}</span>
                    </RouterLink>
                    <PostComments :post="props.post" />
                    <div class="w-full border-t">
                        <PostActionBar :post="props.post" />
                    </div>
                    <PostAddComment @add-comment="onCommentAdd" :post="props.post" />
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
