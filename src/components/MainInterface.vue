<template>
<div class="columns">
  <div class="column">
    <!-- <ul>
      <li v-for='user in users' :key='user.id'>
        {{user.login}} :: {{user.password}} | {{user.enabled}}
      </li>
    </ul> -->
    <b-tabs type="is-toggle-rounded" expanded>
      <b-tab-item v-for="category in categories" :key="category.id" :label="category.categoryName">
      <b-tab-item label="+" v-on:click="launchCategoryModal = true">
      </b-tab-item>
      </b-tab-item>
    </b-tabs>
    <b-modal :active.sync="launchCategoryModal">
      sdfdsaf
    </b-modal>
  </div>
</div>
</template>

<script>
import categoryModal from '@/components/CategoryModal.vue'
export default {
  name: 'mainInterface',
  data () {
    return {
      categories: {},
      launchCategoryModal = false
    }
  },
  mounted () {
    this.$http.get('http://localhost:8080/api/ccategory').then((response) => {
      this.categories = response.data
      console.log(this.categories)
      }).catch((error) => {
      console.log(error)
      this.$router.push('/')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .b-tabs {
   margin-top:5px;
 }
</style>
