export default {
    methods: {
        validateAndToast(Params){ /* Params = {isValidated:Boolean, message:String, title:String} */
            // call validation function OR get validation function return
            let tv = Params.isValidated ? 'success':'danger';
            this.$bvToast.toast(Params.message,{
                title: Params.title,
                variant: tv,
                solid: true,
                autoHideDelay: 5000,
                toaster: 'b-toaster-top-right'
            })
        }            
    }
}






/*  --------------------------------  */
// import Vue from "vue";
// // import { BToast } from 'bootstrap-vue'
// // import {ToastPlugin} from 'bootstrap-vue'
// import {BVToastPlugin} from 'bootstrap-vue'
// Vue.use(BVToastPlugin)
// // Vue.use(ToastPlugin)
// // Vue.use(Vue)
// // Vue.component('b-toast', BToast)

// export function validateAndToast(Params){
//     let vp = Params.validate_state;
//     let tv = vp ? 'success':'danger';
//     if (vp){
//         BVToastPlugin.$bvToast.toast("Novo Perfil de Usuário criado com sucesso!",{
//             title: "PERFIL ADICIONADO",
//             variant: tv,
//             solid: true,
//             autoHideDelay: 5000,
//             toaster: 'b-toaster-top-right'
//         })
//     }
//     else {
//         BVToastPlugin.$bvToast.toast("O novo Perfil de Usuário não pode ser adicionado.",{
//             title: "OCORREU UM PROBLEMA...",
//             variant: tv,
//             solid: true,
//             autoHideDelay: 5000,
//             toaster: 'b-toaster-top-right'
//         })
//     }
// }

// export default{validateAndToast}