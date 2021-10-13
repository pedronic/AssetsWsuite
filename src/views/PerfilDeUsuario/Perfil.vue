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
        <tabela-acesso-usuario :items="headItems"/>
        <b-container fluid class="salvar-container">
            <b-button class="botao-salvar" @click="validateProfile">SALVAR</b-button>
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue';
import TabelaAcessoUsuario from '../../components/ProfileAccessTable/TabelaAcessoUsuario.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)

export default {
    name: "Perfil",
    mixins: [ValidateToaster], //instanciando/declarando o mixin na view
    components: {
        PagesSubHeader,
        TabelaAcessoUsuario,
    },
    props: {
        nome:String
    },
    methods: {
        validateProfile(){
            // CRIAR FUNÇÃO DE VALIDAÇÃO (função dummy abaixo apenas para testar funcionalidade)
            let n = Math.floor(Math.random()*Math.PI);
            let toast = {
                isValidated:(n%2) == 0,
                title: (n%2) == 0 ? "PERFIL ADICIONADO" : "OCORREU UM PROBLEMA...",
                message: (n%2) == 0 ? "Novo Perfil de Usuário criado com sucesso!" : "O novo Perfil de Usuário não pode ser adicionado.",
            };
            this.validateAndToast(toast); //utilizando a função/o método do mixin
        }
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