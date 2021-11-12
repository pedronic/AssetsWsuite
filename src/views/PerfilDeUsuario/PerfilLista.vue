<template>
    <div class="perfil">
        <pages-sub-header icon="fal fa-briefcase" titulo="Lista de Perfil">
            <div class="card">
                <div class="card-body d-flex">
                    <router-link class="d-flex" id="add-perfil" :to="{name:'Perfil', params:{nome:'', userData: defaultUserData.data, pages: defaultAccessPages, uID:''}}" >
                        <b-btn variant="success" class="fal fa-plus" />
                    </router-link>
                </div>
            </div>
        </pages-sub-header>
        <b-container fluid v-if="dataOK">
            <nome-do-perfil-head :viewOnly="true" v-for="(user, index) in users" :items="user.data" :user="user" :users="users" :rowID="index" :key="user.id"/>
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import NomeDoPerfilHead from '../../components/ProfileAccessTable/NomeDoPerfilHead.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import {baseApiUrl, defaultNewUserProfile} from "../../config/global";

export default{
    name:"PerfilLista",
    mixins: [ValidateToaster], //instanciando e declarando o mixin para usar em children components
    components:{
        PagesSubHeader,
        NomeDoPerfilHead,
    },
    methods: {
        async getUsers(){
            let res = await axios.get(baseApiUrl+"/perfilspages");
            let u = res.data.data;
            let users = [];
            let metaUsers = [];
            let metaData = {};
            let metaID = {};
            let keys = Object.keys(this.pagesIndexTable);
            let hasPage = false;
            let user = {};
                // {
                //     name: '',
                //     id: '',
                //     data:[]
                // };
            let data = {};
                // {
                //     name:'',
                //     page_id:null,
                //     modulo_name:'',
                //     add:null,
                //     read:null,
                //     edit:null,
                //     delete:null,
                //     browser:null,
                // };           
            for (let i in u){
                if(metaUsers.indexOf(u[i].perfil_name)<0){
                    metaUsers.push(u[i].perfil_name);
                    metaData[u[i].perfil_name] = [i];
                    metaID[u[i].perfil_name] = [u[i].perfil_id]
                }
                else {
                    metaData[u[i].perfil_name].push(i);
                }
            }
            console.log("Meta Users:\n",metaUsers,"\nMeta Data:\n",metaData);
            for(let i in u){
                user.name = u[i].perfil_name;
                user.id = u[i].perfil_id;
                user.data = [];

                for(let j in keys){
                    data.name = keys[j];
                    data.page_id = this.pagesIndexTable[keys[j]];
                    hasPage = false;
                    let thisPage = 0;
                    for (let k in u[i].pages){
                        if(u[i].pages[k].page_id !== data.page_id) continue;
                        else {
                            hasPage = true;
                            thisPage = k;
                            break;
                        }
                    }
                    if(hasPage){
                        data.modulo_name = u[i].pages[thisPage].modulo_name;
                        data.add = u[i].pages[thisPage].add?true:false;
                        data.read = u[i].pages[thisPage].read?true:false;
                        data.edit = u[i].pages[thisPage].edit?true:false;
                        data.delete = u[i].pages[thisPage].delete?true:false;
                        data.browser = u[i].pages[thisPage].browser?true:false;
                    }
                    else{
                        data.modulo_name = "Discador";
                        data.add = false;
                        data.read = false;
                        data.edit = false;
                        data.delete = false;
                        data.browser = false;
                    }
                    user.data.push({...data})
                }
                users.push({...user})
            }
            console.log("Users @getUsers():\n",users)
            this.users = [...users];
            this.dataOK = true;
        },
        getPages(){
            this.defaultAccessPages = JSON.parse(localStorage.getItem('__defaultAccessPages'));
            this.pagesIndexTable = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            console.log("Pages Index Table:\n",{...this.pagesIndexTable});
            // console.log("Default Access Pages:\n",this.defaultAccessPages);
            this.getUsers();
        },
        setDefaultUser(){
            this.defaultUserData = {...defaultNewUserProfile};
            // console.log("Default User Data:\n",this.defaultUserData);
        }
    },
    data(){
        return{
            users:[],
            headItems: [
                 {
                    name:"Teste",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    name:"Teste2",
                    add:false,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    name:"Teste3",
                    modulo_name:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                }
            ],
            defaultUserData:[],
            defaultAccessPages:[],
            dataOK:false,
            pagesIndexTable:{}
        }
    },
    mounted() {
        this.getPages();
        // this.getUsers();
        this.setDefaultUser();
    }
}
</script>

<style scoped>
.card-body{
    padding: 5px;
}
/* .card > .card-body > .d-flex > a > button,input{
    height: 38px !important;
} */

.card-body{
    padding: 5px;
    /* height: 50px; */
    /* width: 0;
    border: 0px;
    color: #ffffff transparent; */
}
.card > .card-body > .d-flex > button#pesquisa_faturamento{
    margin-right: 0.3rem !important;
}
.card > .card-body > .d-flex > button,input{
    height: 38px !important;
}
.d-flex#filtro-grupo-pausa{
    height: 38px !important;
}

.card {
  box-shadow: none;
  border: none;
}

.perfil{
    width: 100%;
    padding: 0;
    margin: 0;
}

</style>