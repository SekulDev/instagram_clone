<script setup lang="ts">
import { cn } from "@/lib/utils";
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes["class"]; inset?: boolean }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuItem
        v-bind="forwardedProps"
        :class="
            cn(
                'hover:bg-foreground/10 relative flex cursor-pointer select-none items-center gap-2 rounded-md px-5 py-4 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                inset && 'pl-8',
                props.class,
            )
        "
    >
        <slot />
    </DropdownMenuItem>
</template>
