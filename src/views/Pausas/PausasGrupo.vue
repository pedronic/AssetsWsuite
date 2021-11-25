<template>
    <div class="relatorios">
        <pages-sub-header icon="fal fa-alarm-exclamation" titulo="Grupos de Pausas">
            
            <div class="card">
                <div class="card-body d-flex">
                    <div class="d-flex" id="filtro-grupo-pausa">
                        <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="filter = busca"/>
                        <b-form-input v-model="busca" @keydown.enter.native="filter = busca"></b-form-input>
                    </div>
                </div>
            </div>

            <div class="card"/>
                <div class="card-body"/>

            <div class="card">
                <div class="card-body d-flex">
                    <div class="d-flex" id="add-grupo-pausa">
                        <b-btn variant="success" class="fal fa-plus" v-b-modal="'new_line'"/>
                    </div>
                </div>
            </div>

        </pages-sub-header>
        <tabela-grupo-pausas :filter='filter' :items="gruposDePausas"/>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaGrupoPausas from '@/components/PauseTable/TabelaGrupoPausas.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)

export default {
    name:'PausasGrupo',
    mixins: [ValidateToaster],
    components: {
        PagesSubHeader,
        TabelaGrupoPausas
    },
    data(){
        return{
            filter:'',
            busca:'',
            gruposDePausas:[
                {
                    grupo:"Grupo da Vivo",
                    pausas:['Banheiro', 'Lanche', 'NR', 'Treinamento', 'Outra pausa'],
                    ativas:[true,true,true,false,false],
                },
                {
                    grupo:"Grupo da Claro",
                    pausas:['Banheiro', 'Lanche', 'NR', 'Treinamento', 'Outra pausa'],
                    ativas:[true,true,false,true,false],
                },
                {
                    grupo:"Grupo da Net",
                    pausas:['Banheiro', 'Lanche', 'NR', 'Treinamento', 'Outra pausa'],
                    ativas:[true,true,false,false,true],
                }
            ]
        }
    }
}
</script>

<style scoped>
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
/* .card{
    box-shadow: none;
    border: none;
} */
</style>