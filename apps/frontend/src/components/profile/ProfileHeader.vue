<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { User } from "@/types";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

import { follow, unfollow } from "@/services/follow";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const { t } = useI18n();

const props = defineProps<{
    user?: User;
    isMe?: boolean;
}>();

const emit = defineEmits<{
    (e: "updateFollow", isFollowing: number): void;
}>();

async function onFollowClick(isFollowing: number) {
    if (!props.user) return;
    if (isFollowing == 1) {
        const result = await unfollow(props.user.login);
        if (result !== false) {
            emit("updateFollow", 0);
        }
    } else {
        const result = await follow(props.user.login);
        if (result !== false) {
            emit("updateFollow", 1);
        }
    }
}
</script>
<template>
    <div class="flex w-[100%] gap-20 border-b px-10 pt-3">
        <Avatar size="lg">
            <template v-if="props.user">
                <AvatarImage :src="getAvatarUrl(props.user.avatar_url || '')" alt="avatar" />
                <AvatarFallback>
                    <img src="@/assets/img/default_avatar.png" alt="avatar" />
                </AvatarFallback>
            </template>
            <template v-else>
                <Skeleton class="h-full w-full" />
            </template>
        </Avatar>
        <div class="flex w-full flex-col gap-6">
            <div v-if="props.user" class="flex items-center gap-8">
                <span class="text-lg">{{ props.user.login }}</span>
                <Button size="sm" class="text-foreground" variant="secondary" v-if="props.isMe" as-child>
                    <RouterLink :to="{ name: 'Settings' }"> {{ t("components.profile.editProfile") }} </RouterLink>
                </Button>
                <template v-else>
                    <Button
                        @click="onFollowClick(props.user.is_following)"
                        size="sm"
                        variant="default"
                        v-if="props.user.is_following == 0"
                    >
                        {{ t("components.profile.follow") }}
                    </Button>
                    <Button
                        @click="onFollowClick(props.user.is_following)"
                        size="sm"
                        class="text-foreground"
                        variant="secondary"
                        v-if="props.user.is_following == 1"
                    >
                        {{ t("components.profile.unfollow") }}
                    </Button>
                    <!-- <Button size="sm" class="text-foreground" variant="secondary" v-if="props.user.is_following == 1">
                        <RouterLink :to="{name: 'Messages', params: {username: props.user.login}}">
                            {{ t('components.profile.sendDirectMessage') }}
                        </RouterLink>
                    </Button> -->
                </template>
            </div>
            <Skeleton class="h-6 w-8/12" v-else />

            <div v-if="props.user" class="flex items-center gap-8">
                <span>
                    {{ $t("components.profile.postsCount") }}
                    <span class="font-bold">{{ props.user.postsCount }}</span>
                </span>
                <span>
                    <span class="font-bold">{{ props.user.followersCount }}</span>
                    {{ t("components.profile.followers") }}
                </span>
                <span>
                    {{ t("components.profile.following") }}:
                    <span class="font-bold">{{ props.user.followingCount }}</span>
                </span>
            </div>
            <Skeleton class="h-6 w-8/12" v-else />

            <div v-if="props.user" class="max-w-4/12 mb-3 flex flex-col gap-2">
                <span class="font-bold">{{ props.user.label }}</span>
                <span class="whitespace-pre-line text-sm">{{ props.user.bio || "" }}</span>
            </div>
            <div class="flex flex-col gap-2" v-else>
                <Skeleton class="h-4 w-4/12" />
                <Skeleton class="h-24 w-4/12" />
            </div>
        </div>
    </div>
</template>
