<template>
    <div id="app">
        <router-view />

        <div v-if="!isLoggedIn">
            <hr />
            <p>
                Please log in to continue to app
            </p>
            <p>
                <a class="btn btn-sm btn-outline-secondary"
                href="#"
                @click.prevent="login">Login</a>
            </p>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex'
import Constants from '@/constants'

export default {
    name: "app",
    data() {
        return {
            profile: {}
        };
    },
    computed: {
        nickname() {
           return this.profile ? this.profile.nickname : 'unknown'
        },
        ...Vuex.mapState([
            'isLoggedIn'
        ])
    },

    async created() {
        try {
            await this.$auth.renewTokens();
        } catch (e) {
            console.log(e);
        }
    },

    methods: {
        login() {
            this.$auth.login();
        },
        logout() {
            this.$auth.logOut();
        },
        
        handleLoginEvent(data) {
            this.$store.commit(Constants.Mutations.SET_LOGGED_IN, data.loggedIn)
            this.profile = data.profile
        }
    }
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>
