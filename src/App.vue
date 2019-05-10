<template>
    <div id="app">
        <p class="header-img">
            <router-link to="/">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
            </router-link>
        </p>

        <transition
            name="fade"
            mode="out-in"
        >
            <router-view />
        </transition>

        <hr />
        <div v-if="!isLoggedIn">
            <p
                v-if="isNotAllowed"
                class="text-muted"
            >
                You're not allowed to access this app (yet)
            </p>
            <p v-else>
                Hello, me. Please <a
                    class="command-link"
                    href="#"
                    @click.prevent="login"
                >log in</a> to continue
            </p>
        </div>
        <div v-else>
            <p class="small">
                Logged in as {{ nickname }} &bull; <a
                    href="#"
                    @click.prevent="logout"
                >logout</a>
            </p>
        </div>
    </div>
</template>

<script>
import Vuex from "vuex";
import Constants from "@/constants";

export default {
    name: "app",
    computed: {
        nickname() {
            return this.authData ? this.authData.profile.nickname : "unknown";
        },
        ...Vuex.mapState(["isLoggedIn", "isNotAllowed", "authData"])
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
            this.$store.commit(Constants.Mutations.SET_AUTH_DATA, data);

            if (data.loggedIn) {
                this.$http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                console.log("Set default header for http");
            }
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
