import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
  crossDomain: true
})

api.interceptors.request.use(
  function (config) {
    const token = getBearerToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function getBearerToken () {
  return localStorage.getItem('access_token')
}

export default api
