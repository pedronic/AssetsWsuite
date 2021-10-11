<template>
    <div class="pausas">
        <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields" sticky-header>
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
                <b-button class="head-add-button btn-success" @click="clearNewRow" v-b-modal="'new_line'" variant="outline-dark">
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
                <b-button :id="(slot.item.pausa)+'_edit'" class="edit-btn" variant="outline"  v-b-modal="(slot.item.pausa)+'_edit_modal'" @mousedown="showEdit($event,slot.item)" v-html="editIcon"/>
                <b-btn :id="(slot.item.pausa)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.pausa + '_delete'"/>
            </template>                
        </b-table>
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
        <div v-for="i in filas" :key="i.pausa+'_edit'">
            <b-modal 
            :id="i.pausa+'_edit_modal'"
            :ref="i.pausa+'_edit_modal'"
            title="Editar Pausa"
            size="xl"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            :lazy="true"
            :ok-only="true"
            ok-title="SALVAR"
            ok-variant="info" 
            @ok="updateRow($event,i)"
            @show="cancelEdit(editRowInput)"
            v-if="modalData"
            >
            <!-- cancel-title="CANCELAR" 
            cancel-variant="danger"
            @ok="updateRow($event,i)"
            @cancel="cancelEdit(editRowInput)"
            @show="cancelEdit(editRowInput)"
            v-if="modalData"
            > -->
                <b-container fluid>
                    <b-col cols="14">
                        <b-row>
                            <b-col cols="4" class="pausa-head-container">
                                <span class="pausa-head">Pausa</span>
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
                                <b-form-input v-model="editRowInput.pausa" :presentState="i" :id="i.pausa+'_edit_row_pausa'" :ref="i.pausa+'_edit_row_pausa'" type="text" @input="inputTest" @load="inputTest2($event)"/>
                            </b-col>
                            <b-col cols="2" class="produtiva-body-container" >
                                <b-form-checkbox v-model="editRowInput.produtiva" :presentState="i" :id="i.pausa+'_edit_row_produtiva'" value="true" unchecked-value="false" />
                            </b-col>
                            <b-col cols="2" class="obrigatoria-body-container" >
                                <b-form-checkbox v-model="editRowInput.obrigatoria" :presentState="i" :id="i.pausa+'_edit_row_obrigatoria'" value="true" unchecked-value="false"/>
                            </b-col>
                            <b-col cols="1" class="alerta-body-container">
                                <b-form-input v-model="editRowInput.alerta" :presentState="i" :id="i.pausa+'_edit_row_alerta'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="limite-body-container">  
                                <b-form-input v-model="editRowInput.limite" :presentState="i" :id="i.pausa+'_edit_row_limite'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="icone-body-container">
                                <b-form-select v-model="editRowInput.icone" :id="i.pausa+'_edit_row_icone'" :select-size="4">
                                    <b-form-select-option v-for="j in icons" :key="j.value">
                                        <span :id="j.value" v-html="j.html"/>
                                    </b-form-select-option>
                                </b-form-select>
                            </b-col>
                            <b-col cols="1" class="ativa-body-container">
                                <b-form-checkbox v-model="editRowInput.ativa" :presentState="i" :id="i.pausa+'_edit_row_ativa'" value="true" unchecked-value="false" switch />
                            </b-col> 
                        </b-row>
                    </b-col>
                </b-container>
            </b-modal>
        <!-- MODAL PARA Edição DE LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
            <b-modal 
                :id="i.pausa+'_delete'" 
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
        <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
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
                <b-container fluid>
                    <b-col cols="12">
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
                                <b-form-input v-model="newRowInput.pausa" :id="'new_row_pausa'" type="text" @input="inputTest" ></b-form-input>
                            </b-col>
                            <b-col cols="2" class="produtiva-body-container" >
                                <b-form-checkbox v-model="newRowInput.produtiva" :id="'new_row_produtiva'" value="true" unchecked-value="false"/>
                            </b-col>
                            <b-col cols="2" class="obrigatoria-body-container" >
                                <b-form-checkbox v-model="newRowInput.obrigatoria" :id="'new_row_obrigatoria'" value="true" unchecked-value="false"/>
                            </b-col>
                            <b-col cols="1" class="alerta-body-container">
                                <b-form-input v-model="newRowInput.alerta" :id="'new_row_alerta'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="limite-body-container">
                                <b-form-input v-model="newRowInput.limite" :id="'new_row_limite'" type="text"  v-mask="'##:##:##'"></b-form-input>
                            </b-col>
                            <b-col cols="1" class="icone-body-container">
                                <b-form-select v-model="newRowInput.icone" :id="'new_row_icone'" :select-size="4" :options="icons">
                                </b-form-select>
                            </b-col>
                            <b-col cols="1" class="ativa-body-container">
                                <b-form-checkbox v-model="newRowInput.ativa" :id="'new_row_ativa'" value="true" unchecked-value="false" switch />
                            </b-col>
                        </b-row>
                    </b-col>
                </b-container>
        </b-modal>
        <!-- MODAL PARA CRIAR NOVA LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- <b-modal 
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
        </b-modal> -->
    </div>
