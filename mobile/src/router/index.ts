import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import { useAuth } from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/home",
        name: "home",
        component: HomePage,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _, next) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated && to.name !== "login") {
        next({ name: "login" });
    } else if (isAuthenticated && to.name === "login") {
        next({ name: "home" });
    } else {
        next();
    }
});

export default router;
