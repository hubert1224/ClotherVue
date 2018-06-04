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
    <button v-on:click="login" class="button is-primary">Zaloguj</button>
    </b-field>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login (event) {
      this.$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(this.username + ':' + this.password) // Send basic auth header (base 64 encoded concat of login and pass)
      this.$http.post('http://localhost:8080/user', {login: this.username, password: this.password, enabled: true}).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
        delete this.$http.defaults.headers.common['Authorization']
      })
    }

  }
}
</script>

<style scoped>

</style>
