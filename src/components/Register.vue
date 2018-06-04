<template>
<div class = "columns">
  <div class="column">
  <b-field label="Giveth me name">
    <b-input v-model.trim="username">
    </b-input>
  </b-field>
  <b-field label="Giveth me secret">
    <b-input v-model="password" type="password" password-reveal>
    </b-input>
  </b-field>
  <b-field>
  <button v-on:click="register" class="button is-primary">Zarejestruj</button>
  </b-field>
</div>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register (event) {
      delete this.$http.defaults.headers.common['Authorization']
      this.$http.post('http://localhost:8080/api/register', {login: this.username, password: this.password, enabled: true}).then((response) => {
        console.log(response)
        this.$router.push('/login')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
