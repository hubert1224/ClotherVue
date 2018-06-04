<template>
<div class="columns">
  <div class="column">
    <ul>
      <li v-for='user in users' :key='user.id'>
        {{user.login}} :: {{user.password}} | {{user.enabled}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'mainInterface',
  data () {
    return {
      users: {}
    }
  },
  mounted () {
    this.$http.get('http://localhost:8080/api/users').then((response) => { this.users = response }).then((error) => {
      console.log(error)
      this.$router.push('/')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
