<template>
  <div id="app">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
    <navbar/>
    <transition name="routerAnimation">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'

export default {
  name: 'Entry',
  data () {
    return {
      authenticated: false,
      username: '',
      userId: -1
    }
  },
  components: {
    navbar
  }
}
</script>

<style>

.routerAnimation-enter-active, .routerAnimation-leave-active {
  transition-property: opacity;
  transition-duration: 1s;
}

.routerAnimation-enter-active {
  transition-delay: 0.5s;
}

.routerAnimation-enter, .routerAnimation-leave-active {
  opacity: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
