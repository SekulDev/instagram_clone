<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TabsTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'ring-offset-background focus-visible:ring-ring border-foreground text-foreground/50 data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b',
                props.class,
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
