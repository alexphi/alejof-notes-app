<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1>My notes</h1>
        <p>Write some things, or get back to the <a href="https://alejof.dev">main site</a></p>

        <div v-if="isLoggedIn">
            <hr />
            <p>
                <a class="btn btn-sm btn-outline-secondary"
                href="/new">Create new entry</a>
            </p>
            <p>
                Or, <a href="/list">browse</a> existing notes.
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
