<template>
    <div id="app">
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <router-view />

        <hr />
        <div v-if="!isLoggedIn">
            <p v-if="isNotAllowed" class="text-muted">
                You're not allowed to access this app (yet)
            </p>
            <p v-else>
                Please <a class="command-link" href="#" @click.prevent="login">log in</a> to continue
            </p>
        </div>
        <div v-else>
            <p class="small">
                Logged in as {{ nickname }} &bull; <span v-if="token">auth token {{token}} &bull; </span> <a href="#" @click.prevent="logout">logout</a>
            </p>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex'
import Constants from '@/constants'

export default {
    name: "app",
    computed: {
        nickname() {
           return this.authData ? this.authData.profile.nickname : 'unknown'
        },
        token() {
            return (this.authData && this.authData.token) ? 'valid' : '';
        },
        ...Vuex.mapState([
            'isLoggedIn',
            'isNotAllowed',
            'authData'
        ])
    },

    async created() {
        try {
            await this.$auth.renewTokens();
        } catch (e) {
            console.log(`> Error renewing tokens: ${e}`);
        }
    },

    methods: {
        login() {
            this.$auth.login();
        },
        logout() {
            this.$auth.logOut();
        },

        handleLogin(data) {
            this.$store.commit(Constants.Mutations.SET_AUTH_DATA, data)
        }
    }
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

hr {
    margin-top: 50px;
    margin-bottom: 15px;
}

</style>
