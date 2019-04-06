// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { format } from 'date-fns'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import auth from '@/plugins/auth'
import api from '@/plugins/axios'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#43A047',
    secondary: '#455A64'
  }
})

Vue.use(auth)
Vue.prototype.$axios = api
Vue.use(format)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
