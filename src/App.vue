<template>
    <div id="app">
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
                Logged in as {{ nickname }} &bull; <a href="#" @click.prevent="logout">logout</a>
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
            'isLoggedIn',
            'isNotAllowed'
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

hr {
    margin-top: 50px;
    margin-bottom: 15px;
}

.command-link {
    font-weight: 700;
    font-family: 'Abel', sans-serif;
    font-size: 1.1em;
}

</style>
