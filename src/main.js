import Vue from 'vue'


//import "@/plugins/DataTable"
import "jquery"
import "@/plugins/bootstrap"
import "@/config/smartadmin"
import "@/plugins/loadscript.js"


import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

import "select2"

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
}); 

new Vue({
  // components: {
  //   select2,
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// Vue.use()

