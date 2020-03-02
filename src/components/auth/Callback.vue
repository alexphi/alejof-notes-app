<!-- src/components/Callback.vue -->

<template>
  <div>
    <div class="p-4 mx-2">
      <span class="text-gray-400">Loading...</span>
    </div>
  </div>
</template>

<script>
import Constants from "@/constants";

export default {
  async created() {
    try {
      await this.$auth.handleAuthentication();
    } catch (e) {
      console.log(`Error authenticating: ${e}`);

      this.$store.commit(Constants.Mutations.SET_NOT_ALLOWED);
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
