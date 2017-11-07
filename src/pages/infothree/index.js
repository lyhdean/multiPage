import Vue from 'vue'


Vue.config.productionTip = false

/* eslint-disable no-new */
import App from "./infothree.vue"
new Vue({
  el: '#infothree',
  template: '<App/>',
  components: { App: App }
})
