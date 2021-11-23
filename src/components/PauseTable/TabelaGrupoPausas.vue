<template>
    <div class="pausas">
        <b-table id="tabela-grupo-pausas" :ref="'tabela-de-pausas'" class="tabela-grupo-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="grupos" :responsive="true" :fields="fields" sticky-header sort-icon-left :filter="filter" filter-debounce="50" :filter-included-fields="['grupo']" :per-page="10" :busy="busy">
            <template v-slot:head(grupo)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(action)="data"> 
                <b-btn variant="outline-dark" class="head-add-button btn-success" v-b-modal="'new_line'">
                    <span v-html="data.label" class="head-add-button"/>
                </b-btn>
            </template>
            
            
            <template v-slot:cell(grupo)="slot">
                <span :id="slot.item.grupo+'_grupo'">{{slot.item.grupo}}</span>
            </template>
            <template v-slot:cell(action)="slot">
                <b-button :id="slot.item.grupo + '_edit'" class="edit-btn" variant="outline"  v-b-modal="slot.item.grupo+'_edit_modal'" v-html="editIcon"/>
                <b-btn :id="slot.item.grupo + '_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.grupo+'_delete_modal'"/>
            </template>                
        </b-table>
<!-- ---------------------------------------------------- -->
        <div v-for="(i, index) in grupos" :key="i.grupo+'_modals'">
            <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
            <b-modal 
                :id="i.grupo+'_edit_modal'"
                :ref="i.grupo+'_edit_modal'"
                title='Editar Grupo de Pausas'
                size="xl"
                :hide-header-close="true"
                :no-close-on-backdrop="true"
                :no-close-on-esc="true"
                :lazy="true"
                cancel-title="CANCELAR" 
                cancel-variant="danger"
                ok-title="SALVAR"
                ok-variant="info" 
                @ok="updateRow(index)"
                @cancel="cancelEdit(index)"
                @show="populateEditLine(index)"
                >
                <b-container fluid>
                    <b-col cols="12">
                        <b-row id="novo_grupo_pausa">
                            <b-col cols="12">
                                <b-form-input v-model="editRowInput.grupo" :id="'new_row_group'" type="text"  placeholder="Nome do  Novo Grupo de Pausas"/>
                            </b-col>
                        </b-row>
                    </b-col>

                    <b-col cols="4">
                        <b-container fluid>
                            <b-row>
                                <b-col cols="12" class="pausa-head-container">
                                    <span class="pausa-head">Pausas do Grupo</span>
                                </b-col>
                            </b-row>

                            <b-container fluid v-for="(p, index) in editRowInput.pausas" :key="i.grupo+'_'+p" >
                                <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                    <b-col cols="10" class="pausa-head-container">
                                        <span class="pausa-body">{{p}}</span>
                                    </b-col>
                                    <b-col cols="2" class="ativa-head-container">
                                        <b-form-checkbox v-model="editRowInput.ativas[index]" :key="index" :id="p+'_edit_row_ativa'" :value="true" :unchecked-value="false"/>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-container>
                    </b-col>
                </b-container>
            </b-modal>
            <!-- MODAL PARA Edição DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
            <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
            <b-modal 
                    :id="i.grupo+'_delete_modal'" 
                    title="ATENÇÃO!!!"
                    :hide-header-close="false"
                    :no-close-on-backdrop="false"
                    :no-close-on-esc="false"
                    :lazy="true"
                    ok-title="EXCLUIR"
                    ok-variant="danger" 
                    cancel-title="MANTER" 
                    cancel-variant="success"
                    @ok="deleteRow(i.grupo, i.id)"
                    @cancel="cancelDelete(i.grupo)">
                        Tem certeza que deseja excluir o grupo de pausas <b>{{i.grupo}}</b>?
            </b-modal>
        </div>
        <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
        <b-modal 
            id="new_line"
            refs="new_line"
            title="Adicionar Novo Grupo de Pausas"
            size="xl"
            :hide-header-close="false"
            :no-close-on-backdrop="false"
            :no-close-on-esc="false"
            
            ok-title="ADICIONAR"
            ok-variant="success" 
            cancel-title="CANCELAR" 
            cancel-variant="danger"
            @ok="okayAdd()"
            @cancel="cancelAdd()"
            @show="populateNewLine()">
                <b-container fluid>
                    <b-col cols="12">
                        <b-row id="novo_grupo_pausa">
                            <b-col cols="12">
                                <b-form-input v-model="newRowInput.grupo" :id="'new_row_group'" type="text" placeholder="Nome do Novo Grupo de Pausas"/>
                            </b-col>
                        </b-row>
                    </b-col>
                    
                    <b-col cols="4">
                        <b-container fluid>
                            <b-row>
                                <b-col cols="12" class="pausa-head-container">
                                    <span class="pausa-head">Pausas do Grupo</span>
                                </b-col>
                            </b-row>

                            <b-container fluid v-for="(p, index) in newRowInput.pausas" :key="newRowInput.grupo+'_'+p" >
                               <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                   <b-col cols="10" class="pausa-head-container">
                                       <span class="pausa-body">{{p}}</span>
                                   </b-col>
                                   <b-col cols="2" class="ativa-head-container">
                                       <b-form-checkbox v-model="newRowInput.ativas[index]" :id="newRowInput.grupo+'_'+p+'_new_row_ativa'" :value="true" :unchecked-value="false"/>
                                   </b-col>
                               </b-row>
                            </b-container>
                        </b-container>
                    </b-col>
                </b-container>
        </b-modal>
        <!-- MODAL PARA CRIAR NOVA LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
    </div>
