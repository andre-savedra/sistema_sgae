import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3f5d63b2 = () => interopDefault(import('..\\pages\\addTarefa\\index.vue' /* webpackChunkName: "pages/addTarefa/index" */))
const _25fc8521 = () => interopDefault(import('..\\pages\\andamentoTarefa\\index.vue' /* webpackChunkName: "pages/andamentoTarefa/index" */))
const _9864a2f2 = () => interopDefault(import('..\\pages\\erro\\index.vue' /* webpackChunkName: "pages/erro/index" */))
const _0ac0bb82 = () => interopDefault(import('..\\pages\\initial\\index.vue' /* webpackChunkName: "pages/initial/index" */))
const _0f6d3ea6 = () => interopDefault(import('..\\pages\\lobby\\index.vue' /* webpackChunkName: "pages/lobby/index" */))
const _9fb5f98c = () => interopDefault(import('..\\pages\\meuAcesso\\index.vue' /* webpackChunkName: "pages/meuAcesso/index" */))
const _41b6f75e = () => interopDefault(import('..\\pages\\pdf\\index.vue' /* webpackChunkName: "pages/pdf/index" */))
const _444f6294 = () => interopDefault(import('..\\pages\\registrar\\index.vue' /* webpackChunkName: "pages/registrar/index" */))
const _63eda994 = () => interopDefault(import('..\\pages\\reset\\index.vue' /* webpackChunkName: "pages/reset/index" */))
const _02b33c50 = () => interopDefault(import('..\\pages\\sucesso\\index.vue' /* webpackChunkName: "pages/sucesso/index" */))
const _e268616a = () => interopDefault(import('..\\pages\\tarefas\\index.vue' /* webpackChunkName: "pages/tarefas/index" */))
const _a553d360 = () => interopDefault(import('..\\pages\\teste\\index.vue' /* webpackChunkName: "pages/teste/index" */))
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
    path: "/andamentoTarefa",
    component: _25fc8521,
    name: "andamentoTarefa"
  }, {
    path: "/erro",
    component: _9864a2f2,
    name: "erro"
  }, {
    path: "/initial",
    component: _0ac0bb82,
    name: "initial"
  }, {
    path: "/lobby",
    component: _0f6d3ea6,
    name: "lobby"
  }, {
    path: "/meuAcesso",
    component: _9fb5f98c,
    name: "meuAcesso"
  }, {
    path: "/pdf",
    component: _41b6f75e,
    name: "pdf"
  }, {
    path: "/registrar",
    component: _444f6294,
    name: "registrar"
  }, {
    path: "/reset",
    component: _63eda994,
    name: "reset"
  }, {
    path: "/sucesso",
    component: _02b33c50,
    name: "sucesso"
  }, {
    path: "/tarefas",
    component: _e268616a,
    name: "tarefas"
  }, {
    path: "/teste",
    component: _a553d360,
    name: "teste"
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
