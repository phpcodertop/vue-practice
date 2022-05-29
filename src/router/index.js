import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import moment from "moment";

import Home from "@/pages/Home/Home";
import appTodo from "@/pages/Todo/app-todo";
import appLogin from "@/pages/Auth/appLogin";
import appRegister from "@/pages/Auth/appRegister";
import NotFound from "@/pages/NotFound";
import appProfile from "@/pages/Auth/AppProfile";
import appContactsList from "@/pages/Contacts/AppContactsList";
import appContactsEdit from "@/pages/Contacts/appContactsEdit";
import contactUs from "@/pages/ContactUs/ContactUs";
import usersList from "@/pages/Users/UsersList";
import usersEdit from "@/pages/Users/UsersEdit";
import usersCreate from "@/pages/Users/UsersCreate";

const routes = [
    { path: '/', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: appLogin, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/register', name: 'register', component: appRegister, meta: { layout: 'auth', redirectIfAuth: true }},
    { path: '/profile', component: appProfile, name: 'profile', meta: { requiresAuth: true } },
    { path: '/todos', component: appTodo, name: 'todos', meta: { requiresAuth: true } },
    { path: '/contact-us', component: contactUs, name: 'contactUs', meta: { requiresAuth: true } },
    { path: '/contacts', component: appContactsList, name: 'contacts', meta: { requiresAuth: true } },
    { path: '/contacts/:id', component: appContactsEdit, name: 'contactsEdit', meta: { requiresAuth: true } },
    { path: '/users', component: usersList, name: 'users', meta: { requiresAuth: true } },
    { path: '/users/new', component: usersCreate, name: 'usersCreate', meta: { requiresAuth: true } },
    { path: '/users/:id', component: usersEdit, name: 'usersEdit', meta: { requiresAuth: true } },
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
