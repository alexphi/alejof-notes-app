import Vue from 'vue'
import Vuex from 'vuex'

import constants from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        [constants.Mutations.SET_LOGGED_IN](state, value) {
            state.isLoggedIn = value
        },
    },
    actions: {

    }
})
