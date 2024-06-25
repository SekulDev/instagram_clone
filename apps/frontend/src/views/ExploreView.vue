<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import ExplorePosts from "@/components/ExplorePosts.vue";
import Title from "@/components/Title.vue";
import { Skeleton } from "@/components/ui/skeleton";

const { t } = useI18n();

const route = useRoute();
const tag = route.params.tag as string;

const postsCount = computed(() => {
    const min = 15;
    const max = 25;
    return Math.floor(Math.random() * (max - min + 1)) + min;
});

const title = computed(() => {
    return tag ? "#" + tag : t("navbar.explore");
});
</script>
<template>
    <Title :title="title" />
    <div class="flex h-[100%] w-[100%] justify-center py-7">
        <div class="sm:w-11/12 md:max-w-[935px]">
            <h2 class="text-2xl font-semibold">{{ title }}</h2>
            <div class="mt-7 grid w-[100%] auto-rows-max grid-cols-3 gap-1">
                <Suspense>
                    <ExplorePosts :tag="tag" />
                    <template #fallback>
                        <Skeleton class="aspect-[4/5] w-full" v-for="_ in new Array(postsCount)" />
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>
