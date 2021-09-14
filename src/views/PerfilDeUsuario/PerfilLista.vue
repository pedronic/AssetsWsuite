<template>
    <div>
        <pages-sub-header titulo="LISTA DE PERFIL"/>
        <nome-do-perfil-head v-for="user in users" :items="headItems" :user="user" :key="user.id"/>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import NomeDoPerfilHead from '@/components/ProfileAccessTable/NomeDoPerfilHead.vue';

export default{
    name:"PerfilLista",
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
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste2",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste3",
                            add:true,
                            view:false,
                            edit:true,
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
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste2",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        },
                        {
                            acesso:"Teste3",
                            add:true,
                            view:false,
                            edit:true,
                            delete:false
                        }
                    ]
                }
            ]
            ,
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
        }
    }
}
</script>

