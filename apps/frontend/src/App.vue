<script setup lang="ts">
import { RouterView } from "vue-router";

import { useThemeStore } from "./stores/theme";

useThemeStore();
</script>

<template>
    <RouterView />
</template>
