<template>
    <div>
        <template v-if="isLoggedIn">
            <h1>Welcome!</h1>
        </template>
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
