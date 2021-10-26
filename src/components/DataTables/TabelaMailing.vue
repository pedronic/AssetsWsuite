<template>
  <div class="pausas">
    <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields"
             :filter="filter"
             filter-debounce="50"
             :filter-included-fields="filter_fields"
             sticky-header>
      <template v-slot:head(mailing)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(ID)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(data_importacao)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(data_agendamento)="data">
        <span>{{data.label}}</span>
      </template>
      <template v-slot:head(fila)="data">
        <span>{{data.label}}</span>
      </template> <template v-slot:head(mailing)="data">
      <span>{{data.label}}</span>
    </template> <template v-slot:head(registros_carregados)="data">
      <span>{{data.label}}</span>
    </template> <template v-slot:head(telefones_carregados)="data">
      <span>{{data.label}}</span>
    </template>
      <template v-slot:head(status)="data">
        <span>{{data.label}}</span>
      </template>

      <template v-slot:cell(mailing)="slot">
        <span :id="(slot.item.mailing)+'_pausa'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(nome)="slot" >
        <span :id="(slot.item.mailing)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(email)="slot">
        <span :id="(slot.item.mailing)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(perfil)="slot">
        <span :id="(slot.item.mailing)+'_alerta'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(limite)="slot">
        <span :id="(slot.item.mailing)+'_limite'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(icone)="slot">
        <span :id="(slot.item.mailing)+'_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(status)="slot">
        <b-form-checkbox v-model="slot.value" :id="(slot.item.mailing)+'_ativa'" :value="true" :unchecked-value="false" switch disabled/>
      </template>
      <template v-slot:cell(add)="slot">
        <b-button :id="(slot.item.mailing)+'_edit'" class="edit-btn" variant="outline"  v-b-modal="(slot.item.mailing)+'_edit_modal'"  v-html="editIcon"/>
        <b-btn :id="(slot.item.mailing)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.mailing + '_delete'"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
    <!-- ---------------------------------------------------- -->
  </div>
</template>

<script>
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)

const defaultRow = {
  mailing:'',
  nome: false,
  email: false,
  perfil:'',
  limite: '',
  icone: '',
  status: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name:'TabelaMailing',
  mixins: [ValidateToaster],
  props:{
    items: Array,
    filter:String,
    filter_fields:Array,
  },
  methods: {
    deleteRow(ev){
      const p = this.mailings.indexOf(ev);
      this.filas.splice(p,1);
      this.mailings.splice(p,1);
      let toast = {
        isValidated:true,
        title:'MAILING EXCLUÍDO',
        message:'Mailing '+ev.toUpperCase()+' excluído com sucesso!',
      }
      this.validateAndToast(toast);
    },
    cancelDelete(p){
      let toast = {
        isValidated:false,
        title:'MAILING MANTIDO',
        message:'Mailing '+p.toUpperCase()+' foi mantido. A exclusão foi cancelada.',
      };
      this.validateAndToast(toast);
    },
    okayAdd(){
      let newPausa = this.newRowInput.mailing.trim();
      if (newPausa.length>0){
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({},this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated:true,
          title:'NOVO MAILING ADICIONADA',
          message:'Novo mailing '+newPausa.toUpperCase()+' adicionado com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        let toast = {
          isValidated:false,
          title:'NOVO MAILING VAZIO NÃO ADICIONADA',
          message:'Nova Mailing '+newPausa.toUpperCase()+' não foi adicionada. Não é possível adicionar Pausas sem nome ou com o nome em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }

    },
    cancelAdd(){
      let newPausa = this.newRowInput.mailing.trim();
      let toast = {
        isValidated:false,
        title:'NOVA MAILING NÃO ADICIONADA',
        message:'Nova Mailing '+newPausa.toUpperCase()+' não foi adicionada. A operação de adicionar foi cancelada pelo usuário.',
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
      let p = this.editRowInput.mailing.trim();

      if(p.length > 0){ // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row,1,{...this.editRowInput});
        this.pausas.splice(row,1, p);
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:true,
          title:'MAILING EDITADA',
          message:'Mailing '+p.toUpperCase()+' editada com sucesso!',
        }
        this.validateAndToast(toast);
      }
      else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:false,
          title:'MAILING NÃO EDITADA',
          message:'Mailing '+p.toUpperCase()+' não foi modificada. Não é possível atualizar um mailing apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row){
      this.editRowInput = {...this.newRowDefault};
      let p = this.filas[row].mailing;
      let toast = {
        isValidated:false,
        title:'MAILNG NÃO EDITADA',
        message:'Mailing '+p.toUpperCase()+' não foi modificada. A edição foi cancelada pelo usuário.',
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
      mailings: this.items[0].mailings,
      icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
        {value:'i2', html:'<span class="fal fa-plus"/>'},
        {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
        {value:'i4', html:'<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key:'mailing',
          label: 'Nome Mailing',
        },
        {
          key:'ID',
          label: 'ID'
        },
        {
          key:'data_importacao',
          label: 'Data Importação'
        },
        {
          key:'data_agendamento',
          label: 'data_agendamento'
        },
        {
          key:'fila',
          label: 'Fila'
        },{
          key:'usuario',
          label: 'Usuário'
        },{
          key:'registros_carregados',
          label: 'Registros Carregados'
        },{
          key:'telefones_carregados',
          label: 'Telefones Carregados'
        },

        {
          key:'status',
          label: 'Status'
        },
        
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

.mailing-head-container, .nome-head-container, .email-head-container, .perfil-head-container, .limite-head-container, .icone-head-container, .status-head-container{
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.mailing-head {
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


.mailing-body-container, .nome-body-container, .email-body-container, .perfil-body-container, .limite-body-container, .icone-body-container, .status-body-container {
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
  width: 12%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],[aria-colindex="6"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="7"],[aria-colindex="6"]{
  width: 12%;
  text-align: center;
  justify-content: center;
  display: table-cell;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],[aria-colindex="4"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="5"],[aria-colindex="4"]{
  width: 12%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],[aria-colindex="2"], .tabela-pausas > .table.b-table > thead > tr >[aria-colindex="3"],[aria-colindex="2"]{
  width: 12%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
  width: 12%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
  text-align: left !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}
</style>