</template>

<script>
const defaultRow = {
                    pausa:'',
                    produtiva: false,
                    obrigatoria: false,
                    alerta:'',
                    limite: '',
                    icone: '',
                    ativa: true,
                    add: '<span class="fal fa-trash-alt"/>',
                };

export default {
    name:'TabelaPausas',
    props:{
        items: Array,
    },
    methods: {
        deleteRow(ev){
            const i = ev.target.id.slice(0,ev.target.id.indexOf(ev.target.id.match("[_]")));
            const p = this.pausas.indexOf(i);
            console.log("target id:\t",ev.target.id);
            console.log("p:\t",p);
            console.log("pausas:\t",this.pausas)
            this.filas.splice(p,1);
            this.pausas.splice(p,1);
            console.log("pausas:\t",this.pausas)
        },
        deleteRow2(pos){
            this.filas.splice(pos,1);
            this.pausas.splice(pos,1);
        },
        inputTest(){
            console.log("Editing New Row Input....")
            console.log(this.editRowInput.pausa)
        },
        inputTest2(ev){
            console.log("Input load:\n",ev.target)
        },
        okayFunc(){
            console.log('OK')
            console.log(JSON.stringify(this.filas[this.filas.length - 1]))
            console.log(JSON.stringify(this.newRowInput))
            console.log((JSON.stringify(this.filas[this.filas.length - 1]) !== JSON.stringify(this.newRowInput)))
            if (this.okays == 0){
                console.log("Filas ok:")
                console.log(this.filas)
                console.log("New Row Input:")
                console.log(this.newRowInput)
                this.okays = 1;
            }
        },
        addNewRow(){
            if (this.okays>0){
                console.log("ADD NEW ROW")
                this.filas.push(Object.assign({},this.newRowInput));
                let sub = JSON.stringify(Object.assign(this.newRowInput.pausa.toString()));
                this.pausas.push(sub.slice(1,sub.length - 1));
                console.log("Pausas: \n",this.pausas)
                console.log("Filas: \n",this.filas)
                this.okays = -1;
            }
            console.log(this.newRowInput)
            console.log(this.filas)
            this.clearNewRow();
        },
        clearNewRow(){
            console.log("Clear???")
            console.log(JSON.stringify(this.filas[this.filas.length - 1]))
            console.log(JSON.stringify(this.newRowInput))
            console.log((JSON.stringify(this.filas[this.filas.length - 1]) !== JSON.stringify(this.newRowInput)))
            console.log((this.okays<0))

            if ((this.okays<0) || (JSON.stringify(this.newRowDefault) !== JSON.stringify(this.newRowInput))){
                console.log("Clear on Button")
                this.newRowInput = {...this.newRowDefault}
                this.okays = 0;
            }
            console.log("filas: \n",this.filas);
        },
        showEdit(ev,i){
            console.log("Show Edit")
            console.log(i)
            // this.editRowInput = {...i};
            console.log('Edit Row on ShowEdit():\n',this.editRowInput);
            this.cancelEdit(this.editRowInput);
            setTimeout(this.populateEditLine(i),1000);
        },
        populateEditLine(row){
            // console.log(e.target.id)
            // let s = e.target.id.slice(0,e.target.id.indexOf(e.target.id.match("[_]")));
            console.log("Row item:\n",row);
            console.log("Row Pausa:\t",row.pausa)
            // this.editRowInput = Object.assign({},this.filas[this.pausas.indexOf(s)]);
            // this.editRowInput = this.filas[this.pausas.indexOf(s)];
            // this.newRowInput = this.filas[this.pausas.indexOf(s)];
            for (let k in this.editRowInput) delete this.editRowInput[k];
            console.log("Empty editRowInput:\n",this.editRowInput);
            this.editRowInput = Object.assign({},row);
                // this.cancelEdit()
            // this.editRowInput.$forceUpdate();
            // this.newRowInput = this.editRowInput;
            console.log("editRowInput @populateEditLine:\n",this.editRowInput)
            // let s = row.pausa+'_edit_modal'
            // let b = row.pausa+'_edit'
            // this.$root.$emit('bv::show::modal',s,b)
            // this.fillLine(e)
            if (JSON.stringify(this.editRowInput) === JSON.stringify(row)) this.modalData = true;
        },
        updateRow(ev,row){
            console.log("Close Edit Event @updateRow():\n",ev)
            
            var p = this.pausas.indexOf(row.pausa);
            this.editRowInput.pausa = this.editRowInput.pausa.trim();          
            
            console.log("Pausas antes de deletar:\n",this.pausas)
            /* Deletando Apagando dados da Fila na posição editada */
            this.deleteRow2(p);
            console.log("Pausas depois de deletar:\n",this.pausas)
            
            /* Atualizando Fila e Pausas com dados editados */
            this.filas.splice(p,0,{...this.editRowInput});
            this.pausas.splice(p,0, this.editRowInput.pausa);
            
            console.log("Filas atualizadas (???):\n",this.filas);
            console.log("Pausas atualizada:\n",this.pausas)
            
            this.closeEdit();
        },
        closeEdit(){
            console.log("tudo certo nada resolvido ainda...")
            this.editRowInput = Object.assign(this.newRowDefault);
            console.log("editRowInput @closeEdit:\n",this.editRowInput)
            console.log(this.filas)
            this.modalData = false;
            console.log("Fim de closeEdit...")
        },
        cancelEdit(eri){
            var e = eri;
            for (let k in this.editRowInput) delete this.editRowInput[k];
            this.editRowInput = Object.assign({},this.newRowDefault);
            e = Object.assign({},this.newRowDefault);
            console.log("editRowInput @cancelEdit:\n",this.editRowInput);
            console.log("e:\n",e)
        }
    },
    created(){
        this.newRowDefault = {...defaultRow};
        this.newRowInput = Object.assign({},this.newRowDefault);
        this.editRowInput = Object.assign({},this.newRowDefault);
        // localStorage.setItem('__pedro-dev', JSON.stringify(this.items.slice(1,this.items.length)));
        // this.editRowInput = this.filas;
        // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
    },
    watch:{
        // filas(newValue){
        //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
        // }
    },
    mounted(){
        
        // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
    },
    data(){
        return {
            filas: this.items.slice(1,this.items.length),
            okays: 0,
            modalData: false,
            thisLine: {},
            editIcon: '<span class="fal fa-pencil"/>',
            deleteIcon: '<span class="fal fa-trash-alt"/>',
            pausas: this.items[0].pausas,
            dummy: [],
            icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
                    {value:'i2', html:'<span class="fal fa-plus"/>'},
                    {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
                    {value:'i4', html:'<span class="fal fa-abacus"/>'}],
            pivotRow: this.filas,
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
                    label: '<span class="fal fa-plus fa-1x head-add-button"/>'
                }
            ]
        }
    }
}
</script>

<style>
span.fal{
    pointer-events: none;
}

.add-btn>i, .edit-btn>i{
    padding: 0px !important;
    border-width: 0px 1px !important;
    display: flex;
    align-content: center;
    justify-content: center;
}

.add-btn, .edit-btn{
    display: table-cell;
    align-items: center !important;
    border-width: 1px 1px !important;
    border-color: #adadad;
    width: 42px;
    height: 42px;
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
    width: 3.5%;
    text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],[aria-colindex="6"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="7"],[aria-colindex="6"]{
    width: 3%;
    text-align: center;
    justify-content: center;
    display: table-cell;
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