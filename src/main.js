
import Vue from 'vue'

//import "@/plugins/DataTable"
import "jquery"
import "@/plugins/bootstrap"
import "@/config/smartadmin"
import "@/plugins/loadscript.js"
import "@/plugins/bottonExport"
import "@/plugins/moments.js"
import "@/plugins/vmask.js"
import "@/plugins/vueMultiselect.js"


import App from './App.vue'
import router from './router'
import store from './store'

import "select2"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// import "@/plugins/vee-validate.js"