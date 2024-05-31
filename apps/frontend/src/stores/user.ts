import { User } from "@/types";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
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

    updateStoreUser();

    function onLogin() {
        updateStoreUser();
    }

    function onLogout() {
        state.user = null;
        state.isAuthenticated = false;
        const router = useRouter();
        router.push({ name: "Login" });
    }

    return {
        ...toRefs(state),
        onLogin,
        onLogout,
    };
});
