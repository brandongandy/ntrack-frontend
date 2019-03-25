import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1/resources',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
})

http.interceptors.request.use(
  function (config) {
    const token = getBearerToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function getBearerToken () {
  return localStorage.getItem('access_token')
}

export default {
  install: function (Vue) {
    Vue.prototype.$axios = http
  }
}
