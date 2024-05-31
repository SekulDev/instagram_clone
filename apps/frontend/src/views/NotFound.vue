<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="container flex w-[100vh] flex-col items-center gap-7 p-5">
        <h1 class="text-center text-2xl font-semibold">Przepraszamy, ta strona jest niedostępna</h1>
        <h3 class="font-regular text-md text-center">
            Kliknięty link mógł być uszkodzony lub strona mogła zostać usunięta.
            <RouterLink :to="{ name: 'Home' }">Wróć do Instagramu.</RouterLink>
        </h3>
    </div>
</template>
