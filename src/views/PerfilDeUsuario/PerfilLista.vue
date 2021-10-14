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

export default{
    name:"PerfilLista",
    mixins: [ValidateToaster], //instanciando e declarando o mixin para usar em children components
    components:{
        PagesSubHeader,
        NomeDoPerfilHead,
    },
    data(){
        return{
            users:[
                {
                    name:"Bob Lazar",
                    id:"00001",
                    data: [
                {
                    acesso:"Teste",
                    modulos:"Módulo teste 1",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste2",
                    modulos:"Módulo teste 2",
                    add:false,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                },
                {
                    acesso:"Teste3",
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                }
                    ]
                },
                {
                    name:"Topo Jijo",
                    id:"00002",
                    data: [
                        {
                            acesso:"Teste",
                            modulos:"Módulo teste 1",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste2",
                            modulos:"Módulo teste 2",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste3",
                            modulos:"Módulo teste 3",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        }
                    ]
                }
            ],
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
                    modulos:"Módulo teste 3",
                    add:true,
                    view:false,
                    edit:false,
                    delete:false
                }
            ],
        }
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