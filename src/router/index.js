import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import moment from "moment";

import Home from "@/pages/Home";
import appTodo from "@/pages/app-todo";
import appLogin from "@/pages/appLogin";
import appRegister from "@/pages/appRegister";
import NotFound from "@/pages/NotFound";
import appProfile from "@/pages/AppProfile";

const routes = [
    { path: '/', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: appLogin, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/register', name: 'register', component: appRegister, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/profile', component: appProfile, name: 'profile', meta: { requiresAuth: true } },
    { path: '/todos', component: appTodo, name: 'todos', meta: { requiresAuth: true } },
    {
        // path: "*",
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
        meta: {
            layout: '404',
            requiresAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

router.beforeResolve((to ) => {
    const loggedIn = store.state.auth.loggedIn;
    const expires_in = store.state.auth.expires_in;
    const ExpireObj = moment(expires_in);
    const diff = moment().diff(ExpireObj);

    if (to.meta.requiresAuth && !loggedIn) {
        return {
            path: 'login',
            query: { redirect: to.fullPath }
        }
    }
    else if(to.meta.requiresAuth && diff >= 0) {
        return {
            path: 'login',
            query: { redirect: to.fullPath }
        }
    }
    else if (to.meta.redirectIfAuth && loggedIn && diff < 0) {
        return {
            path: '/'
        }
    }
});

export default router;
