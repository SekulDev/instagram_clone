<script setup lang="ts">
import { IconProps } from "./props";

const props = defineProps<IconProps>();
</script>
<template>
    <svg
        aria-label="Ustawienia"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        :class="props.class"
        :style="props.style"
    >
        <title>Ustawienia</title>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="3"
            x2="21"
            y1="4"
            y2="4"
        ></line>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="3"
            x2="21"
            y1="12"
            y2="12"
        ></line>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="3"
            x2="21"
            y1="20"
            y2="20"
        ></line>
    </svg>
</template>
