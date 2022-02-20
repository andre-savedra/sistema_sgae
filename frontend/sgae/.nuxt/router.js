import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3f5d63b2 = () => interopDefault(import('..\\pages\\addTarefa\\index.vue' /* webpackChunkName: "pages/addTarefa/index" */))
const _40f2118a = () => interopDefault(import('..\\pages\\error\\index.vue' /* webpackChunkName: "pages/error/index" */))
const _2646fa32 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _9fb5f98c = () => interopDefault(import('..\\pages\\meuAcesso\\index.vue' /* webpackChunkName: "pages/meuAcesso/index" */))
const _32aaa26e = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _63eda994 = () => interopDefault(import('..\\pages\\reset\\index.vue' /* webpackChunkName: "pages/reset/index" */))
const _0f951c20 = () => interopDefault(import('..\\pages\\success\\index.vue' /* webpackChunkName: "pages/success/index" */))
const _e268616a = () => interopDefault(import('..\\pages\\tarefas\\index.vue' /* webpackChunkName: "pages/tarefas/index" */))
const _02cc2ccc = () => interopDefault(import('..\\pages\\usuarios\\index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _1f4bed31 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addTarefa",
    component: _3f5d63b2,
    name: "addTarefa"
  }, {
    path: "/error",
    component: _40f2118a,
    name: "error"
  }, {
    path: "/home",
    component: _2646fa32,
    name: "home"
  }, {
    path: "/meuAcesso",
    component: _9fb5f98c,
    name: "meuAcesso"
  }, {
    path: "/register",
    component: _32aaa26e,
    name: "register"
  }, {
    path: "/reset",
    component: _63eda994,
    name: "reset"
  }, {
    path: "/success",
    component: _0f951c20,
    name: "success"
  }, {
    path: "/tarefas",
    component: _e268616a,
    name: "tarefas"
  }, {
    path: "/usuarios",
    component: _02cc2ccc,
    name: "usuarios"
  }, {
    path: "/",
    component: _1f4bed31,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
