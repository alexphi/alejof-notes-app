<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1>Notes app</h1>
        <p>Where I write some things to display on the <a href="https://alejof.dev">main site</a></p>

        <div v-if="isLoggedIn">
            <hr />
            <p>
                <router-link to="/new" class="btn btn-sm btn-outline-secondary">Create a new entry</router-link>
            </p>
            <p>
                Or, <router-link to="/list" class="command-link">browse</router-link> existing ones.
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
