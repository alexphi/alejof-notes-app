import Vue from 'vue'
import Vuex from 'vuex'

import constants from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        authData: {},
        isNotAllowed: false
    },
    mutations: {
        [constants.Mutations.SET_AUTH_DATA](state, data) {
            state.isLoggedIn = data.loggedIn;
            state.authData = data;
        },
        [constants.Mutations.SET_NOT_ALLOWED](state) {
            state.isNotAllowed = true;
        },
    },
    actions: {

    }
})
