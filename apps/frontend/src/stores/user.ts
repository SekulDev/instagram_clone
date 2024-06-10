import { getAvatarUrl } from "@/lib/utils";
import { User } from "@/types";
import { defineStore } from "pinia";
import { reactive, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";

import { logout } from "@/services/auth";
import { getUser } from "@/services/user";

interface UserStore {
    user: User | null;
    isAuthenticated: boolean;
    isReady: boolean;
}

export const useUserStore = defineStore("user", () => {
    const state = reactive<UserStore>({
        user: null,
        isAuthenticated: false,
        isReady: false,
    });

    const userAvatar = ref<string>(getAvatarUrl(state.user?.avatar_url || ""));

    watch(
        () => state.user?.avatar_url,
        (newValue) => {
            userAvatar.value = getAvatarUrl(newValue || "");
        },
    );

    const updateStoreUser = async () => {
        const user = await getUser();
        if (user) {
            state.user = user;
            state.isAuthenticated = true;
        } else {
            logout();
        }
        state.isReady = true;
    };

    function refreshUser() {
        updateStoreUser();
    }

    updateStoreUser();

    function onLogin() {
        updateStoreUser();
    }

    function onLogout() {
        state.user = null;
        state.isAuthenticated = false;
        const router = useRouter();
        if (router) {
            router.push({ name: "Login" });
        }
    }

    return {
        ...toRefs(state),
        onLogin,
        onLogout,
        refreshUser,
        userAvatar,
    };
});
