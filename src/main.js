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
// validar todos os inputs 
// definir ícones
//responsividade ~mobile~ 
// Subtrair linhas {métodos post} {tabelas com funções desnecessáras} {laços nos métodos gets} {métodos GET em DashFilas}
// criar script(após servidor) e finalização(após filas) no menu administrativo (done)
// rever sorteables (feito)
// rever fields (feito)
// bug parametro booleano passado para as tabelas (feito)
// head lista mailing  (feito)
// filas agentes only 0 (por enquanto) (feito)
// status -> b-formcheackbox (feito)
// tabelas em panel (feitos)
// tabela operadora [Local], [LDN], [LDI], [...] -> (classes)
// paginação em tabelas
// campo filas nos métodos PUT de agent, usuario e robo (feito)
// ajustes multiselect-vue (feito)
// Padronizar tabs
//ajustes na ativação e estlização do tab de DashFilas
//efeito estranho de transição de tabela em DashFilas
//bug click em qualquer opção da avelã