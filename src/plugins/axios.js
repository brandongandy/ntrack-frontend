import axios from 'axios'

let AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token')

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1/resources'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios
  }
}
