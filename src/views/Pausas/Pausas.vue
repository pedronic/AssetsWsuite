<template>
    <div class="relatorios">
        <pages-sub-header icon="fal fa-alarm-exclamation" titulo="Pausas">
            <div class="card">
                <div class="card-body"/>
            </div>
        </pages-sub-header>
        <tabela-pausas :items="items" v-if="buildTable"/>
        <b-container fluid class="salvar-container">
            <router-link to='/grupo-de-pausas'>
                <b-button class="botao-salvar">CRIAR GRUPO</b-button>
            </router-link>
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaPausas from '../../components/PauseTable/TabelaPausas.vue';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl} from '../../config/global';

export default {
    name: 'Pausas',
    mixins: [ValidateToaster],
    components: {
        PagesSubHeader,
        TabelaPausas,
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
                pausa.produtiva = p[i].productive?true:false;
                pausa.obrigatoria = p[i].officer?true:false;
                pausa.alerta = p[i].time_alert===null?'':p[i].time_alert;
                pausa.limite = p[i].time_limit===null?'00:01:00':p[i].time_limit;
                let icon = typeof(p[i].icone)==='string'?"<i class='"+p[i].icone+"'/>":p[i].icone;
                pausa.icone = icon;
                pausa.icon_class = p[i].icone===null?'fal fa-ad fa-2x':p[i].icone;
                pausa.ativa = p[i].status?true:false;
                pausa.id = p[i].id;
                items.push({...pausa});
            }
            console.log("Items:\n",items);
            this.items = [...items];
            this.buildTable = true;
        }
    },
    created() {
        this.getPausas();
    },
    data(){
        return{
            buildTable:false,
            items:null,
           /*
            [
                {   
                    pausas: ["Banheiro","OVNI"]
                },
                {
                    pausa:"Banheiro",
                    produtiva: true,
                    obrigatoria: true,
                    alerta:'00:00:30',
                    limite: '00:01:00',
                    icone: '<i class="fal fa-restroom fa-2x"/>',
                    ativa: true,
                    add: '<span class="fal fa-trash-alt"/>',
                },
                {
                    pausa:"OVNI",
                    produtiva: false,
                    obrigatoria: true,
                    alerta:'00:01:00',
                    limite: '00:02:00',
                    icone: '<i class="fal fa-alien fa-2x"/>',
                    ativa: false,
                    add: '<span class="fal fa-trash-alt"/>',
                }
            ]
            */
        }
    }

}
</script>

<style scoped>
.salvar-container{
    bottom: 0;
}
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

div.tabela-pausas > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), div.tabela-pausas > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px !important;
padding-right: calc(0.3rem + 0.65em) !important;
}
div.tabela-pausas > .table.b-table > thead > tr > [aria-sort=none], div.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
div.tabela-pausas > .table.b-table > thead > tr > [aria-sort=ascending], div.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
div.tabela-pausas > .table.b-table > thead > tr > [aria-sort=descending], div.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
div.tabela-pausas > .table.b-table > thead > tr > .table-b-table-default {
background-color: #0d6d9d !important;
color:#fff !important;
align-items: center !important;
align-content: center !important;
text-align: center !important;
vertical-align: middle !important;
}

div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="9"], div.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="9"]{
    width: 2.5% !important;
    text-align: center !important;
}
div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],[aria-colindex="7"], div.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="8"],[aria-colindex="7"]{
    width: 3% !important;
    text-align: center !important;
}
div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="6"],[aria-colindex="5"], div.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="6"],[aria-colindex="5"]{
    width: 6% !important;
}
div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="4"],[aria-colindex="3"], div.tabela-pausas > .table.b-table > thead > tr >[aria-colindex="4"],[aria-colindex="3"]{
    width: 6% !important;
    text-align: center !important;
}
div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="2"], div.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="2"]{
    width: 10% !important;
}
div.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], div.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    text-align: left !important;
}
</style>