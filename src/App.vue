<template>
  <div id="app">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
export default {
  name: 'Entry',
  data () {
    return {

    }
  },
  components: {
    navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
