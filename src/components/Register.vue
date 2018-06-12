<template>
<div class = "columns">
  <div class="column card">
    <div class="card-header">
      <h3 class="card-header-title">Rejestracja</h3>
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
        <button v-on:click="register" class="button is-primary">Zarejestruj</button>
      </b-field>
      <b-field>
        <span ref="valText" v-show="showVal" class="title is-4"></span>
      </b-field>
    </div>
  </div>
  <div class="column"> </div>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      username: '',
      password: '',
      showVal: false
    }
  },
  methods: {
    register (event) {
      delete this.$http.defaults.headers.common['Authorization']
      this.$http.post('http://localhost:8080/api/register', {login: this.username, password: this.password, enabled: true}).then((response) => {
        this.$refs.valText.textContent = 'Rejestracja udana!'
        this.showVal = true
        this.$router.push('/login')
      }).catch((error) => {
        this.showVal = true
        this.$refs.valText.textContent = 'Rejestracja nieudana!'
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
  margin-left: 10%;
}

  .card-header {
    background-color: #7957d5;
  }

  .card-header-title {
    color:white;
  }
</style>
