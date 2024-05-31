<script setup lang="ts">
import { RouterLink } from "vue-router";

import InstagramTextLogo from "@/components/InstagramTextLogo.vue";
import { NavbarItem } from "@/components/ui/navbar";
</script>
<template>
    <nav class="absolute flex md:left-0 md:top-0 md:h-[100vh] md:w-[244px] md:flex-col md:border-r md:p-6 md:pb-4">
        <div class="my-4">
            <RouterLink :to="{ name: 'Home' }">
                <InstagramTextLogo />
            </RouterLink>
        </div>
        <div class="flex h-[100%] w-[100%] flex-1">
            <slot />
        </div>
        <NavbarItem label="Więcej" icon="more" />
    </nav>
</template>
