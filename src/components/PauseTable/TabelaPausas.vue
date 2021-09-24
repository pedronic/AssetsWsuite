<template>
    <div class="pausas">
        <b-table class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields" sticky-header>
            <template v-slot:head(pausa)="data">
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
                <b-button class="head-edit-button btn-success" variant="outline-dark" v-b-modal="'edit_line'" >
                    <span v-html="editIcon" class="head-edit-button"/>
                </b-button>
                <b-button class="head-add-button btn-success" v-b-modal="'new_line'" variant="outline-dark">
                    <span v-html="data.label" class="head-add-button"/>
                </b-button>
            </template>
            
            <template v-slot:cell(pausa)="slot">
                <span :id="(slot.item.pausa)+'_pausa'">{{slot.value}}</span>
            </template>
            <template v-slot:cell(produtiva)="slot" >
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_produtiva'" value="true" unchecked-value="false" disabled/>
            </template>
            <template v-slot:cell(obrigatoria)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_obrigatoria'" value="true" unchecked-value="false" disabled/>
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
                <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_ativa'" value="true" unchecked-value="false" switch disabled/>
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
            @hide="addNewRow"
            @show="this.pivotRow.splice(0,0,this.newRowInput[0])">
                <b-container fluid>
                    <b-col cols="14">
                        <b-row>
                            <b-col cols="4" class="pausa-head-container">
                                <span class="pausa-head">Nova Pausa</span>
                            </b-col>
                            <b-col cols="2" class="produtiva-head-container">
                                <span class="produtiva-head">Produtiva</span>
                            </b-col>
                            <b-col cols="2" class="obrigatoria-head-container">
                                <span class="obrigatoria-head">Obrigatória</span>
                            </b-col>
                            <b-col cols="1" class="alerta-head-container">
                                <span class="alerta-head">Alerta</span>
                            </b-col>
                            <b-col cols="1" class="limite-head-container">
                                <span class="limite-head">Limite</span>
                            </b-col>
                            <b-col cols="1" class="icone-head-container">
                                <span class="icone-head">Ícone</span>
                            </b-col>
                            <b-col cols="1" class="ativa-head-container">
                                <span class="ativa-head">Ativa</span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4" class="pausa-body-container">
                                <b-form-input v-model="pivotRow[0].pausa" :id="'new_row_pausa'" type="text" @input="inputTest" ></b-form-input>
                            </b-col>
                            <b-col cols="2" class="produtiva-body-container" >
                                <b-form-checkbox v-model="pivotRow[0].produtiva" :id="'new_row_produtiva'" value="true" unchecked-value="false"/>
                            </b-col>
                            <b-col cols="2" class="obrigatoria-body-container" >
                                <b-form-checkbox v-model="pivotRow[0].obrigatoria" :id="'new_row_obrigatoria'" value="true" unchecked-value="false"/>
                            </b-col>
                            <b-col cols="1" class="alerta-body-container">
                                <b-form-input v-model="pivotRow[0].alerta" :id="'new_row_alerta'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="limite-body-container">
                                <b-form-input v-model="pivotRow[0].limite" :id="'new_row_limite'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="icone-body-container">
                                <b-form-select v-model="pivotRow[0].icone" :id="'new_row_icone'" :select-size="4">
                                    <b-form-select-option v-for="i in icons" :key="i.value">
                                        <span :id="i.value" v-html="i.html"/>
                                    </b-form-select-option>
                                </b-form-select>
                            </b-col>
                            <b-col cols="1" class="ativa-body-container">
                                <b-form-checkbox v-model="pivotRow[0].ativa" :id="'new_row_ativa'" value="true" unchecked-value="false" switch />
                            </b-col>
                        </b-row>
                    </b-col>
                </b-container>
        </b-modal>
            <b-modal 
                id="edit_line"
                refs="edit_line"
                title="Editar pausas..."
                size="xl"
                :hide-header-close="false"
                :no-close-on-backdrop="false"
                :no-close-on-esc="false"
                
                ok-title="SALVAR"
                ok-variant="success" 
                cancel-title="CANCELAR" 
                cancel-variant="danger">
                <b-table id="editar-pausas" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="this.filas" :responsive="true" :fields="newRowFields" sticky-header>
                    <template v-slot:head(pausa)="data">
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
                    
                    <template v-slot:cell(pausa)="slot">
                        <b-form-input :id="'edit_'+(slot.item.pausa)+'_pausa'" v-model="slot.value" type="text" :disabled="false"/>
                    </template>
                    <template v-slot:cell(produtiva)="slot" >
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_produtiva'" value="true" unchecked-value="false" :disabled="false"/>
                    </template>
                    <template v-slot:cell(obrigatoria)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_obrigatoria'" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(alerta)="slot">
                        <b-form-input :id="'edit_'+(slot.item.pausa)+'_alerta'" v-model="slot.value" type="text"/>
                    </template>
                    <template v-slot:cell(limite)="slot">
                        <b-form-input :id="'edit_'+(slot.item.pausa)+'_limite'" v-model="slot.value" type="text"/>
                    </template>
                    <template v-slot:cell(icone)="slot">
                        <span :id="(slot.item.pausa)+'_icone'" v-html="slot.value" />
                    </template>
                    <template v-slot:cell(ativa)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.pausa)+'_ativa'" value="true" unchecked-value="false" switch/>
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
            console.log(this.pivotRow[0].pausa)
        },
        okayFunc(){
            this.okays = 1;
            console.log("Pivot Row:")
            console.log(this.pivotRow)
            console.log("New Row Input:")
            console.log(this.newRowInput)
        },
        addNewRow(){
            if (this.okays>0){
                console.log("ADD NEW ROW")
                this.filas.push(this.pivotRow[0]);
                this.okays = -1;
                // this.clearNewRow();
            }
            this.pivotRow.splice(0,0,this.newRowInput[0]);
        },
        clearNewRow(){
            this.pivotRow.splice(0,0,this.newRowInput[0]);
        }
    },
    computed: {
    },
    data(){
        return {
            filas: this.items.slice(1,this.items.length),
            okays: 0,
            editIcon: '<i class="fal fa-pencil"/>',
            pausas: this.items[0].pausas,
            dummy: [],
            icons: [{value:'i1', html:'<i class="fal fa-trash-alt"/>'},
                    {value:'i2', html:'<i class="fal fa-plus"/>'},
                    {value:'i3', html:'<i class="fal fa-air-conditioner"/>'},
                    {value:'i4', html:'<i class="fal fa-abacus"/>'}],
            pivotRow: [
                {
                    pausa:'',
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
                    pausa:'',
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
    width: 100%;
    padding: 0.2ch;
    text-align: center;
}

.pausa-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container{
    display: flex;
    padding-left: 2px !important;
    padding-right: 2px !important;
}

.pausa-head {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 2ch;
    text-align: left;
    vertical-align: middle !important;
}

.produtiva-head, .obrigatoria-head, .alerta-head, .limite-head, .icone-head, .ativa-head{
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 0ch;
    text-align: center;
    vertical-align: middle !important;
    justify-content: center !important;
}


.pausa-body-container, .produtiva-body-container, .obrigatoria-body-container, .alerta-body-container, .limite-body-container, .icone-body-container, .ativa-body-container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    padding-left: 2px !important;
    padding-right: 2px !important;
}


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
}

.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="8"]{
    width: 4.5%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],[aria-colindex="6"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="7"],[aria-colindex="6"]{
    width: 3%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],[aria-colindex="4"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="5"],[aria-colindex="4"]{
    width: 6%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],[aria-colindex="2"], .tabela-pausas > .table.b-table > thead > tr >[aria-colindex="3"],[aria-colindex="2"]{
    width: 6%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    width: 10%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    text-align: left !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
    display: none !important;
}
</style>