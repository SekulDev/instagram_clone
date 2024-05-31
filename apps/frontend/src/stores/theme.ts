import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
    let currentTheme = window.localStorage.getItem("theme");
    if (!currentTheme || (currentTheme !== "dark" && currentTheme !== "light")) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        console.log(prefersDark);
        if (prefersDark) {
            currentTheme = "dark";
        } else {
            currentTheme = "light";
        }
    }

    const theme = useStorage("theme", currentTheme);
    const isDark = computed(() => theme.value === "dark");

    console.log(theme, "theme");

    function toggleTheme(): void {
        theme.value = isDark.value ? "light" : "dark";
        window.localStorage.setItem("theme", theme.value);
    }

    watchEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("dark", "light");
        root.classList.add(theme.value);
    });

    return { isDark, toggleTheme };
});
