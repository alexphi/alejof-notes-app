import Vue from 'vue'
import Router from 'vue-router'
import Auth from "./auth/authService"

import Callback from './components/auth/Callback.vue'
import Home from "./views/Home.vue"

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
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "entry-list"  */ './views/List.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "entry-new"  */ './views/Edit.vue')
  },
  {
    path: '/edit/drats/:noteId',
    name: 'editDraft',
    component: () => import(/* webpackChunkName: "entry-new"  */ './views/Edit.vue'),
    props: route => ({ noteId: route.params.noteId, published: false }),
  },
  {
    path: '/edit/published/:noteId',
    name: 'editPublished',
    component: () => import(/* webpackChunkName: "entry-new"  */ './views/Edit.vue'),
    props: route => ({ noteId: route.params.noteId, published: true }),
  },
  {
    path: '/view/drafts/:noteId',
    name: 'viewDraft',
    component: () => import(/* webpackChunkName: "entry-view"  */ './views/View.vue'),
    props: route => ({ noteId: route.params.noteId, published: false }),
  },
  {
    path: '/view/published/:noteId',
    name: 'viewPublished',
    component: () => import(/* webpackChunkName: "entry-view"  */ './views/View.vue'),
    props: route => ({ noteId: route.params.noteId, published: true }),
  },
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/callback" || Auth.isAuthenticated()) {
    return next()
  }

  // Specify the current path as the customState parameter, meaning it
  // will be returned to the application after auth
  Auth.login({ target: to.path })
})

export default router
