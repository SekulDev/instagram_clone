<script setup lang="ts">
import { NavbarItemProps } from "@/types";
import { RouterLink } from "vue-router";

import { DarkModeIcon, LightModeIcon, MoreIcon, SettingsIcon } from "@repo/icons";

import { useThemeStore } from "@/stores/theme";

import { logout } from "@/services/auth";

import InstagramTextLogo from "@/components/InstagramTextLogo.vue";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarItem } from "@/components/ui/navbar";

const props = defineProps<{
    items: NavbarItemProps[];
}>();

const themeStore = useThemeStore();
</script>
<template>
    <nav class="absolute flex md:left-0 md:top-0 md:h-[100vh] md:w-[330px] md:flex-col md:border-r md:p-4 md:pb-6">
        <div class="my-6 px-2 sm:hidden md:block">
            <RouterLink :to="{ name: 'Home' }">
                <InstagramTextLogo />
            </RouterLink>
        </div>
        <DropdownMenu dir="ltr">
            <div class="flex h-[100%] w-[100%] flex-1 md:flex-col md:gap-2 md:pt-3">
                <NavbarItem
                    v-for="(item, index) in props.items"
                    :key="index"
                    :label="item.label"
                    :icon="item.icon"
                    :class="item.class"
                    :style="item.style"
                    :route="item.route"
                    :avatar="item.avatar"
                />
            </div>

            <DropdownMenuTrigger as-child>
                <Button variant="ghost">
                    <NavbarItem label="Więcej" :icon="MoreIcon" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem as-child>
                    <RouterLink :to="{ name: 'Settings' }"> <SettingsIcon /> Ustawienia </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem :onclick="themeStore.toggleTheme">
                    <DarkModeIcon v-if="themeStore.isDark" />
                    <LightModeIcon v-if="!themeStore.isDark" />
                    Zmień wygląd
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem :onclick="logout">Wyloguj się</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>
</template>
