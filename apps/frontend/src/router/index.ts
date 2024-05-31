import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";

import AuthLayout from "@/layouts/AuthLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: BaseLayout,
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import("@/views/HomeView.vue"),
            },
        ],
    },
    {
        path: "/auth",
        meta: {
            isPublic: true,
        },
        component: AuthLayout,
        children: [
            {
                path: "/login",
                name: "Login",
                component: () => import("@/views/auth/LoginView.vue"),
            },
            {
                path: "/register",
                name: "Register",
                component: () => import("@/views/auth/RegisterView.vue"),
            },
            {
                path: "/forgot-password",
                name: "ForgotPassword",
                component: () => import("@/views/auth/ForgotPasswordView.vue"),
            },
            {
                path: "/change-password",
                name: "ChangePassword",
                component: () => import("@/views/auth/ChangePasswordView.vue"),
            },
        ],
    },
    {
        path: "/:catchAll(.*)*",
        name: "NotFound",
        meta: {
            isPublic: true,
        },
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach(async (to, _from, next) => {
    if (!to.meta.isPublic) {
        const { user } = useUserStore();

        if (!user) {
            return next({
                name: "Login",
            });
        }
    }

    return next();
});

export { router };
