<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { User } from "@/types";
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import { searchUsers } from "@/services/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const results = reactive<{ users: User[] }>({ users: [] });

const input = defineModel<string>();

let cooldown: any = null;

async function onInput() {
    if (cooldown != null) return;
    const val = input.value;
    if (!val || val.length < 3) return (results.users = []);
    cooldown = setTimeout(async () => {
        const data = await searchUsers(val);
        if (data !== false) {
            results.users = data;
        }
        clearTimeout(cooldown);
        cooldown = null;
    }, 500);
}
</script>
<template>
    <SheetContent side="left" class="rounded-r-2xl">
        <SheetHeader class="mb-4 border-b">
            <SheetTitle class="text-2xl">Szukaj</SheetTitle>
            <SheetDescription class="my-7">
                <Input
                    @input="onInput"
                    v-model="input"
                    class="bg-secondary border-none"
                    autocomplete="off"
                    placeholder="Szukaj"
                />
            </SheetDescription>
        </SheetHeader>

        <SheetClose as-child>
            <RouterLink
                v-for="user in results.users"
                class="hover:bg-secondary flex w-full items-center gap-2 px-4 py-3"
                :to="{ name: 'Profile', params: { username: user.login } }"
            >
                <Avatar size="base">
                    <AvatarImage :src="getAvatarUrl(user.avatar_url || '')" alt="avatar" />
                    <AvatarFallback>
                        <img src="@/assets/img/default_avatar.png" alt="avatar" />
                    </AvatarFallback>
                </Avatar>
                <div class="flex flex-col text-sm">
                    <span class="font-bold">{{ user.login }}</span>
                    <span class="text-secondary-foreground">{{ user.label }}</span>
                </div>
            </RouterLink>
        </SheetClose>
    </SheetContent>
</template>
