import Vue from 'vue'


//import "@/plugins/DataTable"
import "jquery"
import "@/plugins/bootstrap"
import "@/config/smartadmin"
import "@/plugins/loadscript.js"
import "@/plugins/vmask.js"
import "@/plugins/vueMultiselect.js"


import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import msg from './pt_BR';


Vue.config.productionTip = false

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app');
Vue.use(VeeValidate, {

  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});



// selec2 (feito)
// botão de remoção com box de confirmação
// blacklist inserir uma barra de pesquisa em cada card (feito)
// validar todos os inputs 
// definir ícones
// arrumar primeiro telefone (feito)
// importar -> toast "sucesso" -> lista
// mexer nas dimenoes dos inputes registro operadroras (feito)
// textarea max 15 linhas (feito)
// 2o formato discagem = dtmf (DONE)
// plugin senha (feito)
// mudar os labels para o do Pedro (feito)
// recuo de tela (FEITO)
// mudar tabela filas (feito)
// input photo (feito)
//barra de pesquisa lista (DONE)
// tabela registro finalizações > cadastrar alterável (feito)
//responsividade
// VC3
// Subtrair linhas