<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import ProfileHeader from "@/components/profile/ProfileHeader.vue";

import UserProfile from "../components/profile/UserProfile.vue";

const route = useRoute();
const router = useRouter();

const username = route.params.username as string;
if (!username) {
    router.push({ name: "NotFound" });
}
</script>
<template>
    <div class="flex h-[100%] w-[100%] justify-center pt-7">
        <div class="sm:w-11/12 md:max-w-[935px]">
            <Suspense>
                <UserProfile :username="username" />
                <template #fallback>
                    <ProfileHeader />
                </template>
            </Suspense>
        </div>
    </div>
</template>
