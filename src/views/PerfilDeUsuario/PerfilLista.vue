<template>
    <div class="perfil">
        <pages-sub-header icon="fal fa-briefcase" titulo="Lista de Perfil">
            <div class="card">
                <div class="card-body d-flex">
                    <router-link class="d-flex" id="add-perfil" :to="{name:'Perfil', params:{nome:'', userData: defaultUserData.data, pages: defaultAccessPages, uID:''}}" >
                        <b-btn variant="success" class="fal fa-plus" :disabled="!adds"/>
                    </router-link>
                </div>
            </div>
        </pages-sub-header>
        <b-container fluid v-if="dataOK">
            <nome-do-perfil-head :viewOnly="true" v-for="(user, index) in users" :items="user.data" :user="user" :users="users" :rowID="index" :key="user.id" :permissions='{add:!adds, edit:!edits, delete:!deletes, read:!reads}'/>
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
        getPermission(){
            let page = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            let perms = JSON.parse(localStorage.getItem('__userAccessPages'));
            this.adds = perms[page.Perfil - 1].add;
            this.edits = perms[page.Perfil - 1].edit;
            this.deletes = perms[page.Perfil - 1].delete;
            this.reads = perms[page.Perfil - 1].read;
        },
        async getUsersDEPRECATED(){
            let res = await axios.get(baseApiUrl+"/perfilspages");
            let u = res.data.data;
            console.log("Response @getUsers in 'PerfilLista.vue':\n",u)
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
               /*  {
                    name:'',
                    page_id:null,
                    modulo_name:'',
                    add:null,
                    read:null,
                    edit:null,
                    delete:null,
                    browser:null,
                }; */           
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
        getUsers(x){
            let profID = this.profiles[x];
            let pID = profID.toString();
            let profName = this.names[x];
            axios.get(baseApiUrl+"/perfilspages/"+pID)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText);
                let u = res.data.data;
                console.log("u @getUsers():\n",u,"\nu.length @getUsers():\t",u.length)
                // let users = [];
                // let metaUsers = [];
                // let metaData = {};
                // let metaID = {};
                let keys = Object.keys(this.pagesIndexTable);
                let hasPage = false;
                let isDefined = u.length>0?true:false;
                let user = {};
                    // {
                    //     name: '',
                    //     id: '',
                    //     data:[]
                    // };
                let data = {};
                /*  {
                        name:'',
                        page_id:null,
                        modulo_name:'',
                        add:null,
                        read:null,
                        edit:null,
                        delete:null,
                        browser:null,
                    }; */
                user.name = profName;
                user.id = profID;
                user.data = [];

                for(let j in keys){
                    data.name = keys[j];
                    data.page_id = this.pagesIndexTable[keys[j]];
                    hasPage = false;
                    let thisPage = 0;
                    if(isDefined){
                        for (let k in u[0].pages){
                            if(u[0].pages[k].page_id !== data.page_id) continue;
                            else {
                                hasPage = true;
                                thisPage = k;
                                break;
                            }
                        }
                    }
                    // else{

                    // }
                    if(hasPage){
                        data.modulo_name = u[0].pages[thisPage].modulo_name;
                        data.add = u[0].pages[thisPage].add?true:false;
                        data.read = u[0].pages[thisPage].read?true:false;
                        data.edit = u[0].pages[thisPage].edit?true:false;
                        data.delete = u[0].pages[thisPage].delete?true:false;
                        data.browser = u[0].pages[thisPage].browser?true:false;
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
                this.users.push({...user})
                console.log("Users @getUsers():\n",this.users)
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message);
            });
        },
        getPages(){
            this.defaultAccessPages = JSON.parse(localStorage.getItem('__defaultAccessPages'));
            this.pagesIndexTable = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            console.log("Pages Index Table:\n",{...this.pagesIndexTable});
            // console.log("Default Access Pages:\n",this.defaultAccessPages);
            for(let i in this.profiles){
                this.getUsers(i);
            }
            this.dataOK = true;
            // this.getPerfis();
        },
        getPerfis(){
            this.getPermission();
            axios.get(baseApiUrl+"/perfils")
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText);
                let p = res.data.data;
                for(let i in p){
                    this.profiles.push(p[i].id);
                    this.names.push(p[i].name);
                }
                // console.log("Profiles:\n",[...this.profiles])
                this.getPages();
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message);
            })
        },
        setDefaultUser(){
            this.defaultUserData = {...defaultNewUserProfile};
            // console.log("Default User Data:\n",this.defaultUserData);
        }
    },
    data(){
        return{
            adds:null,
            edits:null,
            deletes:null,
            reads:null,
            names:[],
            profiles:[],
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
        this.getPerfis();
        // this.getPages();
        // this.getUsers();
        this.setDefaultUser();
    }
}
</script>

<style scoped>
.card-body{
    padding: 5px;
}
.card-body{
    padding: 5px;
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