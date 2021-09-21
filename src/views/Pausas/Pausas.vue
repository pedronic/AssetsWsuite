<template>
    <div class="relatorios">
        <pages-sub-header icon="fal fa-alarm-exclamation" titulo="Pausas">
            <div class="card">
                <div class="card-body"/>
            </div>
        </pages-sub-header>
        <tabela-pausas :items="items"/>
        <b-button class="botao-salvar">SALVAR</b-button>
    </div>
</template>

<script>
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue';
import TabelaPausas from '@/components/PauseTable/TabelaPausas.vue';

export default {
    name: 'Pausas',
    components: {
        PagesSubHeader,
        TabelaPausas,
    },
    data(){
        return{
            items:[
                {
                    pausa:"Banheiro",
                    fila:['1000','2000','3000'],
                    filas:[],
                    produtiva: true,
                    obrigatoria: true,
                    alerta:'00:00:30',
                    limite: '00:01:00',
                    icone: '<i class="fal fa-restroom fa-2x"/>',
                    ativa: true,
                    add: '<i class="fal fa-trash-alt"/>',
                },
                {
                    pausa:"OVNI",
                    fila:['1000','2000','3000'],
                    filas:[],
                    produtiva: false,
                    obrigatoria: true,
                    alerta:'00:01:00',
                    limite: '00:02:00',
                    icone: '<i class="fal fa-alien fa-2x"/>',
                    ativa: false,
                    add: '<i class="fal fa-trash-alt"/>',
                }
            ]
        }
    }

}
</script>

<style scoped>
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