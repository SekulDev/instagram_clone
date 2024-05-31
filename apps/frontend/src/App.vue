<script setup lang="ts">
import { RouterView } from "vue-router";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = window.document.documentElement;
root.classList.remove("dark", "light");
root.classList.add(prefersDark ? "dark" : "light");
</script>

<template>
    <RouterView />
</template>
