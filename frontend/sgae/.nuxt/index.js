import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_17a7e348 from 'nuxt_plugin_plugin_17a7e348' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_dataviewplugin668bba0d_4d49b300 from 'nuxt_plugin_dataviewplugin668bba0d_4d49b300' // Source: .\\dataview.plugin.668bba0d.js (mode: 'all')
import nuxt_plugin_fileuploadplugin14ec843b_5bf1b97a from 'nuxt_plugin_fileuploadplugin14ec843b_5bf1b97a' // Source: .\\fileupload.plugin.14ec843b.js (mode: 'all')
import nuxt_plugin_calendarplugin3e1d113c_2eb84e39 from 'nuxt_plugin_calendarplugin3e1d113c_2eb84e39' // Source: .\\calendar.plugin.3e1d113c.js (mode: 'all')
import nuxt_plugin_autocompleteplugin26138e66_28208711 from 'nuxt_plugin_autocompleteplugin26138e66_28208711' // Source: .\\autocomplete.plugin.26138e66.js (mode: 'all')
import nuxt_plugin_inputmaskplugin1db0f8f0_0469a7d5 from 'nuxt_plugin_inputmaskplugin1db0f8f0_0469a7d5' // Source: .\\inputmask.plugin.1db0f8f0.js (mode: 'all')
import nuxt_plugin_inputtextplugin3ac6a489_6faa0c88 from 'nuxt_plugin_inputtextplugin3ac6a489_6faa0c88' // Source: .\\inputtext.plugin.3ac6a489.js (mode: 'all')
import nuxt_plugin_radiobuttonplugin54ad2d02_687fdee5 from 'nuxt_plugin_radiobuttonplugin54ad2d02_687fdee5' // Source: .\\radiobutton.plugin.54ad2d02.js (mode: 'all')
import nuxt_plugin_passwordplugin458bff4e_5f705995 from 'nuxt_plugin_passwordplugin458bff4e_5f705995' // Source: .\\password.plugin.458bff4e.js (mode: 'all')
import nuxt_plugin_accordionplugin1f01109a_528a2b03 from 'nuxt_plugin_accordionplugin1f01109a_528a2b03' // Source: .\\accordion.plugin.1f01109a.js (mode: 'all')
import nuxt_plugin_messagepluginae2a99ce_49600ee8 from 'nuxt_plugin_messagepluginae2a99ce_49600ee8' // Source: .\\message.plugin.ae2a99ce.js (mode: 'all')
import nuxt_plugin_tooltipplugin41b4b815_574b919c from 'nuxt_plugin_tooltipplugin41b4b815_574b919c' // Source: .\\tooltip.plugin.41b4b815.js (mode: 'all')
import nuxt_plugin_dropdownpluginbc7aa362_42def23c from 'nuxt_plugin_dropdownpluginbc7aa362_42def23c' // Source: .\\dropdown.plugin.bc7aa362.js (mode: 'all')
import nuxt_plugin_chartpluginff83d6a0_9d4fc1e4 from 'nuxt_plugin_chartpluginff83d6a0_9d4fc1e4' // Source: .\\chart.plugin.ff83d6a0.js (mode: 'all')
import nuxt_plugin_avatarplugin3a4c5717_655ac9ce from 'nuxt_plugin_avatarplugin3a4c5717_655ac9ce' // Source: .\\avatar.plugin.3a4c5717.js (mode: 'all')
import nuxt_plugin_sidebarplugin75b14fa4_7ded8e7a from 'nuxt_plugin_sidebarplugin75b14fa4_7ded8e7a' // Source: .\\sidebar.plugin.75b14fa4.js (mode: 'all')
import nuxt_plugin_buttonpluginc4c5fca0_76e8ba8b from 'nuxt_plugin_buttonpluginc4c5fca0_76e8ba8b' // Source: .\\button.plugin.c4c5fca0.js (mode: 'all')
import nuxt_plugin_configpluginripple176a8451_3445fa48 from 'nuxt_plugin_configpluginripple176a8451_3445fa48' // Source: .\\config.plugin-ripple.176a8451.js (mode: 'all')
import nuxt_plugin_axios_9bbda702 from 'nuxt_plugin_axios_9bbda702' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_plugin_52f780ee from 'nuxt_plugin_plugin_52f780ee' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"SGAE - Gestão Ambientes","htmlAttrs":{"lang":"pt"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.png"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round"}],"style":[],"script":[{"hid":"gf-script","innerHTML":"(function(){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round\";document.querySelector(\"head\").appendChild(l);})();"}],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_17a7e348 === 'function') {
    await nuxt_plugin_plugin_17a7e348(app.context, inject)
  }

  if (typeof nuxt_plugin_dataviewplugin668bba0d_4d49b300 === 'function') {
    await nuxt_plugin_dataviewplugin668bba0d_4d49b300(app.context, inject)
  }

  if (typeof nuxt_plugin_fileuploadplugin14ec843b_5bf1b97a === 'function') {
    await nuxt_plugin_fileuploadplugin14ec843b_5bf1b97a(app.context, inject)
  }

  if (typeof nuxt_plugin_calendarplugin3e1d113c_2eb84e39 === 'function') {
    await nuxt_plugin_calendarplugin3e1d113c_2eb84e39(app.context, inject)
  }

  if (typeof nuxt_plugin_autocompleteplugin26138e66_28208711 === 'function') {
    await nuxt_plugin_autocompleteplugin26138e66_28208711(app.context, inject)
  }

  if (typeof nuxt_plugin_inputmaskplugin1db0f8f0_0469a7d5 === 'function') {
    await nuxt_plugin_inputmaskplugin1db0f8f0_0469a7d5(app.context, inject)
  }

  if (typeof nuxt_plugin_inputtextplugin3ac6a489_6faa0c88 === 'function') {
    await nuxt_plugin_inputtextplugin3ac6a489_6faa0c88(app.context, inject)
  }

  if (typeof nuxt_plugin_radiobuttonplugin54ad2d02_687fdee5 === 'function') {
    await nuxt_plugin_radiobuttonplugin54ad2d02_687fdee5(app.context, inject)
  }

  if (typeof nuxt_plugin_passwordplugin458bff4e_5f705995 === 'function') {
    await nuxt_plugin_passwordplugin458bff4e_5f705995(app.context, inject)
  }

  if (typeof nuxt_plugin_accordionplugin1f01109a_528a2b03 === 'function') {
    await nuxt_plugin_accordionplugin1f01109a_528a2b03(app.context, inject)
  }

  if (typeof nuxt_plugin_messagepluginae2a99ce_49600ee8 === 'function') {
    await nuxt_plugin_messagepluginae2a99ce_49600ee8(app.context, inject)
  }

  if (typeof nuxt_plugin_tooltipplugin41b4b815_574b919c === 'function') {
    await nuxt_plugin_tooltipplugin41b4b815_574b919c(app.context, inject)
  }

  if (typeof nuxt_plugin_dropdownpluginbc7aa362_42def23c === 'function') {
    await nuxt_plugin_dropdownpluginbc7aa362_42def23c(app.context, inject)
  }

  if (typeof nuxt_plugin_chartpluginff83d6a0_9d4fc1e4 === 'function') {
    await nuxt_plugin_chartpluginff83d6a0_9d4fc1e4(app.context, inject)
  }

  if (typeof nuxt_plugin_avatarplugin3a4c5717_655ac9ce === 'function') {
    await nuxt_plugin_avatarplugin3a4c5717_655ac9ce(app.context, inject)
  }

  if (typeof nuxt_plugin_sidebarplugin75b14fa4_7ded8e7a === 'function') {
    await nuxt_plugin_sidebarplugin75b14fa4_7ded8e7a(app.context, inject)
  }

  if (typeof nuxt_plugin_buttonpluginc4c5fca0_76e8ba8b === 'function') {
    await nuxt_plugin_buttonpluginc4c5fca0_76e8ba8b(app.context, inject)
  }

  if (typeof nuxt_plugin_configpluginripple176a8451_3445fa48 === 'function') {
    await nuxt_plugin_configpluginripple176a8451_3445fa48(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_9bbda702 === 'function') {
    await nuxt_plugin_axios_9bbda702(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_52f780ee === 'function') {
    await nuxt_plugin_plugin_52f780ee(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
