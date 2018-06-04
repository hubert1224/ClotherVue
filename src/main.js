import Vue from 'vue'
import App from './App'
import router from './router'
import buefy from 'buefy'
import axios from 'axios'

import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(buefy)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)

})
