<template>
<form action="">
  <div class="modal-card">
    <header class="modal-card-head">
      <p v-if="intent === 'creating'" class="modal-card-title">Dodaj Ubranie</p>
      <p v-if="intent === 'updating'" class="modal-card-title">Aktualizuj Ubranie</p>
      <p v-if="intent === 'deleting'" class="modal-card-title">Usuń Ubranie</p>
    </header>
    <div class="modal-card-body" v-if="intent !== 'deleting'">
      <b-field label="Nazwa Ubrania">
        <b-input ref="nameInput" v-model="dataPOClothing.name" required>
        </b-input>
      </b-field>
      <b-field label="Stan zużycia">
        <b-input ref="nameInput" v-model="dataPOClothing.state" required>
        </b-input>
      </b-field>
      <b-field label="Czas noszenia w godzinach">
        <b-input ref="nameInput" v-model="dataPOClothing.wornTimeHours" required>
        </b-input>
      </b-field>
      <b-field label="Data zakupu">
        <b-datepicker ref="nameInput" icon="calendar-today" v-model="dataDate" inline>
        </b-datepicker>
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
  name: 'POClothingModal',
  data () {
    return {
      dataPOClothing: this.selectedPOC,
      dataIntent: this.intent,
      dataDate: this.POCDate,
      dataCategory: this.selectedCategory
    }
  },
  props: ['intent','selectedPOC','POCDate','selectedCategory'],
  methods: {
    submit () {
    this.$parent.$parent.clothes = {}
    if (this.dataIntent === 'creating') {
      this.$http.post('http://localhost:8080/api/poclothing', {'toSave': {'id': this.dataPOClothing.id, 'name': this.dataPOClothing.name, 'purchaseDate': Math.round(this.dataDate.getTime()), 'wornTimeHours': this.dataPOClothing.wornTimeHours,
    'category': {'id': this.dataCategory.id, 'categoryName': this.dataCategory.categoryName}, 'state': this.dataPOClothing.state, 'owner': {'id': this.$parent.$parent.$parent.userId}}, 'toSearch':{'id': this.dataCategory.id}}).then((response) => {
        console.log('Response: ')
        for (let poclothing = 0; poclothing < response.data.length; poclothing++) {
          this.$set(this.$parent.$parent.clothes, poclothing, response.data[poclothing])
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      this.$http.put('http://localhost:8080/api/poclothing', {'toUpdate': {'id': this.dataPOClothing.id, 'name': this.dataPOClothing.name, 'purchaseDate': Math.round(this.dataDate.getTime()), 'wornTimeHours': this.dataPOClothing.wornTimeHours,
    'category': {'id': this.dataCategory.id, 'categoryName': this.dataCategory.categoryName}, 'state': this.dataPOClothing.state, 'owner': {'id': this.$parent.$parent.$parent.userId}}, 'toSearch':{'id': this.dataCategory.id}}).then((response) => {
        console.log('Response: ')
        console.log(response)
        for (let poclothing = 0; poclothing < response.data.length; poclothing++) {
          this.$set(this.$parent.$parent.clothes, poclothing, response.data[poclothing])
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    this.$parent.close()
  },
  remove () {
    this.$http.delete('http://localhost:8080/api/poclothing', {params: {'toDelete': {'id': this.dataPOClothing.id, 'name': this.dataPOClothing.name, 'purchaseDate': Math.round(this.dataDate.getTime()), 'wornTimeHours': this.dataPOClothing.wornTimeHours,
  'category': {'id': this.dataCategory.id, 'categoryName': this.dataCategory.categoryName}, 'state': this.dataPOClothing.state, 'owner': {'id': this.$parent.$parent.$parent.userId}}, 'toSearch':{'id': this.dataCategory.id}}}).then((response) => {
      console.log('Response: ')
      console.log(response)
      this.$parent.$parent.clothes = {}
      for (let poclothing = 0; poclothing < response.data.length; poclothing++) {
        this.$set(this.$parent.$parent.clothes, poclothing, response.data[poclothing])
      }
    }).catch((error) => {
      console.log(error)
      console.log({'id': this.dataPOClothing.id, 'categoryName': this.dataPOClothing.name})
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
