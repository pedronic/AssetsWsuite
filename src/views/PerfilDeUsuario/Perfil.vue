<template>
    <div>        
        <pages-sub-header titulo="PERFIL DE USUÁRIOS"/>
        <div class="profile-content user-name-line d-flex">
            <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
            <b-form-input id="profile-name-input" v-model="text" placeholder="Nome do Perfil"/>
        </div>
        <!-- <nome-do-perfil-head/> -->
        <tabela-acesso-usuario :items="headItems"/>
        <b-button variant="dark">SALVAR</b-button>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaAcessoUsuario from '@/components/ProfileAccessTable/TabelaAcessoUsuario.vue';
// import NomeDoPerfilHead from '@/components/ProfileAccessTable/NomeDoPerfilHead.vue';
// import NomeDoPerfilHead from '../../components/ProfileAccessTable/NomeDoPerfilHead.vue';
export default {
    name: "Perfil",
    components: {
        PagesSubHeader,
        TabelaAcessoUsuario,
        // NomeDoPerfilHead
    },
 
  data() {
        return {
            headItems: [
                {
                    acesso:"Teste",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste2",
                    add:false,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                }
            ],
            labels: [
                {
                    key:'acesso',
                    label: 'Acesso',
                    // tdClass: "col-8"
                },
                {
                    key:'add',
                    label:"",
                    // thClass:"fal fa-plus col-2 head-items",
                    // tdClass: "col-2"
                },
                {
                    key:'view',
                    label:"",
                    // thClass:"fal fa-eye col-2 head-items",
                    // tdClass: "col-2"
                },
                {
                    key:'edit',
                    label:"",
                    // thClass:"fal fa-pencil col-2 head-items",
                    // tdClass: "col-2"
                },
                {
                    key:'delete',
                    label:"",
                    // thClass:"fal fa-trash-alt col-2 head-items",
                    // tdClass: "col-2"
                    // formatter: value => {
                    //     return `<i class="fal fa-trash-alt" >${value}</i>`
                }
            ],
        }
    }
};
</script>

<style scoped>
.head-items{
    align-content: center;
    align-items: center;
}
.profile-content {
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