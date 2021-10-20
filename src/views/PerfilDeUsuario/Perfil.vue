<template>
    <div class="relatorios">        
        <pages-sub-header icon="fal fa-briefcase" titulo="Perfil de Usuários">
            <div class="card">
                <div class="card-body"/>
            </div>
        </pages-sub-header>
        <div class="profile-content user-name-line d-flex">
            <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
            <b-form-input id="profile-name-input" v-model="text" type="text" placeholder="Nome do Perfil"/>
        </div>
        <tabela-acesso-usuario :items="dataItems" :pages="accessPages" :uID="uID"/>
        <b-container fluid class="salvar-container">
            <b-button class="botao-salvar" @click="saveProfile(uID)">SALVAR</b-button>
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue';
import TabelaAcessoUsuario from '../../components/ProfileAccessTable/TabelaAcessoUsuario.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import {baseApiUrl, defaultNewUserProfile} from "../../config/global";
// import {defaultNewUserProfile} from "../../config/global";


export default {
    name: "Perfil",
    mixins: [ValidateToaster], //instanciando/declarando o mixin na view
    components: {
        PagesSubHeader,
        TabelaAcessoUsuario,
    },
    props: {
        nome:String,
        userData:Array,
        pages:Array,
        uID:String,
    },
    methods: {
        checkID(id){
            try {
                let uid = id.toString();
                return uid;
            } catch (error) {
                console.log(error);
                return '';
            }
        },
        saveProfile(id){ // CRIAR FUNÇÃO DE VALIDAÇÃO (função dummy abaixo apenas para testar funcionalidade)
            let uid = this.checkID(id);

            if(uid.length>0){
                if(this.text.length === 0){
                    let toast = {
                        isValidated:false,
                        title: "OCORREU UM PROBLEMA...",
                        message: "O Perfil de Usuário não pode ser atualizado. Não é permitido salvar um nome de perfil vazio ou apenas com espaços em branco.",
                    };
                    this.validateAndToast(toast); //utilizando a função/o método do mixin
                }
                else this.validateProfile(uid);
            }
            else {
                if(this.text.length === 0){
                    let toast = {
                        isValidated:false,
                        title: "OCORREU UM PROBLEMA...",
                        message: "O Novo Perfil de Usuário não pode ser criado. Não é permitido salvar um nome de perfil vazio ou apenas com espaços em branco.",
                    };
                    this.validateAndToast(toast); //utilizando a função/o método do mixin
                }
                else this.validateProfile('');
            }
        },
        validateProfile(id){
            let check = id.length>0?true:false;
            let user = {};
            // {
            //     name: '',
            //     id: '',
            //     pages:[]
            // };
            let pages = {};
            // {
            //     page_name:'',
            //     page_id:null,
            //     modulo_name:'',
            //     add:null,
            //     read:null,
            //     edit:null,
            //     delete:null,
            //     browser:null,
            // };
            user.name = this.text;
            if(check) user.id = id;
            user.pages = [];
            for(let i in this.dataItems){
                pages.page_name = this.dataItems[i].name;
                pages.page_id = this.dataItems[i].page_id;
                pages.modulo_name = this.dataItems[i].modulo_name;
                if(this.dataItems[i].browser){
                    pages.add = this.dataItems[i].add?1:0;
                    pages.read = this.dataItems[i].read?1:0;
                    pages.edit = this.dataItems[i].edit?1:0;
                    pages.delete = this.dataItems[i].delete?1:0;
                    pages.browser = this.dataItems[i].browser?1:0;
                }
                else{
                    pages.add = 0;
                    pages.read = 0;
                    pages.edit = 0;
                    pages.delete = 0;
                    pages.browser = 0;
                }
                console.log("Data Items Atual:\n",this.dataItems[i])
                console.log("Pages Atual:\n",pages)
                user.pages.push({...pages})
                console.log("User Atual:\n",user)
            }
            if(check) this.updateProfile(user);
            else this.createProfile(user);
        },
        updateProfile(body){
            axios.put(baseApiUrl+'/perfils/'+body.id, body)
            .then(res => {
                console.log("\n\tStatus:\t",res.status);
                if(res.status >= 200 && res.status < 300){
                    let toast = {
                        isValidated:true,
                        title:'PERFIL ATUALIZADO',
                        message:'Perfil de '+ body.name.toUpperCase()+' atualizado com sucesso!',
                    }
                    this.validateAndToast(toast);
                }
                else {
                    let toast = {
                        isValidated:false,
                        title:'PERFIL NÃO ATUALIZADO',
                        message:'O Perfil de '+ body.name.toUpperCase()+' não pode ser atualizado. Motivo: '+res.statusText,
                    }
                    this.validateAndToast(toast);
                }
            })
        },
        createProfile(body){
            axios.post(baseApiUrl+'/perfils', body)
            .then(res => {
                console.log("\n\tStatus:\t",res.status);
                if(res.status >= 200 && res.status < 300){
                    let toast = {
                        isValidated:true,
                        title:'NOVO PERFIL CRIADO',
                        message:'Perfil de '+ body.name.toUpperCase()+' criado com sucesso!',
                    }
                    this.validateAndToast(toast);
                }
                else {
                    let toast = {
                        isValidated:false,
                        title:'PERFIL NOVO NÃO PÔDE SER CRIADO',
                        message:'Perfil de '+ body.name.toUpperCase()+' não pôde ser criado. Motivo: '+res.statusText+'',
                    }
                    this.validateAndToast(toast);
                }
            })
        },
        getDataItems(){
            if(typeof(this.userData) !== 'object'){
                // console.log("\n\tIf in getDataItems()\n")
                this.setDefaultUser();
                this.dataItems = [...this.defaultUserData.data];
                this.getPages();
                this.accessPages = [...this.defaultAccessPages];
            }
            else {
                console.log("\n\tElse in getDataItems()\n") 
                this.dataItems = [...this.userData];
                this.accessPages = [...this.pages];
            }
        },
        getPages(){
            this.defaultAccessPages = JSON.parse(localStorage.getItem('__defaultAccessPages'));
        },
        setDefaultUser(){
            this.defaultUserData = {...defaultNewUserProfile};
        }
    },
    // watch:{
    //     defaultAccessPages(){return }
    // },
    mounted(){
        this.getPages();
        this.getDataItems();
    },
    data() {
        return {
            headItems: [
                {
                    acesso:"Teste",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste2",
                    add:false,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:false
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false,
                    browse:true
                },
            ],
            labels: [
                {
                    key:'acesso',
                    label: 'Acesso',
                },
                {
                    key:'add',
                    label:"",
                },
                {
                    key:'view',
                    label:"",
                },
                {
                    key:'edit',
                    label:"",
                },
                {
                    key:'delete',
                    label:"",
                }
            ],
            text: this.nome,
            userItems: this.userData,
            dataItems:[],
            accessPages: [],
            defaultUserData:[],
            defaultAccessPages:[],
            pagesReady:false,
        }
    }
};
</script>

<style scoped>
.salvar-container{
    bottom: 0;
}
.head-items{
    align-content: center;
    align-items: center;
}
/* .profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
} */
.botao-salvar{
    background-color: #0d6d9dad;
}
.botao-salvar:hover{
    background-color: #0d6d9d;
}
.card-body{
    padding: 5px;
    height: 50px;
    width: 0;
    border: 0px;
    color: #ffffff transparent;
}
.card{
    box-shadow: none;
    border: none;
}
.user-name-line {
    align-items: center !important;
    border-style: solid;
    border-width: 1px;
    border-color: #d0cece;
    padding-left: 0%;
    padding-right: 0%;
}
#profile-name-input{
    margin-left: 5px;
    margin-right: 0px;
    border-left-color: black;
    border-radius: 0px;
}
</style>