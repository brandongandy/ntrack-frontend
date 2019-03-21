import auth0 from 'auth0-js'
import Vue from 'vue'
import authConfig from '../auth_config.json'

// exchange the object with your
// eslint-disable-next-line
let webAuth = new auth0.WebAuth({
  domain: 'ntrack.auth0.com',
  clientID: '3Eqou2Vrji1OHJQ3ojsX5VnuqVJjwp8n',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'token id_token',
  scope: 'openid profile email'
})

let auth = new Vue({
  computed: {
    token: {
      get: function () {
        return localStorage.getItem('id_token')
      },
      set: function (idToken) {
        localStorage.setItem('id_token', idToken)
      }
    },
    accessToken: {
      get: function () {
        return localStorage.getItem('access_token')
      },
      set: function (accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: function () {
        return localStorage.getItem('expires_at')
      },
      set: function (expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: function () {
        return JSON.parse(localStorage.getItem('user'))
      },
      set: function (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    userId: {
      get: function () {
        return this.user.sub
      }
    }
  },
  methods: {
    login () {
      webAuth.authorize()
    },
    logout () {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.logout({
          returnTo: 'http://localhost:8080/logout',
          clientID: authConfig.clientId
        })
      })
    },
    isAuthenticated () {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$auth = auth
  }
}
