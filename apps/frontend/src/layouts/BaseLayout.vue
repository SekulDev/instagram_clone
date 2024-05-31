<template>
    <div class="container flex h-[100vh] w-[100vw] items-center justify-center">
        <Navbar :items="items" />
        <RouterView v-slot="{ Component }">
            <component :is="Component" />
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { NavbarItemProps } from "@/types";
import { RouterView } from "vue-router";

import {
    CreateIcon,
    DirectMessagesIcon,
    ExploreIcon,
    HomeIcon,
    NotificationIcon,
    ReelsIcon,
    SearchIcon,
} from "@repo/icons";

import { useUserStore } from "@/stores/user";

import { Navbar } from "@/components/ui/navbar";

const { user } = useUserStore();

const items: NavbarItemProps[] = [
    {
        label: "Strona główna",
        icon: HomeIcon,
        route: { name: "Home" },
    },
    {
        label: "Szukaj",
        icon: SearchIcon,
    },
    {
        label: "Eksploruj",
        icon: ExploreIcon,
        route: { name: "Explore" },
    },
    {
        label: "Rolki",
        icon: ReelsIcon,
        // route: { name: "Reels" },
    },
    {
        label: "Wiadomości",
        icon: DirectMessagesIcon,
        // route: { name: "Messages" },
    },
    {
        label: "Powiadomienia",
        icon: NotificationIcon,
        // route: { name: "Notifications" },
    },
    {
        label: "Utwórz",
        icon: CreateIcon,
        // route: { name: "Create" },
    },
    {
        label: "Profil",
        avatar: getAvatarUrl(user?.avatar_url || ""),
        // route: { name: "User", params: { username: user?.login } },
    },
];
</script>
