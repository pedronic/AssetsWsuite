import Vue from 'vue'


//import "@/plugins/DataTable"
import "jquery"
import "@/plugins/bootstrap"
import "@/config/smartadmin"
import "@/plugins/loadscript.js"


import App from './App.vue'
import router from './router'
import store from './store'
import select2 from 'select2'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  select2,
  render: h => h(App)
}).$mount('#app')
// Vue.use()

