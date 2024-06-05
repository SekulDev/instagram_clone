<script setup lang="ts">
import { getImageUrl } from "@/lib/utils";
import { Post } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref, watch } from "vue";

import { Skeleton } from "@/components/ui/skeleton";

const props = defineProps<{
    post: Post;
}>();

const currentImage = ref(0);

watch(
    () => currentImage.value,
    (newValue) => {
        if (newValue >= props.post.images.length) {
            currentImage.value = 0;
            return;
        }
        if (newValue < 0) {
            currentImage.value = props.post.images.length - 1;
            return;
        }
    },
);

function changeImage(diff: -1 | 1) {
    diff == 1 ? currentImage.value++ : currentImage.value--;
}
</script>
<template>
    <div class="relative aspect-[4/5] h-full overflow-hidden">
        <Suspense>
            <img
                class="h-full w-full object-cover"
                :src="getImageUrl(props.post.images[currentImage])"
                :alt="`post-${props.post.id}-${currentImage}`"
            />
            <template #fallback>
                <Skeleton class="h-full w-full" />
            </template>
        </Suspense>
        <div
            v-if="props.post.images.length > 1"
            class="absolute left-0 top-0 flex h-full w-full items-center justify-between p-3"
        >
            <div class="h-6 w-6 cursor-pointer rounded-[50%] bg-white/60 text-gray-500" @click="changeImage(-1)">
                <ChevronLeft />
            </div>
            <div class="h-6 w-6 cursor-pointer rounded-[50%] bg-white/60 text-gray-500" @click="changeImage(1)">
                <ChevronRight />
            </div>
        </div>
    </div>
</template>
