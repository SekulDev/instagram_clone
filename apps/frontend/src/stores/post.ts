import { Post } from "@/types";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

import { getPostById } from "@/services/post";

interface PostStore {
    post: Post | null;
}

export const usePostStore = defineStore("post", () => {
    const state = reactive<PostStore>({
        post: null,
    });

    async function setPost(postId: number) {
        const data = await getPostById(postId);
        if (!data) {
            state.post = null;
            return;
        }
        state.post = data;
    }

    function hidePost() {
        state.post = null;
    }

    return {
        ...toRefs(state),
        setPost,
        hidePost,
    };
});
