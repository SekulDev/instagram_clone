<script setup lang="ts">
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<
    DropdownMenuSeparatorProps & {
        class?: HTMLAttributes["class"];
    }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DropdownMenuSeparator v-bind="delegatedProps" :class="cn('bg-foreground/10 -mx-1 my-2 h-px', props.class)" />
</template>
