import Vue from 'vue'
import Vuex from 'vuex'

import constants from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        isNotAllowed: false
    },
    mutations: {
        [constants.Mutations.SET_LOGGED_IN](state, value) {
            state.isLoggedIn = value
        },
        [constants.Mutations.SET_NOT_ALLOWED](state, value) {
            state.isNotAllowed = value
        },
    },
    actions: {

    }
})
