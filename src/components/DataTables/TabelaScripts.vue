<template>
  <div class="pausas">
    <b-table id="tabela-de-pausas" :ref="'tabela-de-pausas'" class="tabela-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields"
             :filter="filter"
             filter-debounce="50"
             :filter-included-fields="filter_fields"
             sticky-header
             :per-page="10">
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
      <template v-slot:cell(criado_em)="slot" >
        <span :id="(slot.item.script)+'_criado_em'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(MCDU)="slot">
        <span :id="(slot.item.script)+'_MCDU'">{{slot.value}}</span>
      </template>
      <template v-slot:cell(status)="slot">
        <b-form-checkbox v-model="slot.item.status" :id="(slot.item.script)+'_status'" :value="true" :unchecked-value="false" switch disabled/>
      </template>
      <template v-slot:cell(add)="slot">
        <b-button :id="(slot.item.script)+'_edit'" class="edit-btn" variant="outline"  v-b-modal="(slot.item.script)+'_edit_modal'"  v-html="editIcon"/>
        <b-btn :id="(slot.item.script)+'_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.script + '_delete'"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <div v-for="(i, index) in filas" :key="i.script+'_edit'">
      <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
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
                <b-form-input v-model="editRowInput.script" :id="i.script+'_edit_row_pausa'" :ref="i.script+'_edit_row_pausa'" type="text" />
              </b-col>
              <b-col cols="4" class="perfil-body-container">
                <b-form-input v-model="editRowInput.MCDU" :id="i.script+'_edit_row_alerta'" type="text"></b-form-input>
              </b-col>
              <b-col cols="2" class="status-body-container">
                <b-form-checkbox v-model="editRowInput.status" :id="i.script+'_edit_row_ativa'" :value="true" :unchecked-value="false" switch />
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
           
            <b-col cols="6" class="nome-head-container">
              <span class="nome-head">Nome</span>
            </b-col>
            <!-- <b-col cols="3" class="perfil-head-container">
              <span class="perfil-head">Criado em</span>
            </b-col> -->
            <b-col cols="4" class="perfil-head-container">
              <span class="perfil-head">MCDU</span>
            </b-col>
            <b-col cols="2" class="status-head-container">
              <span class="status-head">Status</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" class="script-body-container">
              <b-form-input v-model="newRowInput.script" :id="'new_row_pausa'" type="text"></b-form-input>
            </b-col>
            <!-- <b-col cols="3" class="script-body-container">
              <b-form-input v-model="newRowInput.criado_em" :id="'new_row_pausa'" type="text"></b-form-input>
            </b-col> -->
            <b-col cols="4" class="email-body-container" >
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
import axios from 'axios';
import {baseApiUrl, defaultScriptRow} from '../../config/global';

