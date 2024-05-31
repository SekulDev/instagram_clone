<template>
    <div class="container flex h-[100vh] w-[100vw] items-center justify-center">
        <Navbar> </Navbar>
        <RouterView v-slot="{ Component }">
            <component :is="Component" />
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import { Navbar } from "@/components/ui/navbar";
</script>
