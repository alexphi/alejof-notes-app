// src/plugins/auth.js

import authService from '../auth/authService'

export default {
  install(Vue) {
    Vue.prototype.$auth = authService

    Vue.mixin({
      created() {
        if (this.handleLogin) {
          authService.addListener('loginEvent', this.handleLogin)
        }
      },

      destroyed() {
        if (this.handleLogin) {
          authService.removeListener('loginEvent', this.handleLogin)
        }
      }
    })
  }
}
