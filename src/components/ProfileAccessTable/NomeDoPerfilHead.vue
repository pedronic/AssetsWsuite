<template>
    <div class="nome-do-perfil-head">
        <div class="profile-content user-name-line d-flex">
            <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
            <b-form-input id="profile-name-input" v-model="text" :disabled="true"/>
            <b-button variant="outline-dark" @click="showDetails()">
                <span :class="this.arrow_icon_now"/>
            </b-button>
                <router-link :to="{name:'Perfil',params:{nome:this.user.name, userData:items, pages:accessPages, uID:this.user.id}}">
                    <b-button variant="outline-dark" >
                        <span class="fal fa-pencil"/>
                    </b-button>
                </router-link>
            <b-button v-b-modal="text" variant="outline-dark">
                <span class="fal fa-trash-alt"/>
            </b-button>
        </div>
        <div :class="this.show_details">
            <tabela-acesso-usuario :viewOnly="viewOnly" :items="items" />
        </div>
        <b-modal 
            :id="text" 
            title="ATENÇÃO!!!"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            :lazy="true"
            ok-title="EXCLUIR"
            ok-variant="danger" 
            cancel-title="MANTER" 
            cancel-variant="success"
            @ok="deleteProfile(text, user.id)" 
            @cancel="cancelDelete(text)"
        >
            Tem certeza que deseja excluir o perfil de <b>{{this.text}}</b>?
        </b-modal>
    </div>
</template>

<script>
import TabelaAcessoUsuario from './TabelaAcessoUsuario.vue'
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import {baseApiUrl} from "@/config/global";

export default {
    name: "NomeDoPerfilHead",
    mixins: [ValidateToaster],
    components: {
        TabelaAcessoUsuario
    },
    props: {
        items: Array,
        user: Object,
        viewOnly: Boolean,
        colID: String,
        rowID: Number,
        users: Array,
    },
    methods: {
        showUsers(){
            console.clear()
            console.log("\nUsers recebidos",this.users)
        },
        showDetails(){
            this.show_details_count++;
            this.arrow_icon_now = this.arrow_icon_list[this.show_details_count % 2];
            if(this.show_details.length > 0) this.show_details = "";
            else this.show_details = "d-none";
        },
        getPages(){
            this.accessPages = JSON.parse(localStorage.getItem('__defaultAccessPages'));
            // console.log("Pages na head:\n",this.accessPages,"\nPages index table na head:\n",this.pagesIndexTable);
        },
        confirmDelete(){
            this.confirmDeleteModal = !this.confirmDeleteModal;
        },
        deleteProfile(nome, id){
            let uid = id.toString();
            let Nome = nome.toString();
            axios.delete(baseApiUrl+'/perfils/'+uid)
            .then(res => {
                if(res.status >= 200 && res.status < 300){
                    let toast = {
                        isValidated:true,
                        title:'PERFIL EXCLUÍDO',
                        message:'Perfil de '+ Nome.toUpperCase()+' excluído com sucesso!',
                    };
                    this.validateAndToast(toast);
                    // let t0 = new Date();
                    // let dt = 0;
                    // while(dt<3000){
                    //     let t1 = new Date();
                    //     dt = t1-t0;
                    // }
                    this.users.splice(this.rowID,1);
                }
                else {
                    let toast = {
                        isValidated:false,
                        title:'PERFIL NÃO EXCLUÍDO',
                        message:'O perfil de '+Nome.toUpperCase()+' não pôde ser excluído. Motivo:'+res.statusText,
                    };
                    this.validateAndToast(toast);
                }
            })
        },
        cancelDelete(name){
            let toast = {
                isValidated:false,
                title:'PERFIL NÃO EXCLUÍDO',
                message:'O perfil de '+name.toUpperCase()+' foi mantido. A exclusão foi cancelada pelo usuário.',
            }
            this.validateAndToast(toast);
        }
    },
    created() {
        this.getPages();
        this.showUsers();
    },
    data() {
        return {
            show_details:"d-none",
            text: this.user.name,
            arrow_icon_list: ["fal fa-angle-down","fal fa-angle-up"],
            arrow_icon_now: "fal fa-angle-down",
            show_details_count: 0,
            confirmDeleteModal: false,
            accessPages:[],
            pagesIndexTable:{},
        }
    }
}
</script>

<style scoped>
.nome-do-perfil-head{
    background-color: white;    
}
.head-items{
    align-content: center;
    align-items: center;
}
.profile-content {
    background-color: white;
    position: sticky;
    position: -webkit-sticky;
    top: 2px;
    /* z-index: 2; */
    margin-top: 5px;
    margin-bottom: 5px;
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