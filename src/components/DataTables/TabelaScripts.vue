<template>
  <div class="pausas">
    <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields"
             :filter="filter"
             filter-debounce="50"
             :filter-included-fields="filter_fields"
             sticky-header>
      <template v-slot:head(script)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(criado_em)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(MCDU)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(status)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(add)="data">
        <b-button class="head-add-button btn-success"  v-b-modal="'new_line'" variant="outline-dark">
          <span v-html="data.label" class="head-add-button"/>
        </b-button>
      </template>

      <template v-slot:cell(script)="slot">
        <span :id="(slot.item.script)+'_pausa'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(nome)="slot" >
        <span :id="(slot.item.script)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(email)="slot">
        <span :id="(slot.item.script)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(perfil)="slot">
        <span :id="(slot.item.script)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(limite)="slot">
        <span :id="(slot.item.script)+'_limite'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(icone)="slot">
        <span :id="(slot.item.script)+'_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(status)="slot">
        <b-form-checkbox v-model="slot.value" :id="(slot.item.script)+'_ativa'" :value="true" :unchecked-value="false" switch disabled/>
      </template>
      <template v-slot:cell(add)="slot">
        <b-button :id="(slot.item.script)+'_edit'" class="edit-btn" variant="outline"  v-b-modal="(slot.item.script)+'_edit_modal'"  v-html="editIcon"/>
        <b-btn :id="(slot.item.script)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.script + '_delete'"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.script+'_edit'">
      <b-modal
          :id="i.script+'_edit_modal'"
          :ref="i.script+'_edit_modal'"
          title="Editar Pausa"
          size="xl"
          :hide-header-close="true"
          :no-close-on-backdrop="true"
          :no-close-on-esc="true"
          :lazy="true"
          ok-title="SALVAR"
          ok-variant="info"
          cancel-title="CANCELAR"
          cancel-variant="danger"
          @ok="updateRow(index)"
          @cancel="cancelEdit(index)"
          @show="populateEditLine(index)"
      >
        <b-container fluid>
          <b-col cols="14">
            <b-row>
              <b-col cols="6" class="nome-head-container">
                <span class="nome-head">Nome</span>
              </b-col>
              <b-col cols="4" class="perfil-head-container">
                <span class="perfil-head">MCDU</span>
              </b-col>
              <b-col cols="2" class="status-head-container">
                <span class="status-head">Status</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="script-body-container">
                <b-form-input v-model="editRowInput.script" :presentState="i" :id="i.script+'_edit_row_pausa'" :ref="i.script+'_edit_row_pausa'" type="text" />
              </b-col>
              <b-col cols="4" class="perfil-body-container">
                <b-form-input v-model="editRowInput.MCDU" :presentState="i" :id="i.script+'_edit_row_alerta'" type="text"></b-form-input>
              </b-col>
              <b-col cols="2" class="status-body-container">
                <b-form-checkbox v-model="editRowInput.status" :presentState="i" :id="i.script+'_edit_row_ativa'" :value="true" :unchecked-value="false" switch />
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
          :id="i.script+'_delete'"
          title="ATENÇÃO!!!"
          :hide-header-close="false"
          :no-close-on-backdrop="false"
          :no-close-on-esc="false"
          :lazy="true"
          ok-title="EXCLUIR"
          ok-variant="danger"
          cancel-title="MANTER"
          cancel-variant="success"
          @ok="deleteRow(i.script)"
          @cancel="cancelDelete(i.script)">
        Tem certeza que deseja excluir a script <b>{{i.script}}</b>?
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
        @ok="okayAdd()"
        @cancel="cancelAdd()"
        @show="populateNewLine()">
      <b-container fluid>
        <b-col cols="12">
          <b-row>
           
            <b-col cols="4" class="nome-head-container">
              <span class="nome-head">Nome</span>
            </b-col>
            <b-col cols="3" class="perfil-head-container">
              <span class="perfil-head">Criado em</span>
            </b-col>
            <b-col cols="3" class="perfil-head-container">
              <span class="perfil-head">MCDU</span>
            </b-col>
            <b-col cols="2" class="status-head-container">
              <span class="status-head">Status</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="script-body-container">
              <b-form-input v-model="newRowInput.script" :id="'new_row_pausa'" type="text"></b-form-input>
            </b-col>
            <b-col cols="3" class="script-body-container">
              <b-form-input v-model="newRowInput.criado_em" :id="'new_row_pausa'" type="text"></b-form-input>
            </b-col>
            <b-col cols="3" class="email-body-container" >
              <b-form-input v-model="newRowInput.MCDU" :id="'new_row_obrigatoria'" type="text"/>
            </b-col>
            <b-col cols="2" class="status-body-container">
              <b-form-checkbox v-model="newRowInput.status" :id="'new_row_ativa'" :value="true" :unchecked-value="false" switch />
            </b-col>
          </b-row>
        </b-col>
      </b-container>
    </b-modal>
    <!-- MODAL PARA CRIAR NOVA LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
  </div>
