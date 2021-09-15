<template>
    <div>        
        <pages-sub-header titulo="PERFIL DE USUÁRIOS"/>
        <div class="profile-content user-name-line d-flex">
            <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
            <b-form-input id="profile-name-input" v-model="text" placeholder="Nome do Perfil"/>
        </div>
        <tabela-acesso-usuario :items="headItems"/>
        <b-button variant="dark">SALVAR</b-button>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaAcessoUsuario from '@/components/ProfileAccessTable/TabelaAcessoUsuario.vue';

export default {
    name: "Perfil",
    components: {
        PagesSubHeader,
        TabelaAcessoUsuario,
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