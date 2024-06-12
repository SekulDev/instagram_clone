<script setup lang="ts">
import { computed } from "vue";

import MainPagePosts from "@/components/MainPagePosts.vue";
import { Skeleton } from "@/components/ui/skeleton";

const postsCount = computed(() => {
    const min = 3;
    const max = 5;
    return Math.floor(Math.random() * (max - min + 1)) + min;
});
</script>
<template>
    <div class="flex h-full w-full flex-col items-center py-7">
        <Suspense>
            <MainPagePosts />
            <template #fallback>
                <div class="border-b py-2 sm:w-11/12 md:w-4/12" v-for="_ in new Array(postsCount)">
                    <Skeleton class="mb-3 aspect-[4/5] w-full" />
                    <Skeleton class="h-9 w-full" />
                </div>
            </template>
        </Suspense>
    </div>
</template>
