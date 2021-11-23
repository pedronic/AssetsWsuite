import Vue from 'vue'

export const userKey = '__wsuite_user'
//export const baseApiUrl = 'http://localhost:4000'
//export const baseApiUrl = "http://192.168.0.203:3535/v1"
//export const baseApiUrl = "http://172.22.4.34:3535/v1"
export const baseApiUrl = "http://192.168.0.201:3535/v1"
export const defaultOperatorSecret = "123456"
export const mailingApiUrl = "http://172.22.11.31:3535/api/"
export const mailingTestToken = "3647|bhrzpV3HeusN77PE3fRASWtQc55jaC1M4loNVOCf"
export const mailingTestUser = { username:"admin", password:"password"};

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
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Usuários',
            page_id: 1,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Perfil',
            page_id: 2,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Pausas',
            page_id: 4,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Robôs',
            page_id: 5,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Operadoras',
            page_id: 6,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Rotas',
            page_id: 7,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:false
        },
        {
            name: 'Filas',
            page_id: 8,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Finalizações',
            page_id: 9,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Servidores',
            page_id: 10,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Scripts',
            page_id: 11,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Mailing',
            page_id: 12,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Blacklist',
            page_id: 13,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Relatorio de Gravações',
            page_id: 14,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Relatorio de Faturamento',
            page_id: 15,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Painel de Supervisão',
            page_id: 16,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
            delete:false,
            browser:true
        },
        {
            name: 'Dashboard Analítico',
            page_id: 17,
            modulo_name:'Discador',
            add:false,
            read:false,
            edit:false,
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
    status:true // Number [0/1]
}

