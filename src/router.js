import Vue from 'vue'
import Router from 'vue-router'
import auth from "./auth/authService";

import Callback from './components/auth/Callback.vue'

import Home from "./views/Home.vue";

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/callback',
        name: 'callback',
        component: Callback
    },
    {
        path: '/new',
        name: 'new',
        component: () => import(/* webpackChunkName: "entry-new"  */ './views/New.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import(/* webpackChunkName: "entry-list"  */ './views/List.vue')
    },
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = auth.isAuthenticated()
    console.log(`> Navigating to ${to.path}. Authenticated = ${isAuthenticated}`)

    if (to.path === "/" || to.path === "/callback" || isAuthenticated) {
        return next();
    }

    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    auth.login({ target: to.path });
});

export default router;
