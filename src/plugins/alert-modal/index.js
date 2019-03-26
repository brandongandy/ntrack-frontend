// credit for component: https://github.com/vuejs-pt/vue-alert

import AlertModal from './AlertModal'

const alertWrapper = {
  install (Vue) {
    if (this.installed) return
    this.installed = true
    Vue.component('alert-modal', AlertModal)
    Object.defineProperties(Vue.prototype, {
      $alert: {
        get () {
          let el = this
          while (el) {
            for (let i = 0; i < el.$children.length; i++) {
              const child = el.$children[i]
              /* istanbul ignore else */
              if (child.$options._componentTag === 'alert-modal') {
                return child
              }
            }
            el = el.$parent
          }
          if (process.env.NODE_ENV !== 'production') {
            console.warn('AlertModal component must be part of this component scope or any of the parent\'s scope.')
          }
          return null
        }
      }
    })
  }
}

export default alertWrapper

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(alertWrapper)
}
