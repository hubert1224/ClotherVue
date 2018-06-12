<template>
<form action="">
  <div class="modal-card">
    <header class="modal-card-head">
      <p v-if="intent === 'creating'" class="modal-card-title">Dodaj Kategorię</p>
      <p v-if="intent === 'updating'" class="modal-card-title">Aktualizuj Kategorię</p>
      <p v-if="intent === 'deleting'" class="modal-card-title">Usuń Kategorię</p>
    </header>
    <div class="modal-card-body" v-if="intent !== 'deleting'">
      <b-field label="Nazwa kategorii">
        <b-input ref="nameInput" v-model="dataCategory.categoryName"  required>
        </b-input>
      </b-field>
    </div>
    <footer class="modal-card-foot">
        <button class="button is-primary" v-if="intent !== 'deleting'" v-on:click="submit">Zatwierdź</button>
        <button class="button is-danger" v-if="intent === 'deleting'" v-on:click="remove">Usuń</button>
    </footer>
  </div>
</form>
</template>

<script>
export default {
  name: 'CategoryModal',
  data () {
    return {
      dataIntent: this.intent,
      dataCategory: this.selectedCategory
    }
  },
  props: ['intent', 'selectedCategory'],
  methods: {
    submit () {
      this.$parent.$parent.categories = {}
      if (this.dataIntent === 'creating') {
        this.$http.post('http://localhost:8080/api/ccategory', {'categoryName': this.selectedCategory.categoryName, 'owner': {'id': this.$parent.$parent.$parent.userId}}).then((response) => {
          console.log('Response: ')
          for (let category = 0; category < response.data.length; category++) {
            this.$set(this.$parent.$parent.categories, category, response.data[category])
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$http.put('http://localhost:8080/api/ccategory', {'id': this.selectedCategory.id, 'categoryName': this.dataCategory.categoryName, 'owner': {'id': this.$parent.$parent.$parent.userId}}).then((response) => {
          console.log('Response: ')
          console.log(response)
          for (let category = 0; category < response.data.length; category++) {
            this.$set(this.$parent.$parent.categories, category, response.data[category])
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      this.$parent.close()
    },
    remove () {
      this.$http.delete('http://localhost:8080/api/ccategory', {params: {'id': this.selectedCategory.id}}).then((response) => {
        console.log('Response: ')
        console.log(response)
        this.$parent.$parent.categories = {}
        for (let category = 0; category < response.data.length; category++) {
          this.$set(this.$parent.$parent.categories, category, response.data[category])
        }
      }).catch((error) => {
        console.log(error)
        console.log({'id': this.selectedCategory.id, 'categoryName': this.selectedCategory.categoryName})
      })
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
  .modal-card-head, .modal-card-foot {
    background-color: #ffdd57;
  }
</style>
