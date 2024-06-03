<script setup lang="ts">
import { Post, User } from "@/types";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

import { getUserPosts } from "@/services/post";
import { getUser, getUserByUsername } from "@/services/user";

import Title from "@/components/Title.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfilePosts from "@/components/profile/ProfilePosts.vue";

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

const userPosts = await getUserPosts(props.username);

function onFollowUpdate(isFollowing: number) {
    user.is_following = isFollowing;
}

const user = reactive<User>(userValue as User);
const posts = reactive<Post[]>((userPosts as Post[]) ?? []);
</script>
<template>
    <Title :title="user.label" />
    <ProfileHeader @update-follow="onFollowUpdate" :user="user" :is-me="userStore.user?.login == props.username" />
    <ProfilePosts :posts="posts" />
</template>