</template>

<script>
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)

const defaultRow = {
  script:'',
  nome: false,
  email: false,
  perfil:'',
  limite: '',
  icone: '',
  status: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name:'TabelaPausas',
  mixins: [ValidateToaster],
  props:{
    items: Array,
    filter:String,
    filter_fields:Array,
  },
  methods: {
    deleteRow(ev){
      const p = this.scripts.indexOf(ev);
      this.filas.splice(p,1);
      this.scripts.splice(p,1);
      let toast = {
        isValidated:true,
        title:'USUÁRIO EXCLUÍDO',
        message:'Usuário '+ev.toUpperCase()+' excluído com sucesso!',
      }
      this.validateAndToast(toast);
    },
    cancelDelete(p){
      let toast = {
        isValidated:false,
        title:'USUÁRIO MANTIDO',
        message:'Usuário '+p.toUpperCase()+' foi mantido. A exclusão foi cancelada.',
      };
      this.validateAndToast(toast);
    },
    okayAdd(){
      let newPausa = this.newRowInput.script.trim();
      if (newPausa.length>0){
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({},this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated:true,
          title:'NOVO USUÁRIO ADICIONADA',
          message:'Novo usuário '+newPausa.toUpperCase()+' adicionado com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        let toast = {
          isValidated:false,
          title:'NOVO USUÁRIO VAZIO NÃO ADICIONADA',
          message:'Nova Pausa '+newPausa.toUpperCase()+' não foi adicionada. Não é possível adicionar Pausas sem nome ou com o nome em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }

    },
    cancelAdd(){
      let newPausa = this.newRowInput.script.trim();
      let toast = {
        isValidated:false,
        title:'NOVA PAUSA NÃO ADICIONADA',
        message:'Nova Pausa '+newPausa.toUpperCase()+' não foi adicionada. A operação de adicionar foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    },
    populateEditLine(i){
      this.editRowInput = {...this.filas[i]};
    },
    populateNewLine(){
      this.newRowInput = {...this.newRowDefault}
    },
    updateRow(row){
      let p = this.editRowInput.script.trim();

      if(p.length > 0){ // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row,1,{...this.editRowInput});
        this.pausas.splice(row,1, p);
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:true,
          title:'PAUSA EDITADA',
          message:'Pausa '+p.toUpperCase()+' editada com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:false,
          title:'PAUSA NÃO EDITADA',
          message:'Pausa '+p.toUpperCase()+' não foi modificada. Não é possível atualizar uma Pausa apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row){
      this.editRowInput = {...this.newRowDefault};
      let p = this.filas[row].script;
      let toast = {
        isValidated:false,
        title:'PAUSA NÃO EDITADA',
        message:'Pausa '+p.toUpperCase()+' não foi modificada. A edição foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    }
  },
  created(){
    this.newRowDefault = {...defaultRow};
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    localStorage.setItem('__pedro-dev', JSON.stringify(this.items.slice(1,this.items.length)));
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
      newRowInput: Object.assign({},this.newRowDefault),
      editRowInput: Object.assign({},this.newRowDefault),
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      scripts: this.items[0].scripts,
      icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
        {value:'i2', html:'<span class="fal fa-plus"/>'},
        {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
        {value:'i4', html:'<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key:'script',
          label: 'Nome',
        },
        {
          key:'criado_em',
          label: 'Criado em:'
        },
        {
          key:'MCDU',
          label: 'MCDU'
        },

        {
          key:'status',
          label: 'Status'
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

.script-head-container, .nome-head-container, .email-head-container, .perfil-head-container, .limite-head-container, .icone-head-container, .status-head-container{
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.script-head {
  background-color: #0d6d9d !important;
  color:#fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.nome-head, .email-head, .perfil-head, .limite-head, .icone-head, .status-head{
  background-color: #0d6d9d !important;
  color:#fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center !important;
}


.script-body-container, .nome-body-container, .email-body-container, .perfil-body-container, .limite-body-container, .icone-body-container, .status-body-container {
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
  width: 4%;
  text-align: center;
  justify-content: center;
  display: table-cell;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],[aria-colindex="4"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="5"],[aria-colindex="4"]{
  width: 7%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],[aria-colindex="2"], .tabela-pausas > .table.b-table > thead > tr >[aria-colindex="3"],[aria-colindex="2"]{
  width: 15%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
  width: 29%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
  text-align: left !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}
</style>