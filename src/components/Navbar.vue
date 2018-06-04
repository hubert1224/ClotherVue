<template>
  <nav class="navbar is-warning" role="navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-primary">
        <h1 class="is-size-2 is-italic">C</h1>
        <p class="is-italic">lother</p>
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/interface" class="navbar-item">
          <button class="button is-primary">Interfejs</button>
        </router-link>
        <router-link to="/login" class="navbar-item">
          <button class="button is-primary">Logowanie</button>
        </router-link>
        <router-link to="/register" class="navbar-item">
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
