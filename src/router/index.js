import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/pages/Home";
import appTodo from "@/pages/app-todo";
import appLogin from "@/pages/appLogin";
import appRegister from "@/pages/appRegister";
import store from "@/store";

const routes = [
    { path: '/', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: appLogin, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/register', name: 'register', component: appRegister, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/todos', component: appTodo, name: 'todos', meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

router.beforeResolve((to ) => {
    const loggedIn = store.state.auth.loggedIn;
    if (to.meta.requiresAuth && !loggedIn) {
        return {
            path: 'login',
            query: { redirect: to.fullPath }
        }
    } else if (to.meta.redirectIfAuth && loggedIn) {
        return {
            path: '/'
        }
    }
});

export default router;
