<template>
    <div class="pausas">
        <b-table class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields" sticky-header>
            <template v-slot:head(pausa)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(fila)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(produtiva)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(obrigatoria)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(alerta)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(limite)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(icone)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(ativa)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(add)="data">
                <b-button class="head-add-button btn-success" v-b-modal="'new_line'">
                    <span v-html="data.label" class="head-add-button"/>
                </b-button>
            </template>
            
            <template v-slot:cell(pausa)="slot">
                <span :id="(slot.item.pausa)+'_pausa'">{{slot.value}}</span>
            </template>
            <template v-slot:cell(fila)="slot">
                <b-form-select v-model="slot.item.filas" :id="(slot.item.pausa)+'_fila'" :options="slot.value" multiple :select-size="4" />
            </template>
            <template v-slot:cell(produtiva)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_produtiva'" value="true" unchecked-value="false"/>
            </template>
            <template v-slot:cell(obrigatoria)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_obrigatoria'" value="true" unchecked-value="false" />
            </template>
            <template v-slot:cell(alerta)="slot">
                <span :id="(slot.item.pausa)+'_alerta'">{{slot.value}}</span>
            </template>
            <template v-slot:cell(limite)="slot">
                <span :id="(slot.item.pausa)+'_limite'">{{slot.value}}</span>
            </template>
            <template v-slot:cell(icone)="slot">
                <span :id="(slot.item.pausa)+'_icone'" v-html="slot.value" />
            </template>
            <template v-slot:cell(ativa)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_ativa'" value="true" unchecked-value="false" switch />
            </template>
            <template v-slot:cell(add)="slot">
                <b-btn :id="(slot.item.pausa)+'_add'" v-html="slot.value" class="add-btn fa-2x" variant="outline" v-b-modal="slot.item.pausa"/>
            </template>                
        </b-table>
        <div v-for="i in filas" :key="i.pausa">
            <b-modal 
                :id="i.pausa" 
                title="ATENÇÃO!!!"
                :hide-header-close="false"
                :no-close-on-backdrop="false"
                :no-close-on-esc="false"
                :lazy="true"
                ok-title="EXCLUIR"
                ok-variant="danger" 
                cancel-title="MANTER" 
                cancel-variant="success"
                @ok="deleteRow($event)">
                       Tem certeza que deseja excluir a pausa <b>{{i.pausa}}</b>?
            </b-modal>
        </div>
        <b-modal 
            id="new_line"
            refs="new_line"
            title="Adicionar Nova Pausa"
            size="xl"
            :hide-header-close="false"
            :no-close-on-backdrop="false"
            :no-close-on-esc="false"
            
            ok-title="ADICIONAR"
            ok-variant="success" 
            cancel-title="CANCELAR" 
            cancel-variant="danger"
            @ok="okayFunc"
            @hide="addNewRow">
                <b-table class="tabela-pausas table-sm table-bordered table-hover table-striped w-100 dt-responsive dtr-inline" :items="newRowInput" :responsive="true" :fields="newRowFields" sticky-header>
                    <template v-slot:cell(pausa)="slot">
                        <b-form-input v-model="slot.value" :id="'new_row_pausa'" type="text" @input="inputTest">{{slot.value}}</b-form-input>
                    </template>
                    <template v-slot:cell(fila)="slot">
                        <b-form-select v-model="slot.item.filas" :id="'new_row_fila'" :options="slot.value" multiple :select-size="4" />
                    </template>
                    <template v-slot:cell(produtiva)="slot">
                        <b-form-checkbox v-model="slot.value" :id="'new_row_produtiva'" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(obrigatoria)="slot">
                        <b-form-checkbox v-model="slot.value" :id="'new_row_obrigatoria'" value="true" unchecked-value="false" />
                    </template>
                    <template v-slot:cell(alerta)="slot">
                        <b-form-input v-model="slot.value" :id="'new_row_alerta'" type="text" v-mask="'##:##:##'" :no-wheel="true">{{slot.value}}</b-form-input>
                    </template>
                    <template v-slot:cell(limite)="slot">
                        <b-form-input v-model="slot.value" :id="'new_row_limite'" type="text" v-mask="'##:##:##'" :no-wheel="true">{{slot.value}}</b-form-input>
                    </template>
                    <template v-slot:cell(ativa)="slot">
                        <b-form-checkbox v-model="slot.value" :id="'new_row_ativa'" value="true" unchecked-value="false" switch />
                    </template>                     
                </b-table>
        </b-modal>
    </div>
</template>

