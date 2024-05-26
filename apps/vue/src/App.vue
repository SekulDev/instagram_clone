<script setup lang="ts">
import { login } from "@/services/auth";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = window.document.documentElement;
root.classList.remove("dark", "light");
root.classList.add(prefersDark ? "dark" : "light");

function test() {
    login("SekulDev", "abcd");
}
</script>

<template>
    <div class="bg-primary text-primary-foreground" @click="test()">BLABLA</div>
</template>