export const defaultQueue = {
    name_queue:'',// Correspondência: "name_queue"
    queue_number:'',// Number.toString(); Correspondência: "name"
    type:'', // ['human','robot']
    q_type:[], // Ainda não troca dados com o backend (recebe 'journey')
    slug:'', // Nome para FTP (kebab-case: sem maiúslculas, espaços viram dashes, sem acentos)
    finalization_name:'', // Ainda não troca dados com o backend (falta endpoint)...UPDATE: endpoint recebendo e enviando
    finalization_id:null, // Number
    company_id:2, // Number
    rec_format:'', // Number; Ainda não está tabulado no backend nem trocando dados portanto
    rec_type:'', // Number; Ainda não está tabulado no backend nem trocando dados portanto
    wrapuptime:'', // Number.toString(); (tempo de pós atendimento)
    break_group_id:null, // Number; Dado de Grupo de Pausas
/*     
breakGroup_name:'', // Number; Dado de Grupo de Pausas
 */
    route_name:'', // Não enviar para endpoint POST
    route_id:null, // Number
    strategy:'',
    speedy:null, // Number [1;10]
    dial_format:'', // ['horizontal','vertical']
    max_time_call:null, // Number (minutos); (controle de tempo de chamada Ativa)
    blacklists:[], // Ainda não troca dados com o backend (endpoint para blacklists ainda não existe)...UPDATE: passa árvore de objetos em um array. 
/*     Ex.: "blacklists":[
                {
                    "blacklist_id":"" // Number.toString()
                    "blacklist_name":""
                }
            ]
 */    
    bina:'', // Number.toString()
    flag_bina:false, // Number [0/1]; default:0
    maxlen:null,// Number (segundos); (controle de tempo de Chamada Manual)

    weight:null, // Number [1;4]
    musiconhold:'',
    
    work_time:[
        {
            day:"Segunda-feira",
            index:1,
            start:'09:00',
            end:'21:00'
        },
        {
            day:"Terça-feira",
            index:2,
            start:'08:00',
            end:'21:00'
        },
        {
            day:"Quarta-feira",
            index:3,
            start:'08:00',
            end:'21:00'
        },
        {
            day:"Quinta-feira",
            index:4,
            start:'08:00',
            end:'21:00'
        },
        {
            day:"Sexta-feira",
            index:5,
            start:'08:00',
            end:'21:00'
        },
        {
            day:"Sábado",
            index:6,
            start:'08:00',
            end:'21:00'
        },
        {
            day:"Domingo",
            index:0,
            start:'',
            end:''
        },
    ], // Parsed Object from endpoint /queues

/*     pausas:null, // Dado do Grupo de Pausas (Array do grupo de pausas selecionado); Não retorna valores.
 */
    agentes:[], // Dado de Agentes...UPDATE: passa árvore de objetos em um array. 
/*     Ex.: "agentes":[
                {
                    "agent_id":"" // Number.toString()
                    "agent_name":""
                }
            ]
 */ 
    layout: "{\"uf\": \"uf\", \"cep\": \"cep\", \"city\": \"city\", \"name\": \"name\", \"email\": \"email\", \"title\": \"title\", \"custom\": \"custom\", \"phone1\": \"phone1\", \"phone2\": \"phone2\", \"phone3\": \"phone3\", \"phone4\": \"phone4\", \"phone5\": \"phone5\", \"phone6\": \"phone6\", \"phone7\": \"phone7\", \"phone8\": \"phone8\", \"phone9\": \"phone9\", \"address\": \"address\", \"custom2\": \"custom2\", \"custom3\": \"custom3\", \"custom4\": \"custom4\", \"custom5\": \"custom5\", \"custom6\": \"custom6\", \"custom7\": \"custom7\", \"custom8\": \"custom8\", \"custom9\": \"custom9\", \"phone10\": \"phone10\", \"phone11\": \"phone11\", \"phone12\": \"phone12\", \"phone13\": \"phone13\", \"phone14\": \"phone14\", \"phone15\": \"phone15\", \"phone16\": \"phone16\", \"phone17\": \"phone17\", \"phone18\": \"phone18\", \"phone19\": \"phone19\", \"phone20\": \"phone20\", \"contract\": \"contract\", \"custom10\": \"custom10\", \"document\": \"document\", \"due_date\": \"due_date\", \"registry\": \"registry\", \"client_id\": \"client_id\", \"phone1_ddd\": \"phone1_ddd\", \"phone2_ddd\": \"phone2_ddd\", \"phone3_ddd\": \"phone3_ddd\", \"phone4_ddd\": \"phone4_ddd\", \"phone5_ddd\": \"phone5_ddd\", \"phone6_ddd\": \"phone6_ddd\", \"phone7_ddd\": \"phone7_ddd\", \"phone8_ddd\": \"phone8_ddd\", \"phone9_ddd\": \"phone9_ddd\", \"phone10_ddd\": \"phone10_ddd\", \"phone11_ddd\": \"phone11_ddd\", \"phone12_ddd\": \"phone12_ddd\", \"phone13_ddd\": \"phone13_ddd\", \"phone14_ddd\": \"phone14_ddd\", \"phone15_ddd\": \"phone15_ddd\", \"phone16_ddd\": \"phone16_ddd\", \"phone17_ddd\": \"phone17_ddd\", \"phone18_ddd\": \"phone18_ddd\", \"phone19_ddd\": \"phone19_ddd\", \"phone20_ddd\": \"phone20_ddd\", \"phones_count\": \"phones_count\", \"overdue_amount\": \"overdue_amount\"}"
}

export const defaultScriptRow = {
    script:'',
    MCDU:'',
    status:true,
    description:''
};

export const weekDaysByIndex = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quitna-feira','Sexta-feira','Sábado'];

export const vueMultiselectProps = {
        selectLabel:'Pressione Enter para selecionar',
        selectGroupLabel:'Pressione Enter para selecionar o grupo',
        selectedLabel:'Selecionado',
        deselectLabel:'Pressione Enter para remover',
        deselectGroupLabel:'Pressione Enter para remover o grupo'
}

export const dropdownAdminPages = [1,2,3,4,5,6,7,8,9,10,11];

export const dropdownActionPages = [12,13];

export const dropdownRelatoriosPages = [14,15];

export const dropdownDashPages = [16,17];

export default { baseApiUrl, showError, userKey, mailingApiUrl, mailingTestUser, mailingTestToken, defaultNewUserProfile, defaultOperator, defaultQueue, defaultScriptRow, weekDaysByIndex, vueMultiselectProps, dropdownAdminPages, dropdownActionPages, dropdownRelatoriosPages, dropdownDashPages }