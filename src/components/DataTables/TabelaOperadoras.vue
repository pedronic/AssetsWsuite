<template>
  <div class="operadoras">
    <b-table id="tabela-de-operadoras" :ref="'tabela-de-operadoras'"
             :fields="fields" :items="filas"
             :responsive="true" class="tabela-operadoras table-sm table-hover table-striped w-100 dt-responsive dtr-inline" sticky-header>
      <template v-slot:head(nome)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(IP)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(porta)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(contexto)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(local)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(LDN)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(VC1)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(VC2)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(VC3)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(LDI)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(status)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(add)="data">
        <b-button v-b-modal="'new_line'" class="head-add-button btn-success" variant="outline-dark">
          <span class="head-add-button" v-html="data.label"/>
        </b-button>
      </template>

      <template v-slot:cell(operadora)="slot">
        <span :id="(slot.item.operadora)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(IP)="slot">
        <span :id="(slot.item.IP)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(porta)="slot">
        <span :id="(slot.item.operadoras)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(contexto)="slot">
        <span :id="(slot.item.operadora)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(local)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(LDN)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(VC1)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(VC2)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(VC3)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(LDI)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(status)="slot">
        <b-form-checkbox :id="(slot.item.operadora)+'_ativa'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled switch/>
      </template>
      <template v-slot:cell(add)="slot">
        <b-button :id="(slot.item.operadora)+'_edit'" v-b-modal="(slot.item.operadora)+'_edit_modal'" class="edit-btn"
                  variant="outline" v-html="editIcon"/>
        <b-btn :id="(slot.item.operadora)+'_add'" v-b-modal="slot.item.operadora + '_delete'" class="add-btn" variant="outline"
               v-html="deleteIcon"/>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.operadora+'_edit'">
      <b-modal
          :id="i.operadora+'_edit_modal'"
          :ref="i.operadora+'_edit_modal'"
          :hide-header-close="true"
          :lazy="true"
          :no-close-on-backdrop="true"
          :no-close-on-esc="true"
          cancel-title="CANCELAR"
          cancel-variant="danger"
          ok-title="SALVAR"
          ok-variant="info"
          size="xl"
          title="Editar Pausa"
          @cancel="cancelEdit(index)"
          @ok="updateRow(index)"
          @show="populateEditLine(index)"
      >
        <b-container fluid>
          <b-col cols="14">
            <b-row>
              <b-col class="operadora-head-container" cols="1">
                <span class="operadora-head">Nome</span>
              </b-col>
              <b-col class="produtiva-head-container" cols="1">
                <span class="produtiva-head">IP</span>
              </b-col>
              <b-col class="obrigatoria-head-container" cols="1">
                <span class="obrigatoria-head">Porta</span>
              </b-col>
              <b-col class="alerta-head-container" cols="1">
                <span class="alerta-head">Contexto</span>
              </b-col>
              <b-col class="limite-head-container" cols="1">
                <span class="limite-head">Local</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">LDN</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">VC1</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">VC2</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">VC3</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">LDI</span>
              </b-col>
              <b-col class="ativa-head-container" cols="1">
                <span class="ativa-head">Ativa</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="operadora-body-container" cols="1">
                <b-form-input :id="i.operadora+'_edit_row_pausa'" :ref="i.operadora+'_edit_row_pausa'" v-model="editRowInput.operadora"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="operadora-body-container" cols="1">
                <b-form-input :id="i.operadora+'_edit_row_pausa'" :ref="i.operadora+'_edit_row_pausa'" v-model="editRowInput.IP"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="operadora-body-container" cols="1">
                <b-form-input :id="i.operadora+'_edit_row_pausa'" :ref="i.operadora+'_edit_row_pausa'" v-model="editRowInput.porta"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="operadora-body-container" cols="1">
                <b-form-input :id="i.operadora+'_edit_row_pausa'" :ref="i.operadora+'_edit_row_pausa'" v-model="editRowInput.contexto"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.local+'_edit_row_obrigatoria'" v-model="editRowInput.local" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="produtiva-body-container" cols="1">
                <b-form-checkbox :id="i.LDN+'_edit_row_produtiva'" v-model="editRowInput.LDN" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.VC1+'_edit_row_obrigatoria'" v-model="editRowInput.VC1" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.VC2+'_edit_row_obrigatoria'" v-model="editRowInput.VC2" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.VC3+'_edit_row_obrigatoria'" v-model="editRowInput.VC3" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.LDI+'_edit_row_obrigatoria'" v-model="editRowInput.LDI" :presentState="i"
                                 :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="ativa-body-container" cols="1">
                <b-form-checkbox :id="i.operadora+'_edit_row_ativa'" v-model="editRowInput.status" :presentState="i"
                                 :unchecked-value="false" :value="true" switch/>
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
          :id="i.operadora+'_delete'"
          :hide-header-close="false"
          :lazy="true"
          :no-close-on-backdrop="false"
          :no-close-on-esc="false"
          cancel-title="MANTER"
          cancel-variant="success"
          ok-title="EXCLUIR"
          ok-variant="danger"
          title="ATENÇÃO!!!"
          @cancel="cancelDelete(i.operadora)"
          @ok="deleteRow(i.operadora)">
        Tem certeza que deseja excluir a operadora <b>{{ i.operadora }}</b>?
      </b-modal>
    </div>
    <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
    <b-modal
        id="new_line"
        :hide-header-close="false"
        :no-close-on-backdrop="false"
        :no-close-on-esc="false"
        cancel-title="CANCELAR"
        cancel-variant="danger"
        ok-title="ADICIONAR"

        ok-variant="success"
        refs="new_line"
        size="xl"
        title="Adicionar Nova Pausa"
        @cancel="cancelAdd()"
        @ok="okayAdd()"
        @show="populateNewLine()">
      <b-container fluid>
        <b-col cols="12">
          <b-row>
            <b-col class="operadora-head-container" cols="1">
              <span class="operadora-head">Nome</span>
            </b-col>
            <b-col class="produtiva-head-container" cols="1">
              <span class="produtiva-head">IP</span>
            </b-col>
            <b-col class="obrigatoria-head-container" cols="1">
              <span class="obrigatoria-head">Porta</span>
            </b-col>
            <b-col class="alerta-head-container" cols="1">
              <span class="alerta-head">Contexto</span>
            </b-col>
            <b-col class="limite-head-container" cols="1">
              <span class="limite-head">Local</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">LDN</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">VC1</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">VC2</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">VC3</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">LDI</span>
            </b-col>
            <b-col class="ativa-head-container" cols="1">
              <span class="ativa-head">Status</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="operadora-body-container" cols="1">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.operadora" type="text"></b-form-input>
            </b-col>
            <b-col class="operadora-body-container" cols="1">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.IP" type="text"></b-form-input>
            </b-col>
            <b-col class="operadora-body-container" cols="1">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.porta" type="text"></b-form-input>
            </b-col>
            <b-col class="operadora-body-container" cols="1">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.contexto" type="text"></b-form-input>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_local'" v-model="newRowInput.local" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="produtiva-body-container" cols="1">
              <b-form-checkbox :id="'new_row_LDN'" v-model="newRowInput.LDN" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_VC1'" v-model="newRowInput.VC1" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_VC2'" v-model="newRowInput.VC2" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_VC3'" v-model="newRowInput.VC3" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_LDI'" v-model="newRowInput.LDI" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            


            <b-col class="ativa-body-container" cols="1">
              <b-form-checkbox :id="'new_row_ativa'" v-model="newRowInput.status" :unchecked-value="false" :value="true"
                               switch/>
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
  operadora: '',
  produtiva: false,
  obrigatoria: false,
  alerta: '',
  limite: '',
  icone: '',
  ativa: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name: 'TabelaPausas',
  mixins: [ValidateToaster],
  props: {
    items: Array,
  },
  methods: {
    deleteRow(ev) {
      const p = this.operadoras.indexOf(ev);
      this.filas.splice(p, 1);
      this.operadoras.splice(p, 1);
      let toast = {
        isValidated: true,
        title: 'PAUSA EXCLUÍDA',
        message: 'Pausa ' + ev.toUpperCase() + ' excluída com sucesso!',
      }
      this.validateAndToast(toast);
    },
    cancelDelete(p) {
      let toast = {
        isValidated: false,
        title: 'PAUSA MANTIDA',
        message: 'Pausa ' + p.toUpperCase() + ' foi mantida. A exclusão foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    },
    okayAdd() {
      let newPausa = this.newRowInput.operadora.trim();
      if (newPausa.length > 0) {
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({}, this.newRowInput));
        this.operadoras.push(newPausa);
        let toast = {
          isValidated: true,
          title: 'NOVA PAUSA ADICIONADA',
          message: 'Nova Pausa ' + newPausa.toUpperCase() + ' adicionada com sucesso!',
        }
        this.validateAndToast(toast);
      } else {
        let toast = {
          isValidated: false,
          title: 'NOVA PAUSA VAZIA NÃO ADICIONADA',
          message: 'Nova Pausa ' + newPausa.toUpperCase() + ' não foi adicionada. Não é possível adicionar Pausas sem nome ou com o nome em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }

    },
    cancelAdd() {
      let newPausa = this.newRowInput.operadora.trim();
      let toast = {
        isValidated: false,
        title: 'NOVA PAUSA NÃO ADICIONADA',
        message: 'Nova Pausa ' + newPausa.toUpperCase() + ' não foi adicionada. A operação de adicionar foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    },
    populateEditLine(i) {
      this.editRowInput = {...this.filas[i]};
    },
    populateNewLine() {
      this.newRowInput = {...this.newRowDefault}
    },
    updateRow(row) {
      let p = this.editRowInput.operadora.trim();

      if (p.length > 0) { // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row, 1, {...this.editRowInput});
        this.operadoras.splice(row, 1, p);
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated: true,
          title: 'PAUSA EDITADA',
          message: 'Pausa ' + p.toUpperCase() + ' editada com sucesso!',
        }
        this.validateAndToast(toast);
      } else {
        this.editRowInput = {...this.newRowDefault};

        let toast = {
          isValidated: false,
          title: 'PAUSA NÃO EDITADA',
          message: 'Pausa ' + p.toUpperCase() + ' não foi modificada. Não é possível atualizar uma Pausa apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.',
        }
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row) {
      this.editRowInput = {...this.newRowDefault};
      let p = this.filas[row].operadora;
      let toast = {
        isValidated: false,
        title: 'PAUSA NÃO EDITADA',
        message: 'Pausa ' + p.toUpperCase() + ' não foi modificada. A edição foi cancelada pelo usuário.',
      };
      this.validateAndToast(toast);
    }
  },
  created() {
    this.newRowDefault = {...defaultRow};
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    localStorage.setItem('__pedro-dev', JSON.stringify(this.items.slice(1, this.items.length)));
    // this.editRowInput = this.filas;
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  watch: {
    // filas(newValue){
    //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
    // }
  },
  mounted() {
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  data() {
    return {
      filas: this.items.slice(1, this.items.length),
      newRowInput: Object.assign({}, this.newRowDefault),
      editRowInput: Object.assign({}, this.newRowDefault),
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      operadoras: this.items[0].operadoras,
      icons: [{value: 'i1', html: '<span class="fal fa-trash-alt"/>'},
        {value: 'i2', html: '<span class="fal fa-plus"/>'},
        {value: 'i3', html: '<span class="fal fa-air-conditioner"/>'},
        {value: 'i4', html: '<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key: 'operadora',
          label: 'Nome',
        },
        {
          key: 'IP',
          label: 'IP'
        },
        {
          key: 'porta',
          label: 'Porta'
        },
        {
          key: 'contexto',
          label: 'Contexto'
        },
        {
          key: 'local',
          label: 'Local'
        },
        {
          key: 'LDN',
          label: 'LDN'
        },
        {
          key: 'VC1',
          label: 'VC1'
        },
        {
          key: 'VC2',
          label: 'VC2'
        },
        {
          key: 'VC3',
          label: 'VC3'
        },
        {
          key: 'LDI',
          label: 'LDI'
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: 'add',
          label: '<span class="fal fa-plus fa-1x head-add-button"/>'
        }
      ]
    }
  }
}
</script>

<style>
span.fal {
  pointer-events: none;
}

.add-btn > i, .edit-btn > i {
  padding: 0px !important;
  border-width: 0px 1px !important;
  display: flex;
  align-content: center;
  justify-content: center;
}

.add-btn, .edit-btn {
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

.operadora-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container {
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.operadora-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.produtiva-head, .obrigatoria-head, .alerta-head, .limite-head, .icone-head, .ativa-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center !important;
}


.operadora-body-container, .produtiva-body-container, .obrigatoria-body-container, .alerta-body-container, .limite-body-container, .icone-body-container, .ativa-body-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding-left: 2px !important;
  padding-right: 2px !important;
}


.tabela-operadoras > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-operadoras > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}

.tabela-operadoras > .table.b-table > thead > tr > [aria-sort=none], .tabela-operadoras > .table.b-table > tfoot > tr > [aria-sort=none] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}

.tabela-operadoras > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-operadoras > .table.b-table > tfoot > tr > [aria-sort=ascending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}

.tabela-operadoras > .table.b-table > thead > tr > [aria-sort=descending], .tabela-operadoras > .table.b-table > tfoot > tr > [aria-sort=descending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}

.tabela-operadoras > .table.b-table > thead > tr > .table-b-table-default {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="8"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="8"] {
  width: 3.5%;
  text-align: center;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="7"], [aria-colindex="6"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="7"], [aria-colindex="6"] {
  width: 3%;
  text-align: center;
  justify-content: center;
  display: table-cell;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="5"], [aria-colindex="4"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="5"], [aria-colindex="4"] {
  width: 6%;
  text-align: center;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="3"], [aria-colindex="2"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="3"], [aria-colindex="2"] {
  width: 6%;
  text-align: center;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="1"] {
  width: 10%;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="1"] {
  text-align: left !important;
}

#editar-operadoras > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-operadoras > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="11"], .tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="12"] {
  text-align: center !important;
  width: 5%;
}

.tabela-operadoras > .table.b-table > tbody > tr > [aria-colindex="9"] {
  text-align: center !important;
  width: 5%;
}

.tabela-operadoras > .table.b-table > thead > tr > [aria-colindex="10"] {
  text-align: center !important;
  width: 1%;
}
</style>