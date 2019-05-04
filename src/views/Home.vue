<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1>notes app</h1>
        <p>Here I write some things to display on the <a href="https://alejof.dev">main site</a></p>

        <div v-if="isLoggedIn">
            <p>
                <router-link to="/editor" class="btn btn-sm btn-outline-secondary">create a new entry</router-link>
                &nbsp;or <router-link to="/drafts" class="command-link">browse</router-link> existing ones.
            </p>
        </div>
    </div>
</template>

<script>
import Vuex from "vuex";

export default {
    name: "home",
    computed: {
        ...Vuex.mapState(["isLoggedIn"])
    }
};
</script>
