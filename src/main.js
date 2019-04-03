// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { format } from 'date-fns'
import App from '@/App'
import router from '@/router'
import auth from '@/plugins/auth'
import axios from '@/plugins/axios'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(auth)
Vue.use(axios)
Vue.use(format)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
