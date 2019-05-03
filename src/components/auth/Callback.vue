<!-- src/components/Callback.vue -->

<template>
    <div class="loading">
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    created() {
        this.$auth.handleAuthentication();
    },

    methods: {
        handleLoginEvent(data) {
            this.$router.push(data.state.target || "/");
        }
    }
};
</script>

<style>
.loading {
    margin-top: 50px;
    text-align: center;
}
</style>
