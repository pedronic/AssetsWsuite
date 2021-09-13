<template>
    <div>
        <pages-sub-header titulo="LISTA DE PERFIL"/>
        <nome-do-perfil-head/>
        <tabela-acesso-usuario :items="items"/>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import NomeDoPerfilHead from '@/components/ProfileAccessTable/NomeDoPerfilHead.vue';
import TabelaAcessoUsuario from '@/components/ProfileAccessTable/TabelaAcessoUsuario.vue';

export default{
    name:"PerfilLista",
    components:{
        PagesSubHeader,
        NomeDoPerfilHead,
        TabelaAcessoUsuario
    }
}
</script>

