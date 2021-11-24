<template>
  <div class="pausas">
    <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields"
             :filter="filter"
             filter-debounce="50"
             :filter-included-fields="filter_fields"
             sticky-header
             :per-page="10"
             :busy="busy">
      <template v-slot:head(DDD)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(cadastrado)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(data_inclusao)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(usuario)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(fila)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(add)="data">
        <!-- <b-button class="head-add-button btn-success"  v-b-modal="'new_line'" variant="outline-dark">
          <span v-html="data.label" class="head-add-button"/>
        </b-button> -->
        <b-button class="head-add-button btn-success" variant="outline-dark" :to="{name:'RegistroBlacklist', params:{bID:-1}}" :disabled="permissions.add">
          <span v-html="data.label" class="head-add-button"/>
        </b-button>
      </template>

      <template v-slot:cell(DDD)="slot">
        <span :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_ddd'">{{slot.item.DDD}}</span>
      </template>
      <template v-slot:cell(cadastrado)="slot">
        <span :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_cadastrado'">{{slot.item.cadastrado}}</span>
      </template>
      <template v-slot:cell(data_inclusao)="slot" >
        <span :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_created'">{{slot.item.data_inclusao}}</span>
      </template>
      <template v-slot:cell(usuario)="slot">
        <span :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_user'">{{slot.item.usuario}}</span>
      </template>
      <template v-slot:cell(fila)="slot">
        <span :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_fila'">{{slot.item.fila}}</span>
      </template>
      <!-- <template v-slot:cell(limite)="slot">
        <span :id="(slot.item.cadastrado)+'_limite'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(icone)="slot">
        <span :id="(slot.item.cadastrado)+'_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(fila)="slot">
        <b-form-checkbox v-model="slot.item.fila" :id="(slot.item.cadastrado)+'_ativa'" :value="true" :unchecked-value="false" switch disabled/>
      </template> -->
      <template v-slot:cell(add)="slot">
        <b-btn :id="(slot.item.cadastrado)+'_'+(slot.item.id)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.cadastrado + '_delete'" :disabled="permissions.delete"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.cadastrado+'_'+(i.id)+'_edit'">
      <b-modal
          :id="i.cadastrado+'_edit_modal'"
          :ref="i.cadastrado+'_edit_modal'"
          title="Editar Blacklist"
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
              <b-col cols="4" class="cadastrado-head-container">
                <span class="cadastrado-head">Login</span>
              </b-col>
              <b-col cols="2" class="nome-head-container">
                <span class="nome-head">Nome</span>
              </b-col>
              <b-col cols="2" class="email-head-container">
                <span class="email-head">Email</span>
              </b-col>
              <b-col cols="1" class="documento-head-container">
                <span class="documento-head">Documento</span>
              </b-col>
              <b-col cols="1" class="status-head-container">
                <span class="status-head">Status</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4" class="cadastrado-body-container">
                <b-form-input v-model="editRowInput.cadastrado" :presentState="i" :id="i.cadastrado+'_edit_row_pausa'" :ref="i.cadastrado+'_edit_row_pausa'" type="text" />
              </b-col>
              <b-col cols="2" class="nome-body-container" >
                <b-form-input v-model="editRowInput.nome" :presentState="i" :id="i.cadastrado+'_edit_row_produtiva'" type="text" />
              </b-col>
              <b-col cols="2" class="email-body-container" >
                <b-form-input v-model="editRowInput.email" :presentState="i" :id="i.cadastrado+'_edit_row_obrigatoria'" type="text"/>
              </b-col>
              <b-col cols="1" class="documento-body-container">
                <b-form-input v-model="editRowInput.documento" :presentState="i" :id="i.cadastrado+'_edit_row_alerta'" type="text"></b-form-input>
              </b-col>
              <b-col cols="1" class="status-body-container">
                <b-form-checkbox v-model="editRowInput.status" :presentState="i" :id="i.cadastrado+'_edit_row_ativa'" :value="true" :unchecked-value="false" switch />
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
          :id="i.cadastrado+'_delete'"
          title="ATENÇÃO!!!"
          :hide-header-close="false"
          :no-close-on-backdrop="false"
          :no-close-on-esc="false"
          :lazy="true"
          ok-title="EXCLUIR"
          ok-variant="danger"
          cancel-title="MANTER"
          cancel-variant="success"
          @ok="deleteRow(i.cadastrado)"
          @cancel="cancelDelete(i.cadastrado)">
        Tem certeza que deseja excluir o cadastrado <b>{{i.cadastrado}}</b>?
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
            <b-col cols="1" class="cadastrado-head-container">
              <span class="cadastrado-head">DDD</span>
            </b-col>
            <b-col cols="2" class="nome-head-container">
              <span class="nome-head">Telefone</span>
            </b-col>
            <b-col cols="2" class="email-head-container">
              <span class="email-head">Data Inclusão</span>
            </b-col>
            <b-col cols="2" class="email-head-container">
              <span class="email-head">Usuário</span>
            </b-col>
            <b-col cols="1" class="status-head-container">
              <span class="status-head">Status</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="1" class="nome-body-container" >
              <b-form-input v-model="newRowInput.DDD" :id="'new_row_produtiva'" type="text"/>
            </b-col>
            <b-col cols="2" class="cadastrado-body-container">
              <b-form-input v-model="newRowInput.cadastrado" :id="'new_row_pausa'" type="text"></b-form-input>
            </b-col>
            <b-col cols="2" class="email-body-container" >
              <b-form-input v-model="newRowInput.data_inclusao" :id="'new_row_obrigatoria'" type="text"/>
            </b-col>
            <b-col cols="2" class="documento-body-container">
              <b-form-input v-model="newRowInput.usuario" :id="'new_row_alerta'" type="text"></b-form-input>
            </b-col>
            <b-col cols="1" class="status-body-container">
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
  cadastrado:'',
  nome: false,
  email: false,
  documento:'',
  limite: '',
  icone: '',
  status: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name:'TabelaBlacklist2',
  mixins: [ValidateToaster],
  props:{
    items: Array,
    filter:String,
    filter_fields:Array,
    isLoading:{type:Boolean, default:false},
    permissions: {
      add: {type:Boolean, default:false},
      edit: {type:Boolean, default:false},
      delete: {type:Boolean, default:false}
    }
  },
  methods: {
    deleteRow(ev){
      const p = this.cadastrados.indexOf(ev);
      this.filas.splice(p,1);
      this.cadastrados.splice(p,1);
      let toast = {
        isValidated:true,
        title:'BLACKLIST EXCLUÍDO',
        message:'Blacklist '+ev.toUpperCase()+' excluído com sucesso!',
      }
      this.validateAndToast(toast);
    },
    cancelDelete(p){
      let toast = {
        isValidated:false,
        title:'BLACKLIST MANTIDO',
        message:'Blacklist '+p.toUpperCase()+' foi mantida. A exclusão foi cancelada.',
      };
      this.validateAndToast(toast);
    },
    okayAdd(){
      let newPausa = this.newRowInput.cadastrado.trim();
      if (newPausa.length>0){
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({},this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated:true,
          title:'NOVA BLACKLIST ADICIONADA',
          message:'Nova blacklist '+newPausa.toUpperCase()+' adicionada com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        let toast = {
          isValidated:false,
          title:'NOVA BLACKLIST VAZIA NÃO ADICIONADA',
          message:'Nova Blacklist '+newPausa.toUpperCase()+' não foi adicionada. Não é possível adicionar blacklists sem nome ou com o nome em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }

    },
    cancelAdd(){
      let newPausa = this.newRowInput.cadastrado.trim();
      let toast = {
        isValidated:false,
        title:'NOVA BLACKLIST NÃO ADICIONADA',
        message:'Nova Blacklist '+newPausa.toUpperCase()+' não foi adicionada. A operação de adicionar foi cancelada pelo usuário.',
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
      let p = this.editRowInput.cadastrado.trim();

      if(p.length > 0){ // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row,1,{...this.editRowInput});
        this.pausas.splice(row,1, p);
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:true,
          title:'BLACKLIST EDITADA',
          message:'Blacklist '+p.toUpperCase()+' editado com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:false,
          title:'BLACKLIST NÃO EDITADA',
          message:'Blacklist '+p.toUpperCase()+' não foi modificada. Não é possível atualizar uma blacklist apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row){
      this.editRowInput = {...this.newRowDefault};
      let p = this.filas[row].cadastrado;
      let toast = {
        isValidated:false,
        title:'BLACKLIST NÃO EDITADA',
        message:'Blacklist '+p.toUpperCase()+' não foi modificada. A edição foi cancelada pelo usuário.',
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
    isLoading(newValue, oldValue){
      console.log("WATCHING PROP 'isLoading'...\n","\tisLoading OLD:\t",oldValue,"\n\tisLoading NEW:\t",newValue);
      this.busy = newValue;
      console.log("Items PROP:\n",this.items);
    },
    items(newValue, oldValue){
      console.log("WATCHING PROP 'items'...\n","\titems OLD:\t",oldValue,"\n\titems NEW:\t",newValue);
      this.filas = newValue.slice(1,newValue.length);
      this.cadastrados = newValue[0].cadastrados;
    }
  },
  mounted(){
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  data(){
    return {
      busy:this.isLoading,
      filas: this.items.slice(1,this.items.length),
      newRowInput: Object.assign({},this.newRowDefault),
      editRowInput: Object.assign({},this.newRowDefault),
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      cadastrados: this.items[0].cadastrados,
      icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
        {value:'i2', html:'<span class="fal fa-plus"/>'},
        {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
        {value:'i4', html:'<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key:'DDD',
          label: 'DDD',
          sortable: true,
        },
        {
          key:'cadastrado',
          label: 'Telefone',
          sortable: true,
        },
        {
          key:'data_inclusao',
          label: 'Data Inclusão',
          sortable: true,
        },
        {
          key:'usuario',
          label: 'Usuário',
          sortable: true,
        },
        {
          key:'fila',
          label: 'Fila'
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

.cadastrado-head-container, .nome-head-container, .email-head-container, .documento-head-container, .limite-head-container, .icone-head-container, .status-head-container{
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.cadastrado-head {
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


.cadastrado-body-container, .nome-body-container, .email-body-container, .documento-body-container, .limite-body-container, .icone-body-container, .status-body-container {
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
  width: 1%;
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