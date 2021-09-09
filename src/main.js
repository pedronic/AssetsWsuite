
import Vue from 'vue'

//import "@/plugins/DataTable"
import "jquery"
import "@/plugins/bootstrap"
import "@/config/smartadmin"
import "@/plugins/loadscript.js"


import App from './App.vue'
import router from './router'
import store from './store'




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
