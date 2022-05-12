export { default as CustomCarousel } from '../..\\components\\CustomCarousel.vue'
export { default as PdfCover } from '../..\\components\\PdfCover.vue'
export { default as PdfHeader } from '../..\\components\\PdfHeader.vue'
export { default as PdfTaskComponent } from '../..\\components\\PdfTaskComponent.vue'
export { default as Profile } from '../..\\components\\Profile.vue'

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
