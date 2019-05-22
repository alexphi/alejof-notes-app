import Vue from 'vue'
import Vuex from 'vuex'

import Constants from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        authData: {},
        isNotAllowed: false,
        headerType: Constants.HeaderTypes.NORMAL
    },
    mutations: {
        [Constants.Mutations.SET_AUTH_DATA](state, data) {
            state.isLoggedIn = data.loggedIn;
            state.authData = data;
        },
        [Constants.Mutations.SET_NOT_ALLOWED](state) {
            state.isNotAllowed = true;
        },
        [Constants.Mutations.SET_HEADER_TYPE](state, data) {
            state.headerType = data;
        },
    },
    actions: {

    }
})
