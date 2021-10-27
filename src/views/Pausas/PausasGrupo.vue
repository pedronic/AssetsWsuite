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
        <tabela-grupo-pausas :filter='filter' :items="grupos" :pausasList="pausas" v-if="buildTable"/>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaGrupoPausas from '../../components/PauseTable/TabelaGrupoPausas.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl} from '../../config/global';

export default {
    name:'PausasGrupo',
    mixins: [ValidateToaster],
    components: {
        PagesSubHeader,
        TabelaGrupoPausas
    },
    methods: {
        async getPausas(){
            let res = await axios.get(baseApiUrl+"/breaks");
            let p = res.data.data;
            let pausas = [];
            let first = {};
            let items = [];
            let pausa = {};
            
            for(let i in p){
                pausas.push(p[i].name);
            }
            first.pausas = [...pausas];
            items.push({...first});

            for(let i in p){
                pausa.pausa = p[i].name;
                pausa.id = p[i].id;
                items.push({...pausa});
            }
            console.log("Lista de Pausas:\n",items);
            this.pausas = [...items];
        },
        async getGrupos(){
            let res = await axios.get(baseApiUrl+"/breaksGroups");
            let g = res.data.data;
            console.log("\tGrupos de Pausas @getGrupos():<PausasGrupos/>\n",g)
            let grupos = [];
            let lista_grupos = [];
            let pausas_padrao = [...this.pausas[0].pausas];
            let first = {};
            // let pausas_grupo = [];
            
            for(let i in g){
                lista_grupos.push(g[i].group_name);
            }
            first.grupos = [...lista_grupos];
            grupos.push({...first});


            for (let i in g){
                let grupo = {};
                let pausas = [];
                let ativas = [];
                let pausas_grupo = [];
                grupo.grupo = g[i].group_name;
                grupo.id = g[i].group_id;
                for(let j in g[i].groups){
                    pausas_grupo.push(g[i].groups[j].name);
                }
                for(let k in pausas_padrao){
                    pausas.push(pausas_padrao[k]);
                    let dummy = pausas_grupo.indexOf(pausas_padrao[k])>-1?true:false;
                    ativas.push(dummy);
                }
                grupo.pausas = [...pausas];
                grupo.ativas = [...ativas];
                grupos.push(grupo);
            }
            console.log("\tGrupos:\n",grupos);
            this.grupos = [...grupos];
            this.buildTable = true;
        }
    },
    created() {
        this.getPausas();
        this.getGrupos();
    },
    data(){
        return{
            filter:'',
            busca:'',
            pausas:null,
            buildTable:false,
            grupos:null,
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