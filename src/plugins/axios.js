import axios from 'axios'

export default {
    install(Vue) {
        // Set config defaults when creating the instance
        const instance = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        })

        console.log(`Set default baseURL as ${instance.defaults.baseURL}`)

        Vue.prototype.$http = instance
    }
}
