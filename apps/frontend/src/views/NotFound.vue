<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const { t } = useI18n();
</script>

<template>
    <div class="container flex w-[100vh] flex-col items-center gap-7 p-5">
        <h1 class="text-center text-2xl font-semibold">{{ t("pages.notFound.title") }}</h1>
        <h3 class="font-regular text-md text-center">
            {{ t("pages.notFound.description") }}
            <RouterLink :to="{ name: 'Home' }">{{ t("pages.notFound.back") }}</RouterLink>
        </h3>
    </div>
</template>
