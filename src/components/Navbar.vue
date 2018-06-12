<template>
  <nav class="navbar is-transparent" role="navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-primary">
        <h1 class="is-size-2 is-italic">C</h1>
        <p class="is-italic">lother</p>
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <p v-if="this.$parent.authenticated" class="helloText navbar-item has-text-weight-bold">Witaj, {{this.$parent.username}}!</p>
        <router-link v-if="this.$parent.authenticated" to="/interface" class="navbar-item">
          <button class="button is-primary">Interfejs</button>
        </router-link>
        <a v-if="this.$parent.authenticated" class="navbar-item">
          <button v-on:click="logout" class="button is-primary">Wyloguj</button>
        </a>
        <router-link v-if="this.$parent.authenticated === false" to="/login" class="navbar-item">
          <button class="button is-primary">Logowanie</button>
        </router-link>
        <router-link v-if="this.$parent.authenticated === false" to="/register" class="navbar-item">
          <button class="button is-primary">Rejestracja</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$http.get('http://localhost:8080/logout')
      this.$parent.authenticated = false
      this.$parent.username = ''
      delete this.$http.defaults.headers.common['Authorization']
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .helloText {
    color:#7957d5 !important;
  }

  nav {
      background-color: transparent;
  }
</style>
