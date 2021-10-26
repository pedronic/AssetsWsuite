<template>
  <div class="pausas">
    <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields"
             :filter="filter"
             filter-debounce="50"
             :filter-included-fields="filter_fields"
             sticky-header>
      <template v-slot:head(subido)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(data_importacao)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(usuario)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(add)="data">
        <b-button class="head-add-button btn-success"  v-b-modal="'new_line'" variant="outline-dark">
          <span v-html="data.label" class="head-add-button"/>
        </b-button>
      </template>

      <template v-slot:cell(subido)="slot">
        <span :id="(slot.item.subido)+'_pausa'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(nome)="slot" >
        <span :id="(slot.item.subido)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(email)="slot">
        <span :id="(slot.item.subido)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(documento)="slot">
        <span :id="(slot.item.subido)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(limite)="slot">
        <span :id="(slot.item.subido)+'_limite'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(icone)="slot">
        <span :id="(slot.item.subido)+'_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(status)="slot">
        <b-form-checkbox v-model="slot.value" :id="(slot.item.subido)+'_ativa'" :value="true" :unchecked-value="false" switch disabled/>
      </template>
      <template v-slot:cell(add)="slot">
        <b-button :id="(slot.item.subido)+'_edit'" class="edit-btn" variant="outline"  v-b-modal="(slot.item.subido)+'_edit_modal'"  v-html="editIcon"/>
        <b-btn :id="(slot.item.subido)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.subido + '_delete'"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.subido+'_edit'">
      <b-modal
          :id="i.subido+'_edit_modal'"
          :ref="i.subido+'_edit_modal'"
          title="Editar Arquivo"
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
              <b-col cols="4" class="subido-head-container">
                <span class="subido-head">Arquivo</span>
              </b-col>
              <b-col cols="2" class="nome-head-container">
                <span class="nome-head">Data de importação</span>
              </b-col>
              <b-col cols="2" class="email-head-container">
                <span class="email-head">Usuário</span>
              </b-col>
              
            </b-row>
            <b-row>
              <b-col cols="4" class="subido-body-container">
                <!-- <b-form-file
     v-model="editRowInput.subido"
      :state="Boolean(editRowInput.subido)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept="txt, csv"
    ></b-form-file> -->
                <b-form-input v-model="editRowInput.subido" :presentState="i" :id="i.subido+'_edit_row_pausa'" :ref="i.subido+'_edit_row_pausa'" type="file" accept="txt, csv" />
              </b-col>
              <b-col cols="2" class="nome-body-container" >
                <b-form-input v-model="editRowInput.data_importacao" :presentState="i" :id="i.subido+'_edit_row_produtiva'" type="text" />
              </b-col>
              <b-col cols="2" class="email-body-container" >
                <b-form-input v-model="editRowInput.usuario" :presentState="i" :id="i.subido+'_edit_row_obrigatoria'" type="text"/>
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
          :id="i.subido+'_delete'"
          title="ATENÇÃO!!!"
          :hide-header-close="false"
          :no-close-on-backdrop="false"
          :no-close-on-esc="false"
          :lazy="true"
          ok-title="EXCLUIR"
          ok-variant="danger"
          cancel-title="MANTER"
          cancel-variant="success"
          @ok="deleteRow(i.subido)"
          @cancel="cancelDelete(i.subido)">
        Tem certeza que deseja excluir o subido <b>{{i.subido}}</b>?
      </b-modal>
    </div>
    <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
    <b-modal
        id="new_line"
        refs="new_line"
        title="Adicionar Novo Arquivo"
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
            <b-col cols="4" class="subido-head-container">
              <span class="subido-head">Arquivo</span>
            </b-col>
            <b-col cols="2" class="nome-head-container">
              <span class="nome-head">Data de importação</span>
            </b-col>
            <b-col cols="2" class="email-head-container">
              <span class="email-head">Usuário</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="subido-body-container">
              <b-form-input v-model="newRowInput.subido" :id="'new_row_pausa'" type="file" accept="txt, csv"></b-form-input>
            </b-col>
            <b-col cols="2" class="nome-body-container" >
              <b-form-input v-model="newRowInput.data_importacao" :id="'new_row_produtiva'" type="text"/>
            </b-col>
            <b-col cols="2" class="email-body-container" >
              <b-form-input v-model="newRowInput.usuario" :id="'new_row_obrigatoria'" type="text"/>
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
  subido:'',
  nome: false,
  email: false,
  documento:'',
  limite: '',
  icone: '',
  status: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name:'TabelaBlacklist',
  mixins: [ValidateToaster],
  props:{
    items: Array,
    filter:String,
    filter_fields:Array,
  },
  methods: {
    deleteRow(ev){
      const p = this.subidos.indexOf(ev);
      this.filas.splice(p,1);
      this.subidos.splice(p,1);
      let toast = {
        isValidated:true,
        title:'AQUIVO EXCLUÍDO',
        message:'Arquivo '+ev.toUpperCase()+' excluído com sucesso!',
      }
      this.validateAndToast(toast);
    },
    cancelDelete(p){
      let toast = {
        isValidated:false,
        title:'ARQUIVO MANTIDO',
        message:'Arquivo '+p.toUpperCase()+' foi mantido. A exclusão foi cancelada.',
      };
      this.validateAndToast(toast);
    },
    okayAdd(){
      let newPausa = this.newRowInput.subido.trim();
      if (newPausa.length>0){
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({},this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated:true,
          title:'NOVO ARQUIVO ADICIONADO',
          message:'Novo arquivo '+newPausa.toUpperCase()+' adicionado com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        let toast = {
          isValidated:false,
          title:'NOVO ARQUIVO NÃO ADICIONADO',
          message:'Novo Arquivo '+newPausa.toUpperCase()+' não foi adicionado. Não é possível adicionar arquivos sem nome ou com o nome em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }

    },
    cancelAdd(){
      let newPausa = this.newRowInput.subido.trim();
      let toast = {
        isValidated:false,
        title:'NOVO ARQUIVO NÃO ADICIONADA',
        message:'Novo arquivo '+newPausa.toUpperCase()+' não foi adicionado. A operação de adicionar foi cancelada pelo usuário.',
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
      let p = this.editRowInput.subido.trim();

      if(p.length > 0){ // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row,1,{...this.editRowInput});
        this.pausas.splice(row,1, p);
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:true,
          title:'ARQUIVO EDITADO',
          message:'Arquivo '+p.toUpperCase()+' editado com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:false,
          title:'ARQUIVO NÃO EDITADO',
          message:'Arquivo '+p.toUpperCase()+' não foi modificado. Não é possível atualizar um arquivo apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row){
      this.editRowInput = {...this.newRowDefault};
      let p = this.filas[row].subido;
      let toast = {
        isValidated:false,
        title:'ARQUIVO NÃO EDITADA',
        message:'Arquivo '+p.toUpperCase()+' não foi modificado. A edição foi cancelada pelo usuário.',
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
      subidos: this.items[0].subidos,
      icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
        {value:'i2', html:'<span class="fal fa-plus"/>'},
        {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
        {value:'i4', html:'<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key:'subido',
          label: 'Arquivo',
        },
        {
          key:'data_importacao',
          label: 'Data de importação'
        },
        {
          key:'usuario',
          label: 'Usuário'
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

.subido-head-container, .nome-head-container, .email-head-container, .documento-head-container, .limite-head-container, .icone-head-container, .status-head-container{
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.subido-head {
  background-color: #0d6d9d !important;
  color:#fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.nome-head, .email-head, .documento-head, .limite-head, .icone-head, .status-head{
  background-color: #0d6d9d !important;
  color:#fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center !important;
}


.subido-body-container, .nome-body-container, .email-body-container, .documento-body-container, .limite-body-container, .icone-body-container, .status-body-container {
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
  width: 3%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],[aria-colindex="2"], .tabela-pausas > .table.b-table > thead > tr >[aria-colindex="3"],[aria-colindex="2"]{
  width: 10%;
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