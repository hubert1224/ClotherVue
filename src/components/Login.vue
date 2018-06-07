<template>
  <div class = "columns">
    <div class="column card">
      <div class="card-header">
        <h3 class="card-header-title">Logowanie</h3>
      </div>
      <div class="card-content">
        <b-field label="Login">
          <b-input v-model.trim="username">
          </b-input>
        </b-field>
        <b-field label="Hasło">
          <b-input v-model="password" type="password" password-reveal>
          </b-input>
        </b-field>
        <b-field>
          <button v-on:click="login" class="button is-primary">Zaloguj</button>
        </b-field>
      </div>
    </div>
    <div class="column"> </div>
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
      this.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
      this.$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(this.username + ':' + this.password) // Send basic auth header (base 64 encoded concat of login and pass)
      this.$http.post('http://localhost:8080/api/login', {login: this.username, password: this.password, enabled: true}).then((response) => {
        console.log(response)
        this.$parent.authenticated = true
        this.$parent.username = this.username
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
        delete this.$http.defaults.headers.common['Authorization']
      })
    }

  }
}
</script>

<style scoped>
.card-header {
  background-color: #7957d5;
}

.card-header-title {
  color:white;
}
</style>
