<script setup lang="ts">
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "vue";
import { RouteLocationRaw, RouterLink } from "vue-router";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    style?: HTMLAttributes["style"];
    route?: RouteLocationRaw;
    label: string;
    icon: string;
}>();
</script>
<template>
    <RouterLink
        :to="props.route || '#'"
        class=""
        :class="
            cn(
                'hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-md sm:justify-center md:w-[100%] md:justify-start md:p-5',
                props.class,
            )
        "
        :style="props.style"
    >
        <img :src="props.icon" :alt="props.label" />
        <span class="sm:hidden md:inline">{{ props.label }}</span>
    </RouterLink>
</template>
