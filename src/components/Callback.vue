<!-- src/components/Callback.vue -->

<template>
    <div class="loading">
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    methods: {
        handleLoginEvent(data) {
            this.$router.push(data.state.target || "/");
        }
    },
    created() {
        this.$auth.handleAuthentication();
    }
};
</script>

<style>
.loading {
    margin-top: 50px;
    text-align: center;
}
</style>
