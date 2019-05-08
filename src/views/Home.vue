<template>
    <div>
        <h1>AlejoF Notes app</h1>
        <p>Here I write some things to display on the <a :href="siteUrl">main site</a>.</p>

        <div class="view-content"></div>

        <div v-if="isLoggedIn">
            <p>
                <router-link to="/new" class="btn btn-sm btn-outline-secondary">create a new entry</router-link>
                &nbsp;or <router-link to="/list" class="command-link">browse</router-link> existing ones.
            </p>
        </div>
    </div>
</template>

<script>
import Vuex from "vuex";

export default {
    name: "name",
    data() {
        return {
            siteUrl: process.env.VUE_APP_MAIN_SITE_URL,
        }
    },
    computed: {
        ...Vuex.mapState([
            'isLoggedIn'
        ])
    }
};
</script>
