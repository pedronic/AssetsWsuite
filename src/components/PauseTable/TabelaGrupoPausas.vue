<template>
    <div class="pausas">
        <b-table id="tabela-grupo-pausas" :ref="'tabela-de-pausas'" class="tabela-grupo-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="grupos" :responsive="true" :fields="fields" sticky-header sort-icon-left :filter="filter" filter-debounce="50" :filter-included-fields="['grupo']">
            <template v-slot:head(grupo)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(action)="data"> 
                <span>{{data.label}}</span>
            </template>
            
            
            <template v-slot:cell(grupo)="slot">
                <span :id="'_grupo'">{{slot.value}}</span>
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
            :title="'Editar Grupo de Pausas: '+i.grupo"
            size="xl"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            :lazy="true"
            cancel-title="CANCELAR" 
            cancel-variant="danger"
            ok-title="SALVAR"
            ok-variant="info" 
            @ok="updateRow($event,i)"
            @cancel="cancelEdit(index)"
            @show="populateEditLine(index)"
            >
            <b-container fluid>
                    <b-col cols="12">
                        <b-row id="novo_grupo_pausa">
                            <b-col cols="12">
                                <b-form-input v-model="editRowInput.grupo" :id="'new_row_group'" type="text"  placeholder="Nome do Novo Grupo de Pausas"/>
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
                                       <b-form-checkbox v-model="editRowInput.ativas[index]" :key="index" :id="p  +'_edit_row_ativa'" :value="true" :unchecked-value="false"/>
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
                @ok="deleteRow(i.grupo)"
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
                                       <b-form-checkbox v-model="newRowInput.ativas[index]" :id="p  +'_new_row_ativa'" :value="true" :unchecked-value="false"/>
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

const pausasDefault={
                grupo:'',
                pausas:['Banheiro', 'Lanche', 'NR', 'Treinamento'],
                ativas:[false,false,false,false],
            };

export default {
    name:'TabelaGrupoPausas',
    mixins: [ValidateToaster],
    props:{
        items: Array,
        filter: String,
    },
    methods: {
        deleteRow(g){ //recebe nome do grupo e apaga da lista de grupos de pausas local
            const i = this.gruposNames.indexOf(g);
            this.gruposNames.splice(i,1);
            this.grupos.splice(i,1);
            let toast = {
                isValidated:true,
                title:'GRUPO DE PAUSAS EXCLUÍDO',
                message:'Grupo de Pausas '+g.toUpperCase()+' excluído com sucesso!',
            }
            this.validateAndToast(toast);
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
                this.grupos.push(Object.assign({},this.newRowInput));
                this.gruposNames.push(newPausa);
                this.newRowInput = {...this.newRowDefault};
                for (let a in this.newRowInput.ativas) this.newRowInput.ativas[a] = false;
                let toast = {
                    isValidated:true,
                    title:'NOVO GRUPO DE PAUSAS ADICIONADO',
                    message:'Grupo de Pausas '+newPausa.toUpperCase()+' adicionado com sucesso!',
                }
                this.validateAndToast(toast);
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
        populateEditLine(row){
            this.editRowInput = {...this.grupos[row]};
            this.thisAtivas = [...this.grupos[row].ativas]; // backup do array de estado das pausas
        },
        updateRow(ev,row){
            let newPausa = this.editRowInput.grupo.trim();
            if(newPausa.length>0){ // checando se o nome não está em branco
                /* Atualizando Fila e Pausas com dados editados */
                this.grupos.splice(row,1,{...this.editRowInput});
                this.gruposNames.splice(row,1,newPausa);
                this.editRowInput = {...this.newRowDefault};

                let toast = {
                        isValidated:true,
                        title:'GRUPO DE PAUSAS EDITADO',
                        message:'Grupo de Pausas '+newPausa.toUpperCase()+' editado com sucesso!',
                    }
                this.validateAndToast(toast);
            }
            else{
                this.editRowInput = {...this.newRowDefault};

                let toast = {
                        isValidated:false,
                        title:'GRUPO DE PAUSAS NÃO EDITADO',
                        message:'Grupo de Pausas '+newPausa.toUpperCase()+' não foi modificado. Não é possível atualizar um Grupo de Pausas apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
                    }
                this.validateAndToast(toast);
            }
            
        },
        cancelEdit(row){
            this.editRowInput = {...this.newRowDefault};
            for(let a in this.editRowInput.ativas) this.editRowInput.ativas[a] = false;
            for(let at in this.thisAtivas) this.grupos[row].ativas.splice(at,1,this.thisAtivas[at]);
            
            let p = this.grupos[row].grupo;
            let toast = {
                isValidated:false,
                title:'GRUPO DE PAUSAS NÃO EDITADO',
                message:'Grupo de Pausas '+p.toUpperCase()+' não foi modificado. A edição foi cancelada pelo usuário.',
            };
            this.validateAndToast(toast);
        }
    },
    created(){
        this.getGrupos = function(){
            let g =[];
            for (let i in this.items){
                g.push(this.items[i].grupo);
            }
            return g;
        },
        // this.grupos = this.items;
        this.gruposNames = this.getGrupos();
        this.gruposDePausas = [...this.grupos];
        this.newRowDefault = {...pausasDefault};
        this.newRowInput = Object.assign({},this.newRowDefault);
    },
    watch:{
        // grupos(newValue){
        //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
        // }
    },
    mounted(){
        // this.grupos = JSON.parse(localStorage.getItem('__pedro-dev'));
    },
    data(){
        return {
            grupos: this.items,
            thisAtivas: [],
            editRowInput: Object.assign({},this.newRowDefault),
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
                    label: 'Ação',
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