// const defaultScriptRow = {
//   script:'',
//   nome: false,
//   email: false,
//   perfil:'',
//   limite: '',
//   icone: '',
//   status: true,
//   add: '<span class="fal fa-trash-alt"/>',
// };

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
      this.deleteScript(p);
    },
    cancelDelete(p){
      let toast = {
        isValidated:false,
        title:'USUÁRIO MANTIDO',
        message:'Usuário '+p.toUpperCase()+' foi mantido. A exclusão foi cancelada.',
      };
      this.validateAndToast(toast);
    },
    deleteScript(id){
      let deleted = this.scripts[id];
      let sID = id.toString()
      axios.delete(baseApiUrl+'/scripts/'+sID)
      .then(res => {
        console.log("Status: " + res.status + " - " + res.statusText);
        let toast = {
          isValidated:true,
          title:'SCRIPT EXCLUÍDO',
          message:'Script '+deleted.toUpperCase()+' excluído com sucesso!',
        }
        this.validateAndToast(toast);
        this.filas.splice(id,1);
        this.scripts.splice(id,1);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE DATA:\n",error.response.data,"\n\tERROR RESPONSE STATUS:\n",error.response.status,"\n\tERROR MESSAGE:\n",error.message)
        let toast = {
          isValidated:false,
          title:'SCRIPT NÃO EXCLUÍDO',
          message:'Script '+ deleted.toUpperCase()+' não pôde ser excluído. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
      })
    },
    populateNewLine(){
      this.newRowInput = {...this.newRowDefault};
    },
    okayAdd(){
      let newPausa = this.newRowInput.script.trim();
      let blankName = !(newPausa.length > 0)?true:false;
      let newMCDU = this.newRowInput.MCDU.trim();
      let blankMCDU = !(newMCDU.length > 0)?true:false;
      if (!blankName && !blankMCDU){
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        let body = {};
        body.name = this.newRowInput.script.trim();
        body.mcdu = this.newRowInput.MCDU.trim();
        body.status = this.newRowInput.status?1:0;
        this.postNewScript(body);
      }
      else {
        let toast = {
          isValidated:false,
          title:'NOVO SCRIPT VAZIO NÃO ADICIONADO',
          message:'Novo Script '+newPausa.toUpperCase()+' não foi adicionado. Não é possível adicionar Scripts sem nome, sem MCDU, ou com qualquer desses dois campos em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    postNewScript(body){
      axios.post(baseApiUrl+'/scripts', body)
      .then(res => {
        console.log("Status: " + res.status + " - " + res.statusText);
        let toast = {
          isValidated:true,
          title:'NOVO SCRIPT ADICIONADO',
          message:'Novo Script '+body.name.toUpperCase()+' adicionado com sucesso!',
        }
        this.validateAndToast(toast);
        this.filas.push(Object.assign({},this.newRowInput));
        this.pausas.push(body.name);
        this.newRowInput = {...this.newRowDefault};
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE DATA:\n",error.response.data,"\n\tERROR RESPONSE STATUS:\n",error.response.status,"\n\tERROR MESSAGE:\n",error.message)
        let toast = {
          isValidated:false,
          title:'NOVO SCRIPT NÃO ADICIONADO',
          message:'Script '+ body.name.toUpperCase()+' não pôde ser adicionado. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
        this.newRowInput = {...this.newRowDefault};
      })
    },
    cancelAdd(){
      let newPausa = this.newRowInput.script.trim();
      let toast = {
        isValidated:false,
        title:'NOVO SCRIPT NÃO ADICIONADO',
        message:'Novo Script '+newPausa.toUpperCase()+' não foi adicionado. A operação de adicionar foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    },
    populateEditLine(i){
      this.editRowInput = {...this.filas[i]};
    },
    updateRow(row){
      let s = this.editRowInput.script.trim();
      let blankName = !(s.length > 0)?true:false;
      let m = this.editRowInput.MCDU.trim();
      let blankMCDU = !(m.length > 0)?true:false;

      if(!blankName && !blankMCDU){ // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        let body = {};
        body.name = this.editRowInput.script.trim();
        body.mcdu = this.editRowInput.MCDU.trim();
        body.status = this.editRowInput.status?1:0;
        let id = this.editRowInput.id;
        this.putEditedScript(body,id,row);
      }
      else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated:false,
          title:'SCRIPT NÃO EDITADO',
          message:'O Script '+s.toUpperCase()+' não foi modificado. Não é possível atualizar um Script apagando seu nome, seu MCDU, ou deixando apenas espaços em branco em qualquer um dos dois campos. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    putEditedScript(body,id,row){
      let sID = id.toString();
      axios.put(baseApiUrl+'/scripts/'+sID, body)
      .then(res => {
        console.log("Status: " + res.status + " - " + res.statusText);
        let toast = {
          isValidated:true,
          title:'SCRIPT EDITADO',
          message:'Script '+body.name.toUpperCase()+' editado com sucesso!',
        }
        this.validateAndToast(toast);
        this.filas.splice(row,1,{...this.editRowInput});
        this.pausas.splice(row,1, body.name);
        this.editRowInput = {...this.newRowDefault};
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE DATA:\n",error.response.data,"\n\tERROR RESPONSE STATUS:\n",error.response.status,"\n\tERROR MESSAGE:\n",error.message)
        let toast = {
          isValidated:false,
          title:'SCRIPT NÃO EDITADO',
          message:'Script '+ body.name.toUpperCase()+' não pôde ser editado. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
        this.editRowInput = {...this.newRowDefault};
      })
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
    this.newRowDefault = {...defaultScriptRow};
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