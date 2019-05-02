<template>
    <div id="app">
        <div v-if="!isLoggedIn" class="log-in">
            <p>
                Please log in to continue to app
            </p>
            <a class="btn btn-sm btn-outline-secondary"
               href="#"
               @click.prevent="login">Login</a>
        </div>

        <router-view />

        <div v-if="isLoggedIn" class="log-out text-right small">
            <hr />
            Logged in as {{ nickname }}
            &nbsp;&bull;&nbsp;
            <a href="#"
               @click.prevent="logout">Log out</a>
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

    margin-top: 30px;
}

.log-in {
    text-align: center;
    margin-top: -10px;
}

.log-out {
    text-align: center;
    margin-top: 50px;
}

.right-h2-btn {
    margin-top: 5px;
}

@media (min-width: 768px) {
    #app {
        margin-top: 30px;
    }
}
</style>
