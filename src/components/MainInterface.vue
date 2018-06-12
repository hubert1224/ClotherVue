<template>

<div class="columns">
  <div class="background">
  </div>
  <div class="column container">
    <div class="categories panel">
    <p class="has-text-centered is-capitalized panel-heading">Kategorie ubrań</p>
    <div class="panel-block">
    <button class="button is-warning addCategoryButton mdi mdi-plus" v-on:click="submitCategoryModal"></button>
  </div>
  <div class="panel-block">
    <b-tabs type="is-toggle-rounded" @change="onCategoryChange" v-model="selectedTab"  expanded>
      <b-tab-item v-for="category in categories" ref="tabItem" :key="category.id" :label="category.categoryName" >
        <button class="button is-danger mdi mdi-delete-circle" v-on:click="removeCategoryModal"></button>
        <button class="button is-info mdi mdi-format-paint" v-on:click="updateCategoryModal"></button>
      </b-tab-item>
    </b-tabs>
  </div>
    <b-modal :active.sync="launchCategoryModal" has-modal-card>
    <categoryModal :intent="intent" :selectedCategory="selectedCategory" ></categoryModal>
    </b-modal>
  </div>
    <hr/>
    <div class="panel">
      <p class="panel-heading has-text-centered">Twoje Ubrania</p>
      <p class="has-text-centered panel-heading"> Nazwa | Stan | Czas używania | Data kupna</p>
      <a v-for="piece in clothes" :key="piece.id" class="panel-block has-text-centered clothesBlock" v-on:click="updatePOCModal(piece.id, $event)">
        <p hidden>{{piece.id}}</p>
        <p>{{piece.name}} | {{piece.state}} | {{piece.wornTimeHours}} | {{piece.purchaseDate.split('T')[0]}}</p>
        <button class="button is-danger mdi mdi-delete-circle"  ></button>
      </a>
      <div class="panel-block">
        <button class="button is-warning mdi mdi-plus clothesAdd " v-on:click="submitPOCModal"></button>
      </div>
    </div>
    <b-modal :active.sync="launchPOClothingModal" has-modal-card>
      <POClothingModal :selectedPOC="selectedPOC" :intent="intent" :POCDate="POCDate" :selectedCategory="selectedCategory"></POClothingModal>
    </b-modal>
  </div>
</div>
</template>

<script>
import categoryModal from '@/components/CategoryModal.vue'
import POClothingModal from '@/components/POClothingModal.vue'
export default {
  name: 'mainInterface',
  data () {
    return {
      categories: {},
      clothes: {},
      launchCategoryModal: false,
      launchPOClothingModal: false,
      intent: '',
      categoryIdMinusOne: 0,
      selectedCategory: {},
      selectedPOC: {},
      POCDate: new Date(),
      selectedTab: 0
    }
  },
  mounted () {
    this.$http.get('http://localhost:8080/api/ccategory').then((response) => {
      this.categories = response.data
      let lowestId = Number.MAX_VALUE
      for (let category of this.categories) {
        if (category.id < lowestId) {
          lowestId = category.id
        }
      }

      let firstCategory = this.categories.find((element) => {
        return element.id === lowestId
      })
      console.log(firstCategory)
      if(firstCategory !== undefined)
      {
      this.$http.get('http://localhost:8080/api/poclothing', {params: {'toSearch': {'id': firstCategory.id, 'categoryName': firstCategory.categoryName, 'owner': {'id': this.$parent.userId}}}}).then((response) => {
        this.clothes = response.data
        console.log('Got some clothes!')
        console.log(this.clothes)
      }).catch((error) => {
        console.log(error)
        this.$router.push('/')
      })
      }
    }).catch((error) => {
      console.log(error)
      this.$router.push('/')
    })
  },
  components: {
    categoryModal,
    POClothingModal
  },
  watch: {
    categories: function (value, oldValue) {
      this.selectedTab = 0
    }
  },
  methods: {
    trackSelectedCategory () { // Tracks selected category based on the isActive properyt (built in @change method is slightly broken/inadequate)
      var selectedItem = {}
      for (let item in this.$refs.tabItem) {
        if (this.$refs.tabItem[item].isActive === true) {
          selectedItem = this.$refs.tabItem[item]
        }
      }
      for (let category in this.categories) {
        if (this.categories[category].categoryName === selectedItem.label) {
          this.categoryIdMinusOne = this.categories[category].id - 1.0
          this.selectedCategory = this.categories[category]
          return this.categories[category]
        }
      }

    },
    onCategoryChange () {
      this.trackSelectedCategory()
      this.$http.get('http://localhost:8080/api/poclothing', {params: {'toSearch': {'id': this.selectedCategory.id, 'categoryName': this.selectedCategory.categoryName, 'owner': {'id': this.$parent.userId}}}}).then((response) => {
        this.clothes = response.data
        console.log('Got some clothes!')
        console.log(this.clothes)
      }).catch((error) => {
        console.log(error)
        this.$router.push('/')
      })
    },
    submitCategoryModal () {
      this.intent = 'creating'
      this.selectedCategory = {} // So that selected categories name doesn't bind to the name field
      this.launchCategoryModal = true
    },
    removeCategoryModal () {
      this.intent = 'deleting'
      console.log(this.$refs.tabItem)
      this.trackSelectedCategory()
      this.launchCategoryModal = true
    },
    updateCategoryModal () {
      this.intent = 'updating'
      this.trackSelectedCategory()
      console.log(this.selectedCategory.id)
      this.launchCategoryModal = true
    },
    submitPOCModal () {
      this.intent = 'creating'
      this.selectedPOC = {}
      this.trackSelectedCategory()
      this.launchPOClothingModal = true
    },
    updatePOCModal (message,event) {
      if(event.target.toString().includes('Button'))
      {
        this.intent = 'deleting'
      }
      else
      {
        this.intent = 'updating'
      }
      for (let POClothing in this.clothes) {
        if (this.clothes[POClothing].id === message)
        {
          this.selectedPOC = this.clothes[POClothing]
        }
      }
      this.POCDate = new Date(Date.parse(this.selectedPOC.purchaseDate.split('T')[0]))
      this.trackSelectedCategory()
      this.launchPOClothingModal = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clothesAdd {
  /* margin-left: 5px; */
  /* border: 1px solid black; */
  width: 100%;
}
.clothesBlock {
  padding-left: 89px;
  color: #7957d5;
  font-style: oblique;
  background-color: #ffdd57;
}

.panel-block p {
  width:100%;
}

.categories {
  margin-top: 5px;

}

.background {
  background-image: url("../assets/abstract-blur-business-334979.jpg");
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100vh;
  z-index: -1;
  background-size: 100% 100%;
}

 hr {
   background-color: #7957d5;
   margin: 10px 0px 10px 0px;
 }

 .panel-heading {
   background-color: #7957d5;
   color: #FFFFFF;
 }

 .addCategoryButton {
   width:100%;
   margin-bottom: 5px;
}
</style>