</template>

<script>
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl} from '../../config/global';

export default {
    name:'TabelaGrupoPausas',
    mixins: [ValidateToaster],
    props:{
        items: Array,
        filter: String,
        pausasList: Array,
        isLoading:{type:Boolean, default:false}
    },
    methods: {
        deleteRow(nomeDoGrupo, id){ //recebe nome do grupo e apaga da lista de grupos de pausas local
            const g = this.gruposNames.indexOf(nomeDoGrupo);
            axios.delete(baseApiUrl +'/breaksGroups/'+id)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText)
                let toast = {
                    isValidated:true,
                    title:'GRUPO DE PAUSAS EXCLUÍDO',
                    message:'Grupo de Pausas '+nomeDoGrupo.toUpperCase()+' excluído com sucesso!',
                }
                this.validateAndToast(toast);
                this.gruposNames.splice(g,1);
                this.grupos.splice(g,1);
            })
            .catch(error => {
                console.log("\n\tERROR RESPONSE:\n",error.response)
                let toast = {
                    isValidated:false,
                    title:'GRUPO DE PAUSAS NÃO EXCLUÍDO',
                    message:'O Grupo de Pausas '+ nomeDoGrupo.toUpperCase()+' não pôde ser excluído. Motivo: '+error.message,
                }
                this.validateAndToast(toast);
            })
        },
        cancelDelete(g){
            let toast = {
                isValidated:false,
                title:'GRUPO DE PAUSAS MANTIDO',
                message:'Grupo de Pausas '+g.toUpperCase()+' foi mantido. A exclusão foi cancelada pelo usuário.',
            }
            this.validateAndToast(toast);
        },
        cancelAdd(){
            this.newRowInput = {...this.newRowDefault};
            let toast = {
                isValidated:false,
                title:'NOVO GRUPO DE PAUSAS NÃO FOI CRIADO',
                message:'Nenhum Grupo de Pausas Novo foi adicionado. A inclusão de um Novo Grupo de Pausas foi cancelada pelo usuário.',
            }
            this.validateAndToast(toast);
        },
        okayAdd(){
            let newPausa = this.newRowInput.grupo.trim();
            if (newPausa.length>0){
                let body = {};
                body.name = this.newRowInput.grupo.trim();
                let groups = [];
                for(let i in this.newRowInput.ativas){
                    let pausa = {};
                    if(this.newRowInput.ativas[i]){
                        let iID = this.pausasList[0].pausas.indexOf(this.newRowInput.pausas[i]) + 1;
                        pausa.id = this.pausasList[iID].id;
                        pausa.name = this.pausasList[iID].pausa;
                        groups.push(pausa)
                    }
                    else continue;
                }
                body.groups = [...groups];
                console.log("Body @okayAdd():\n",body);
                this.postNewLine(body);
            }
            else {
                this.newRowInput = {...this.newRowDefault};
                let toast = {
                    isValidated:false,
                    title:'NOVO GRUPO DE PAUSAS VAZIO NÃO ADICIONADO',
                    message:'Novo Grupo de Pausas '+newPausa.toUpperCase()+' não foi adicionado. Não é possível adicionar Grupos de Pausas sem nome ou com o nome em branco. A operação foi cancelada.',
                }
                this.validateAndToast(toast);
            }
        },
        populateNewLine(){
            this.newRowInput = {...this.newRowDefault};
        },
        postNewLine(body){
            axios.post(baseApiUrl+'/breaksGroups',body)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText);
                let toast = {
                    isValidated:true,
                    title:'NOVO GRUPO DE PAUSAS ADICIONADO',
                    message:'Grupo de Pausas '+body.name.toUpperCase()+' adicionado com sucesso!',
                }
                this.validateAndToast(toast);
                this.grupos.push(Object.assign({},this.newRowInput));
                this.gruposNames.push(body.name);
            })
            .catch(error => {
                console.log("\n\tERROR RESPONSE:\n",error.response)
                let toast = {
                    isValidated:false,
                    title:'NOVO GRUPO DE PAUSA NÃO ADICIONADO',
                    message:'Novo Grupo de Pausa '+ body.name.toUpperCase()+' não pôde ser adicionado. Motivo: '+error.message,
                }
                this.validateAndToast(toast);
            })
        },
        updateRow(row){
            console.log(row)
            let editGroup = this.editRowInput.grupo.trim();
            if(editGroup.length>0){ // checando se o nome não está em branco
                /* Atualizando Fila e Pausas com dados editados */
                let body = {};
                body.name = this.editRowInput.grupo.trim();
                body.id = this.editRowInput.id;
                let groups = [];
                for(let i in this.editRowInput.ativas){
                    let pausa = {};
                    if(this.editRowInput.ativas[i]){
                        let iID = this.pausasList[0].pausas.indexOf(this.editRowInput.pausas[i]) + 1;
                        pausa.id = this.pausasList[iID].id;
                        pausa.name = this.pausasList[iID].pausa;
                        groups.push(pausa)
                    }
                    else continue;
                }
                body.groups = [...groups];
                console.log("Body @updateRow():\n",body);
                this.putEditedRow(body,body.id,row);
            }
            else{
                this.editRowInput = {...this.newRowDefault};

                let toast = {
                        isValidated:false,
                        title:'GRUPO DE PAUSAS NÃO EDITADO',
                        message:'Grupo de Pausas '+editGroup.toUpperCase()+' não foi modificado. Não é possível atualizar um Grupo de Pausas apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
                    }
                this.validateAndToast(toast);
            }
            
        },
        cancelEdit(row){
            this.editRowInput = {...this.newRowDefault};
            let p = this.grupos[row].grupo;
            let toast = {
                isValidated:false,
                title:'GRUPO DE PAUSAS NÃO EDITADO',
                message:'Grupo de Pausas '+p.toUpperCase()+' não foi modificado. A edição foi cancelada pelo usuário.',
            };
            this.validateAndToast(toast);
        },
        populateEditLine(row){
            this.editRowInput = {...this.grupos[row]};
            this.editRowInput.id = this.grupos[row].id;
        },
        putEditedRow(body, id, row){
            axios.put(baseApiUrl+'/breaksGroups/'+id, body)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText)
                let toast = {
                        isValidated:true,
                        title:'GRUPO DE PAUSAS EDITADO',
                        message:'Grupo de Pausas '+body.name.toUpperCase()+' editado com sucesso!',
                    }
                this.validateAndToast(toast);
                this.grupos.splice(row,1,{...this.editRowInput});
                this.gruposNames.splice(row,1,this.editRowInput.grupo);
                this.editRowInput = {...this.newRowDefault};
            })
            .catch(error => {
                console.log("\n\tERROR RESPONSE:\n",error.response)
                let toast = {
                    isValidated:false,
                    title:'GRUPO DE PAUSAS NÃO EDITADO',
                    message:'O Grupo de Pausas '+ body.name.toUpperCase()+' não pôde ser editado. Motivo: '+error.message,
                }
                this.validateAndToast(toast);
                this.editRowInput = {...this.newRowDefault};
            })
        },
        setNewRowDefault(){
            let newRow = {};
            let pausas = [];
            let ativas = [];

            newRow.grupo = '';
            
            for(let i in this.pausasList[0].pausas){
                pausas.push(this.pausasList[0].pausas[i]);
                ativas.push(false);
            }
            newRow.pausas = [...pausas];
            newRow.ativas = [...ativas];
            console.log("\nNew Row Default:\n",newRow)
            this.newRowDefault = {...newRow};
        }
    },
    created(){
        this.setNewRowDefault();
        this.newRowInput = Object.assign({},this.newRowDefault);
        this.editRowInput = Object.assign({},this.newRowDefault);
    },
    watch:{
        isLoading(newValue, oldValue){
          console.log("WATCHING PROP 'isLoading'...\n","\tisLoading OLD:\t",oldValue,"\n\tisLoading NEW:\t",newValue);
          this.busy = newValue;
          console.log("Items PROP:\n",this.items);
        },
        items(newValue, oldValue){
          console.log("WATCHING PROP 'items'...\n","\titems OLD:\t",oldValue,"\n\titems NEW:\t",newValue);
          this.grupos = newValue.slice(1,newValue.length);
          this.gruposNames = newValue[0].grupos;
        }
    },
    mounted(){
    },
    data(){
        return {
            busy:this.isLoading,
            grupos: this.items.slice(1,this.items.length),
            gruposNames: this.items[0].grupos,
            // thisAtivas: [],
            editRowInput: null, 
            newRowDefault:null,
            editIcon: '<span class="fal fa-pencil"/>',
            deleteIcon: '<span class="fal fa-trash-alt"/>',
            // pausas: this.items[0].pausas,
            icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
                    {value:'i2', html:'<span class="fal fa-plus"/>'},
                    {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
                    {value:'i4', html:'<span class="fal fa-abacus"/>'}],
            fields: [
                {
                    key:'grupo',
                    label: 'Nome do Grupo de Pausas',
                    sortable: true,
                },
                {
                    key:'action',
                    label: '<span class="fal fa-plus fa-1x head-add-button"/>',
                    sortable: false
                }
            ],
            
        }
    }
}
</script>

<style >
div#novo_grupo_pausa{
    margin-bottom: 2rem;
}
.grey-bg{
    background-color: rgba(0,0,0,0.05);
}
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
    /* padding-left: 2px !important;
    padding-right: 2px !important; */
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


.tabela-grupo-pausas > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-grupo-pausas > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px;
padding-right: calc(0.3rem + 0.65em);
}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=none], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=descending], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-grupo-pausas > .table.b-table > thead > tr > .table-b-table-default {
background-color: #0d6d9d !important;
color:#fff !important;
border-color: #0d6d9d !important;
align-items: center !important;
align-content: center !important;
text-align: center;
vertical-align: middle !important;
}

.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="2"], .tabela-grupo-pausas > .table.b-table > thead > tr >[aria-colindex="2"]{
    width: 8%;
    text-align: center;
}
.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    /* width: 94%; */
    text-align: left !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
    display: none !important;
}
</style>