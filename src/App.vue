<template>
  <div id="app">
    <router-view/>
    
    <hr style="border-color: #facf5a" />
    
    <div v-if="isAuthenticated">
      <a class="btn btn-danger" href="#" @click.prevent="logout">Log out</a>
    </div>
    <div v-else>
      <a class="btn btn-info" href="#" @click.prevent="login">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isAuthenticated: false
    };
  },
  
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  },
  
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
