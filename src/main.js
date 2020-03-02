import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AuthPlugin from "./plugins/auth"
import AxiosPlugin from "./plugins/axios"

import VueShowdown from 'vue-showdown'

import './assets/tailwind.css'

Vue.use(AuthPlugin)
Vue.use(AxiosPlugin)
Vue.use(VueShowdown, {
    flavor: 'github',
    options: {
      emoji: false,
    },
  })

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
