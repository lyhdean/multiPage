import Vue from 'vue'


Vue.config.productionTip = false

/* eslint-disable no-new */
import App from "./infoone.vue"
new Vue({
  el: '#infoone',
  template: '<App/>',
  components: { App:App }
})
