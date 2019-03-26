<template>
  <transition :name="alertTransition" mode="out-in">
    <div v-if="alertShow" :key="triggerTransition">
      <b-alert
        :variant="alertType"
        :show="alertShow"
        dismissible
        fade
        class="w-50 mx-auto mb-5 fixed-bottom position-absolute">{{ alertMessage }}</b-alert>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertModal',
  data () {
    return {
      alertForceRender: false,
      alertMessage: '',
      alertType: '',
      alertTransition: '',
      alertShow: false,
      triggerTransition: true,
      default: {
        duration: 5000,
        forceRender: true,
        message: '',
        type: 'hide',
        transition: 'fade'
      }
    }
  },
  methods: {
    clearDefault () {
      this.default.type = 'hide'
    },
    setDefault ({ message = this.default.message, type = this.default.type, duration = this.default.duration, transition = this.default.transition, forceRender = this.default.forceRender } = {}) {
      this.default.message = message
      this.default.type = type
      this.default.duration = duration
      this.default.transition = transition
      this.default.forceRender = forceRender
      return this
    },
    show ({ message = this.default.message, type = this.default.type, duration = this.default.duration, transition = this.default.transition, forceRender = this.default.forceRender } = {}) {
      this.alertShow = true
      this.alertMessage = message
      this.alertType = type
      this.alertTransition = transition
      this.alertForceRender = forceRender
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
      }
      if (duration) {
        this.alertTimeout = setTimeout(() => {
          if (this.default.type === 'hide') {
            this.hide()
          } else {
            this.show({
              duration: false
            })
          }
        }, duration)
      }
      if (this.alertForceRender) {
        this.triggerTransition = !this.triggerTransition
      }
    },
    hide () {
      this.alertShow = false
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
      }
    },
    danger (args) {
      this.show({ type: 'danger', ...args })
    },
    info (args) {
      this.show({ type: 'info', ...args })
    },
    success (args) {
      this.show({ type: 'success', ...args })
    },
    warning (args) {
      this.show({ type: 'warning', ...args })
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.smooth {
  transition: all 0.5s ease;
}
</style>
