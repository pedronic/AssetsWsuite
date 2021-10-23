import Vue from 'vue'

export const userKey = '__wsuite_user'
//export const baseApiUrl = 'http://localhost:4000'
//export const baseApiUrl = "http://192.168.0.203:3535/v1"
//export const baseApiUrl = "http://172.22.4.34:3535/v1"
export const baseApiUrl = "http://192.168.0.201:3535/v1"
export const defaultOperatorSecret = "123456"

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

export const defaultOperator = {
    id:null, // Number
    name:'',
    secret:'',
    host:'',
    port:null, // Number
    context:'',
    allow:'', // codec
    fromuser:'',
    call_limit:null, // Number; from:"call-limit"
    username:'',
    defaultuser:'',
    dial_format:'',
    /* perfil:null, // Number */
    accountcode:'',
    channel:null, // Number
    dtmfmode:'',
    lastms:null, // Number
    nat:'',// default: "yes"
    perfil:null, // Number
    priority:null, // Number
    qualify:'',// default: "yes"
    regseconds:null, // Number
    regserver:'',
    tec_prefix:'',
    tec_prefix_local:'',
    transport:null,
    useragent:'',
    flag_local:true, // Number [0/1]
    flag_ldn: true, // Number [0/1]
    flag_ldi: true, // Number [0/1]
    flag_vc1: true, // Number [0/1]
    flag_vc2: true, // Number [0/1]
    flag_vc3: true, // Number [0/1]
    status:false // Number [0/1]
}

export const vueMultiselectProps = {
        selectLabel:'Pressione Enter para selecionar',
        selectGroupLabel:'Pressione Enter para selecionar o grupo',
        selectedLabel:'Selecionado',
        deselectLabel:'Pressione Enter para remover',
        deselectGroupLabel:'Pressione Enter para remover o grupo'
    }

export default { baseApiUrl, showError, userKey, defaultNewUserProfile, defaultOperator, vueMultiselectProps }