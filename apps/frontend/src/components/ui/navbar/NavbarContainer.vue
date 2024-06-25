<script setup lang="ts">
import { NavbarItemProps } from "@/types";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";

import { DarkModeIcon, InstagramIcon, LightModeIcon, MoreIcon, SettingsIcon } from "@repo/icons";

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
import { NavbarItem, NavbarSearch } from "@/components/ui/navbar";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

const { t } = useI18n();

const props = defineProps<{
    items: NavbarItemProps[];
}>();

const router = useRouter();

const themeStore = useThemeStore();

const isSearchOpen = ref<boolean>(false);

function onLogout() {
    logout();
    router.push({ name: "Login" });
}
</script>
<template>
    <Sheet v-model:open="isSearchOpen">
        <nav
            class="fixed bottom-0 left-0 flex w-[100vh] md:top-0 md:h-[100vh] md:w-[330px] md:flex-col md:border-r md:p-4 md:pb-6"
        >
            <div class="my-6 hidden h-[29px] px-2 md:block">
                <RouterLink :to="{ name: 'Home' }">
                    <InstagramTextLogo v-if="!isSearchOpen" />
                    <InstagramIcon v-else />
                </RouterLink>
            </div>
            <DropdownMenu dir="ltr">
                <div class="flex h-[100%] w-[100%] flex-1 justify-around md:flex-col md:justify-start md:gap-2 md:pt-3">
                    <template v-for="item in props.items">
                        <SheetTrigger as-child v-if="item.isSearch">
                            <Button variant="ghost" class="font-normal">
                                <NavbarItem
                                    :label="item.label"
                                    :icon="item.icon"
                                    :class="item.class"
                                    :style="item.style"
                                    :route="item.route"
                                    :avatar="item.avatar"
                                />
                            </Button>
                        </SheetTrigger>
                        <Button variant="ghost" v-else @click="item.onClick" class="font-normal">
                            <NavbarItem
                                :label="item.label"
                                :icon="item.icon"
                                :class="item.class"
                                :style="item.style"
                                :route="item.route"
                                :avatar="item.avatar"
                            />
                        </Button>
                    </template>
                </div>

                <DropdownMenuTrigger as-child class="hidden md:block">
                    <Button variant="ghost">
                        <NavbarItem :label="t('navbar.more')" :icon="MoreIcon" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem as-child>
                        <RouterLink :to="{ name: 'Settings' }">
                            <SettingsIcon /> {{ t("navbar.settings") }}
                        </RouterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem :onclick="themeStore.toggleTheme">
                        <DarkModeIcon v-if="themeStore.isDark" />
                        <LightModeIcon v-if="!themeStore.isDark" />
                        {{ t("navbar.changeTheme") }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem :onclick="onLogout">{{ t("navbar.logout") }}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
        <NavbarSearch />
    </Sheet>
</template>
