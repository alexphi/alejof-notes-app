<!-- src/components/Callback.vue -->

<template>
    <div>
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
import Constants from '@/constants'

export default {
    async created() {
        try {
            await this.$auth.handleAuthentication();
        } catch (e) {
            console.log(`Error authenticating: ${e}`);

            this.$store.commit(Constants.Mutations.SET_NOT_ALLOWED, true);
            this.$router.push("/");
        }
    },

    methods: {
        handleLogin(data) {
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
