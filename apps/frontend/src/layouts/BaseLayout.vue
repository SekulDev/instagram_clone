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
import { RouterView } from "vue-router";

import {
    CreateIcon,
    DirectMessagesIcon,
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

const postStore = usePostStore();

const { user } = useUserStore();

const isCreateOpen = ref<boolean>(false);

function onUpdateCreateOpen(val: boolean) {
    isCreateOpen.value = val;
}

const items: NavbarItemProps[] = [
    {
        label: "Strona główna",
        icon: HomeIcon,
        route: { name: "Home" },
    },
    {
        label: "Szukaj",
        icon: SearchIcon,
        isSearch: true,
    },
    {
        label: "Eksploruj",
        icon: ExploreIcon,
        route: { name: "Explore" },
    },
    // {
    //     label: "Rolki",
    //     icon: ReelsIcon,
    //     // route: { name: "Reels" },
    // },
    {
        label: "Wiadomości",
        icon: DirectMessagesIcon,
        // route: { name: "Messages" },
    },
    // {
    //     label: "Powiadomienia",
    //     icon: NotificationIcon,
    //     // route: { name: "Notifications" },
    // },
    {
        label: "Utwórz",
        icon: CreateIcon,
        onClick: () => {
            isCreateOpen.value = true;
        },
        // route: { name: "Create" },
    },
    {
        label: "Profil",
        avatar: getAvatarUrl(user?.avatar_url || ""),
        route: { name: "Profile", params: { username: user?.login } },
    },
];
</script>
