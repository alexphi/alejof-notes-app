<template>
    <div id="app">
        <router-link to="/">
            <svg viewBox="0 -1 401.52289 401" class="w-20" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg>
        </router-link>

        <div :class="`content-after-${headerType}`">
            <transition
                name="fade"
                mode="out-in">
                <router-view />
            </transition>
        </div>

        <div v-if="!isLoggedIn">
            <p
                v-if="isNotAllowed"
                class="text-muted">
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
                    @click.prevent="logout">logout</a>
            </p>
        </div>

        <p class="text-sm">
            Title icon made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </p>
    </div>
</template>

<script>
import Vuex from "vuex"
import Constants from "@/constants"

export default {
    name: "app",
    computed: {
        nickname() {
            return this.authData ? this.authData.profile.nickname : "unknown"
        },
        ...Vuex.mapState(["isLoggedIn", "isNotAllowed", "authData", "headerType"])
    },

    async created() {
        // Add navigation guards
        this.$router.beforeEach((to, from, next) => {
            if (to.name === "new" || to.name === "edit" || to.name === "view") {
                this.$store.commit(Constants.Mutations.SET_HEADER_TYPE, Constants.HeaderTypes.SMALL)
            } else {
                this.$store.commit(Constants.Mutations.SET_HEADER_TYPE, Constants.HeaderTypes.NORMAL)
            }

            return next()
        });

        try {
            await this.$auth.renewTokens()
        } catch (e) {
            console.log(`> Error renewing tokens: ${e}`)
        }
    },

    methods: {
        login() {
            this.$auth.login()
        },
        logout() {
            this.$auth.logOut()
        },

        handleLogin(data) {
            this.$store.commit(Constants.Mutations.SET_AUTH_DATA, data)

            if (data.loggedIn) {
                this.$http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
                this.$http.defaults.headers.common["Notes-Tenant-Id"] = process.env.VUE_APP_API_TENANT

                console.log("Set default headers for http")
            }
        }
    }
}
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
