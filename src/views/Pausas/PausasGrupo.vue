<template>
    <div class="relatorios">
        <PagesSubHeader icon="fal fa-alarm-exclamation" titulo="Grupos de Pausas">
            
            <div class="card">
                <div class="card-body d-flex">
                    <div class="d-flex" id="filtro-grupo-pausa">
                        <b-form-input v-model="busca" @keydown.enter.native="filter = busca"></b-form-input>
                        
                        <div class="card">
                            <div class="card-body" />
                        </div>
                        
                        <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="filter = busca"/>
                    </div>
                </div>
            </div>

            <div class="card"/>
                <div class="card-body"/>


        </PagesSubHeader>
        <tabela-grupo-pausas :filter='filter' :items="grupos" :pausasList="pausas" :isLoading="loadingPage" v-if="buildTable" :permissions='{add:!adds, edit:!edits, delete:!deletes}'/>
        <b-container fluid class="salvar-container">
            <b-pagination
              v-model="currentPage"
              :total-rows="total_items"
              :per-page="perPage"
              aria-controls="my-table"
              prev-class="single-arrow-button"
              next-class="single-arrow-button"
              ellipsis-text="···"
              @change="showSelectedPage"
            />
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaGrupoPausas from '../../components/PauseTable/TabelaGrupoPausas.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl} from '../../config/global';

const perpage = 10;

export default {
    name:'PausasGrupo',
    mixins: [ValidateToaster],
    components: {
        PagesSubHeader,
        TabelaGrupoPausas
    },
    methods: {
        getPermission(){
            let page = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            let perms = JSON.parse(localStorage.getItem('__userAccessPages'));
            this.adds = perms[page.Pausas - 1].add;
            this.edits = perms[page.Pausas - 1].edit;
            this.deletes = perms[page.Pausas - 1].delete;
        },
        showSelectedPage(page){
            this.loadingPage = true;
            this.getGrupos(page);
            this.loadingPage = false;
        },
        async getPausas(){
            this.getPermission();
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
        async getGrupos(page){
            let pag = page.toString();
            let res = await axios.get(baseApiUrl+"/breaksGroups"+"?page="+pag);
            let g = res.data.data;
            this.total_items = res.data.count;
            this.total_pages = Math.ceil(res.data.count / res.data.limit);
            this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
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
        this.getGrupos(this.currentPage);
    },
    data(){
        return{
            adds:null,
            edits:null,
            deletes:null,
            reads:null,
            loadingPage:false,
            total_items:0,
            total_pages:0,
            currentPage:1,
            perPage:perpage,
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
.card{
    box-shadow: none;
    border: none;
}
</style>