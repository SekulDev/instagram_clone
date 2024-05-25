<script setup lang="ts">
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = window.document.documentElement;
root.classList.remove("dark", "light");
root.classList.add(prefersDark ? "dark" : "light");
</script>

<template>
    <div class="bg-primary text-primary-foreground">BLABLA</div>
</template>
