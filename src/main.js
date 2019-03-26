// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from '@/App'
import router from '@/router'
import auth from '@/plugins/auth'
import axios from '@/plugins/axios'
import alertModal from '@/plugins/alert-modal/index.js'

Vue.config.productionTip = false
Vue.use(auth)
Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(alertModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
