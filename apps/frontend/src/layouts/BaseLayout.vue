<template>
    <div class="flex min-h-[100vh] w-[100vw] items-center justify-center overflow-x-hidden">
        <Navbar :items="items" />
        <main class="box-border min-h-[100vh] w-[100vw] md:pl-[330px]">
            <RouterView :key="$route.fullPath" v-slot="{ Component }">
                <component :is="Component" />
            </RouterView>
        </main>
        <CreateModal :open="isCreateOpen" @update-open="onUpdateCreateOpen" />
        <PostModal :post="postStore.post" v-if="postStore.post" />
    </div>
</template>

<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { NavbarItemProps } from "@/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";

import {
    CreateIcon, // DirectMessagesIcon,
    ExploreIcon,
    HomeIcon, // NotificationIcon,
    // ReelsIcon,
    SearchIcon,
} from "@repo/icons";

import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";

import CreateModal from "@/components/create/CreateModal.vue";
import PostModal from "@/components/post/PostModal.vue";
import { Navbar } from "@/components/ui/navbar";

const { t } = useI18n();

const postStore = usePostStore();

const { user } = useUserStore();

const isCreateOpen = ref<boolean>(false);

function onUpdateCreateOpen(val: boolean) {
    isCreateOpen.value = val;
}

const items: NavbarItemProps[] = [
    {
        label: t("navbar.home"),
        icon: HomeIcon,
        route: { name: "Home" },
    },
    {
        label: t("navbar.search"),
        icon: SearchIcon,
        isSearch: true,
    },
    {
        label: t("navbar.explore"),
        icon: ExploreIcon,
        route: { name: "Explore" },
    },
    {
        label: t("navbar.create"),
        icon: CreateIcon,
        onClick: () => {
            isCreateOpen.value = true;
        },
    },
    {
        label: t("navbar.profile"),
        avatar: getAvatarUrl(user?.avatar_url || ""),
        route: { name: "Profile", params: { username: user?.login } },
    },
];
</script>
