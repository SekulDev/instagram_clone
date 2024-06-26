import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import { usePostStore } from "@/stores/post";
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
            {
                path: "/explore",
                name: "Explore",
                children: [
                    {
                        path: "/explore/tag/:tag",
                        name: "Tag",
                        component: () => import("@/views/ExploreView.vue"),
                    },
                ],
                component: () => import("@/views/ExploreView.vue"),
            },
            {
                path: "/settings",
                name: "Settings",
                component: () => import("@/views/SettingsView.vue"),
            },
            {
                path: "/@:username",
                name: "Profile",
                component: () => import("@/views/ProfileView.vue"),
            },
            {
                path: "/post/:postId(\\d+)",
                name: "Post",
                component: () => import("@/views/HomeView.vue"),
                // redirect: { name: "Home" },
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
                path: "/change-password/:uid",
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

router.beforeEach(async (to, from, next) => {
    if (!to.meta.isPublic) {
        const { isReady, $subscribe } = useUserStore();

        if (!isReady) {
            await new Promise<void>((res) => {
                $subscribe((_mutation, state) => {
                    if (state.isReady) {
                        res();
                    }
                });
            });
        }

        const { user } = useUserStore();

        if (!user) {
            return next({
                name: "Login",
            });
        }

        if (to.name == "Post") {
            const { setPost } = usePostStore();
            if (setPost) {
                setPost(Number(to.params.postId as string));
            }
            if (!from) {
                return next({ name: "Home" });
            }
            return next(from);
        }
    }

    return next();
});

export { router };
