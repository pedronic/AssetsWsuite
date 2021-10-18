import Vue from 'vue'

export const userKey = '__wsuite_user'
//export const baseApiUrl = 'http://localhost:4000'
//export const baseApiUrl = "http://192.168.0.203:3535/v1"
//export const baseApiUrl = "http://172.22.4.34:3535/v1"
export const baseApiUrl = "http://192.168.0.201:3535/v1"

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export const defaultNewUserProfile = {
    name:'',
    id:'',
    data:[
        {
            name: 'Agentes',
            page_id: 3,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Usuários',
            page_id: 1,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Perfil',
            page_id: 2,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Pausas',
            page_id: 4,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Robôs',
            page_id: 5,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Operadoras',
            page_id: 6,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Rotas',
            page_id: 7,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        },
        {
            name: 'Filas',
            page_id: 8,
            modulo_name:'Discador',
            add:true,
            read:true,
            edit:true,
            delete:false,
            browser:true
        }
    ]
}

export default { baseApiUrl, showError, userKey, defaultNewUserProfile }