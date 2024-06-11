<script setup lang="ts">
import { cn } from "@/lib/utils";
import { NavbarItemProps } from "@/types";
import { computed } from "vue";
import { RouteLocationNamedRaw } from "vue-router";
import { RouterLink, useRoute } from "vue-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const props = defineProps<NavbarItemProps>();

const route = useRoute();

const isSelected = computed<boolean>(() => {
    const propsRoute = props.route as RouteLocationNamedRaw;
    if (!propsRoute?.name) return false;
    return propsRoute.name == route.name;
});
</script>
<template>
    <RouterLink
        :to="props.route || '#'"
        :class="
            cn(
                'hover:bg-secondary flex cursor-pointer items-center gap-4 rounded-md transition-colors sm:justify-center md:w-[100%] md:justify-start md:px-2 md:py-3',
                props.class,
                isSelected && '!font-bold',
            )
        "
        :style="props.style"
    >
        <component v-if="props.icon" :is="props.icon" />
        <Avatar v-if="props.avatar">
            <AvatarImage :src="props.avatar" alt="avatar" />
            <AvatarFallback>
                <img src="@/assets/img/default_avatar.png" alt="avatar" />
            </AvatarFallback>
        </Avatar>
        <span class="hidden md:inline">{{ props.label }}</span>
    </RouterLink>
</template>
