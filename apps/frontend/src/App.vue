<script setup lang="ts">
import { RouterView } from "vue-router";

import Title from "@/components/Title.vue";

import { useThemeStore } from "./stores/theme";

useThemeStore();
</script>

<template>
    <Title />
    <RouterView />
</template>
