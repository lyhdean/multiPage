import Vue from 'vue'


Vue.config.productionTip = false

/* eslint-disable no-new */
import App from "./infotwo.vue"
new Vue({
  el: '#infotwo',
  template: '<App/>',
  components: { App :App}
})
