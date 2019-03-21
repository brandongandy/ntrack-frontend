import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1/resources'
axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios
  }
}
