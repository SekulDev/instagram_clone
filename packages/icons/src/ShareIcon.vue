<script setup lang="ts">
import { IconProps } from "./props";

const props = defineProps<IconProps>();
</script>
<template>
    <svg
        aria-label="Udostępnij post"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        :class="props.class"
        :style="props.style"
    >
        <title>Udostępnij post</title>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
        ></line>
        <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
        ></polygon>
    </svg>
</template>