<script>
export default {
    name:'TabelaPausas',
    props:{
        items: Array,
    },
    methods: {        
        deleteRow(ev){
            this.filas.splice(this.pausas.indexOf(ev.target.id),1);
        },
        inputTest(){
            console.log("Editing New Row Input....")
            console.log(this.newRowInput[0].pausa)
        },
        okayFunc(){
            this.okays = 1;
            this.pivotRow = this.newRowInput;
            console.log("Pivot Row:")
            console.log(this.pivotRow)
            console.log("New Row Input:")
            console.log(this.newRowInput)
            // this.$refs.newLine.hide();
        },
        addNewRow(){
            // console.log(ev.target)
            if (this.okays>0){
                this.filas.push(this.pivotRow[0]);
                this.okays = -1;

                console.log(this.newRowInput)
                // let nri = {
                //     pausa:'',
                //     fila:['1000','2000','3000'],
                //     filas:[],
                //     produtiva: Boolean,
                //     obrigatoria: Boolean,
                //     alerta:'',
                //     limite: '',
                //     icone: '',
                //     ativa: Boolean,
                //     add: '<i class="fal fa-trash-alt"/>',                
                // }
                // this.newRowInput.push(nri);
                // this.$refs.newLine.hide();
            }
        },
        clearNewRow(){
            if (this.okays<0){
                this.newRowInput[0].pausa = '';
                this.newRowInput[0].filas = [];
                this.newRowInput[0].produtiva = false;
                this.newRowInput[0].obrigatoria = false;
                this.newRowInput[0].alerta = '';
                this.newRowInput[0].llimite = '';
                this.newRowInput[0].icone = '';
                this.newRowInput[0].ativa = true;
                this.newRowInput[0].add = '<i class="fal fa-trash-alt"/>'   
            }
            // this.$refs.newLine.hide();
        }
        // loadList(params){
        //     this.filas = params;

        // }
    },
    computed: {
        // filas: function() {
        //     let v = [];
        //     v = this.items.slice(1,this.items.length);
        //     return v;
        // }
    },
    data(){
        return {
            filas: this.items.slice(1,this.items.length),
            okays: 0,
            pausas: this.items[0].pausas,
            pivotRow: [
                {
                    pausa:'',
                    fila:['1000','2000','3000'],
                    filas:[],
                    produtiva: false,
                    obrigatoria: false,
                    alerta:'',
                    limite: '',
                    icone: '',
                    ativa: true,
                    add: '<i class="fal fa-trash-alt"/>',
                    
                }
            ],
            newRowInput: [
                {
                    pausa:'test',
                    fila:['1000','2000','3000'],
                    filas:[],
                    produtiva: false,
                    obrigatoria: false,
                    alerta:'',
                    limite: '',
                    icone: '',
                    ativa: true,
                    add: '<i class="fal fa-trash-alt"/>',
                }
            ],
            newRowFields: [
                {
                    key:'pausa',
                    label: 'Pausas',
                },
                {
                    key:'fila',
                    label: 'Filas'
                },
                {
                    key:'produtiva',
                    label: 'Produtiva'
                },
                {
                    key:'obrigatoria',
                    label: 'Obrigatória'
                },
                {
                    key:'alerta',
                    label: 'Alerta'
                },
                {
                    key:'limite',
                    label: 'Limite'
                },
                {
                    key:'icone',
                    label: 'Ícone'
                },
                {
                    key:'ativa',
                    label: 'Ativa'
                }
            ],
            fields: [
                {
                    key:'pausa',
                    label: 'Pausas',
                },
                {
                    key:'fila',
                    label: 'Filas'
                },
                {
                    key:'produtiva',
                    label: 'Produtiva'
                },
                {
                    key:'obrigatoria',
                    label: 'Obrigatória'
                },
                {
                    key:'alerta',
                    label: 'Alerta'
                },
                {
                    key:'limite',
                    label: 'Limite'
                },
                {
                    key:'icone',
                    label: 'Ícone'
                },
                {
                    key:'ativa',
                    label: 'Ativa'
                },
                {
                    key:'add',
                    label: '<i class="fal fa-plus fa-1x head-add-button"/>'
                }
            ]
        }
    }
}
</script>

<style>
.add-btn{
    padding: 0px !important;
    border-width: 0px !important;
    align-items: center !important;
    display: contents;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#new_row_limite, #new_row_alerta {
    width: 8ch;
    padding: 0.2ch;
}

/* .head-add-button, .head-add-button>i{
    background-color: forestgreen !important;
    display: contents;
}
.head-add-button:hover, .head-add-button:hover>i{
    background-color: #2bc381 !important;
    display: contents;
} */

.tabela-pausas > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-pausas > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px;
padding-right: calc(0.3rem + 0.65em);
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort=none], .tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort=descending], .tabela-pausas > .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-pausas > .table.b-table > thead > tr > .table-b-table-default {
background-color: #0d6d9d !important;
color:#fff !important;
border-color: #0d6d9d !important;
align-items: center !important;
align-content: center !important;
text-align: center;
vertical-align: middle !important;
/* z-index: 4; */
}

.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="9"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="9"]{
    width: 4.5%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],[aria-colindex="7"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="8"],[aria-colindex="7"]{
    width: 3%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="6"],[aria-colindex="5"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="6"],[aria-colindex="5"]{
    width: 6%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="4"],[aria-colindex="3"], .tabela-pausas > .table.b-table > thead > tr >[aria-colindex="4"],[aria-colindex="3"]{
    width: 6%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="2"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="2"]{
    width: 10%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    text-align: left !important;
}
/* .head-add-button{
    max-width: 30px !important;
    max-height: 30px !important;
    object-fit: scale-down !important;
    align-items: center !important;
    align-content: center !important;
    text-align: center;
    vertical-align: middle !important;
} */
</style>