<script setup lang="ts">
import { IconProps } from "./props";

const props = defineProps<IconProps>();
</script>
<template>
    <svg
        aria-label="Skomentuj"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        :class="props.class"
        :style="props.style"
    >
        <title>Skomentuj</title>
        <path
            d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
        ></path>
    </svg>
</template>
