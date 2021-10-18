<template>
    <div class="perfil">
        <pages-sub-header icon="fal fa-briefcase" titulo="Lista de Perfil">
            <div class="card">
                <div class="card-body d-flex">
                    <router-link class="d-flex" id="add-perfil" :to="{path:'/perfil-usuario', params:{nome:''}}" >
                        <b-btn variant="success" class="fal fa-plus" />
                    </router-link>
                </div>
            </div>
        </pages-sub-header>
        <nome-do-perfil-head :viewOnly="true" v-for="user in users" :items="user.data" :user="user" :key="user.id"/>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import NomeDoPerfilHead from '../../components/ProfileAccessTable/NomeDoPerfilHead.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import {baseApiUrl} from "@/config/global";

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
            let user = {};
                // {
                //     name: '',
                //     id: '',
                //     data:[]
                // };
            let data = {};
                // {
                //     name:'',
                //     modulo_name:'',
                //     add:null,
                //     read:null,
                //     edit:null,
                //     delete:null,
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
            // console.log("Meta Users:\n",metaUsers,"\nMeta Data:\n",metaData);
            for(let i in metaUsers){
                user.name = metaUsers[i];
                user.id = metaID[metaUsers[i]];
                user.data = [];

                for(let j in metaData[metaUsers[i]]){
                    data.name = u[metaData[metaUsers[i]][j]].page_name;
                    data.modulo_name = u[metaData[metaUsers[i]][j]].modulo_name;
                    data.add = u[metaData[metaUsers[i]][j]].add?true:false;
                    data.read = u[metaData[metaUsers[i]][j]].read?true:false;
                    data.edit = u[metaData[metaUsers[i]][j]].edit?true:false;
                    data.delete = u[metaData[metaUsers[i]][j]].delete?true:false;
                    data.browser = u[metaData[metaUsers[i]][j]].browser?true:false;
                    user.data.push({...data})
                }
                users.push({...user})
            }
            // console.log("Users:\n",users)
            this.users = [...users];
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
        }
    },
    mounted() {
        this.getUsers();
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