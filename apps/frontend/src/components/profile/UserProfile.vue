<script setup lang="ts">
import { User } from "@/types";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

import { getUser, getUserByUsername } from "@/services/user";

import Title from "@/components/Title.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";

const props = defineProps<{
    username: string;
}>();
const router = useRouter();

const userStore = useUserStore();
if (!userStore.user) {
    router.push({ name: "Login" });
}

const userValue = await (props.username == userStore.user?.login ? getUser() : getUserByUsername(props.username));
if (userValue == false) {
    router.push({ name: "NotFound" });
}

function onFollowUpdate(isFollowing: number) {
    user.is_following = isFollowing;
}

const user = reactive<User>(userValue as User);
</script>
<template>
    <Title :title="user.label" />
    <ProfileHeader @update-follow="onFollowUpdate" :user="user" :is-me="userStore.user?.login == props.username" />
</template>
