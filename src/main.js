import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AuthPlugin from "./plugins/auth";
import store from './store'

Vue.use(AuthPlugin);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
