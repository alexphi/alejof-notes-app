import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AuthPlugin from "./plugins/auth"
import AxiosPlugin from "./plugins/axios"

import VueSimpleMarkdown from 'vue-simple-markdown'

Vue.use(AuthPlugin)
Vue.use(AxiosPlugin)
Vue.use(VueSimpleMarkdown)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
