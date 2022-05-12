export const CustomCarousel = () => import('../..\\components\\CustomCarousel.vue' /* webpackChunkName: "components/custom-carousel" */).then(c => wrapFunctional(c.default || c))
export const PdfCover = () => import('../..\\components\\PdfCover.vue' /* webpackChunkName: "components/pdf-cover" */).then(c => wrapFunctional(c.default || c))
export const PdfHeader = () => import('../..\\components\\PdfHeader.vue' /* webpackChunkName: "components/pdf-header" */).then(c => wrapFunctional(c.default || c))
export const PdfTaskComponent = () => import('../..\\components\\PdfTaskComponent.vue' /* webpackChunkName: "components/pdf-task-component" */).then(c => wrapFunctional(c.default || c))
export const Profile = () => import('../..\\components\\Profile.vue' /* webpackChunkName: "components/profile" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
