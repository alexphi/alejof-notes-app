<template>
  <div id="app">
    <div class="h-screen">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",

  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(`> Error renewing tokens: ${e}`);
    }
  }
};
</script>
