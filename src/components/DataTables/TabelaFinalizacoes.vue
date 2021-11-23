<template>
  <div class="finalizacoes">
    <b-table id="tabela-de-finalizacoes" :ref="'tabela-de-finalizacoes'"
             :fields="fields"
             :items="filas" :responsive="true" class="tabela-finalizacoes table-sm table-hover table-striped w-100 dt-responsive dtr-inline" sticky-header :per-page="10">
      <template v-slot:head(finalizacao)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(ID)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(descricao)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(CPC)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(CPCA)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(alega_pgto)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(promessasv)="data">
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

      <template v-slot:cell(finalizacao)="slot">
        <span :id="(slot.item.finalizacao)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(ID)="slot">
        <span :id="(slot.item.finalizacao)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(descricao)="slot">
        <span :id="(slot.item.finalizacao)+'_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(CPC)="slot">
        <b-form-checkbox :id="(slot.item.finalizacao)+'_produtiva'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
      <template v-slot:cell(CPCA)="slot">
        <b-form-checkbox :id="(slot.item.finalizacao)+'_obrigatoria'" v-model="slot.value" :unchecked-value="false"
                         :value="true" disabled/>
      </template>
        <template v-slot:cell(alega_pgto)="slot">
          <b-form-checkbox :id="(slot.item.finalizacao)+'_obrigatoria'" v-model="slot.value" :unchecked-value="false"
                           :value="true" disabled/>
        </template>
        <template v-slot:cell(promessasv)="slot">
          <b-form-checkbox :id="(slot.item.finalizacao)+'_obrigatoria'" v-model="slot.value" :unchecked-value="false"
                           :value="true" disabled/>
        </template>

        <template v-slot:cell(status)="slot">
          <b-form-checkbox :id="(slot.item.finalizacao)+'_ativa'" v-model="slot.value" :unchecked-value="false"
                           :value="true" disabled switch/>
        </template>
        <template v-slot:cell(add)="slot">
          <b-button :id="(slot.item.finalizacao)+'_edit'" v-b-modal="(slot.item.finalizacao)+'_edit_modal'" class="edit-btn"
                    variant="outline" v-html="editIcon"/>
          <b-btn :id="(slot.item.finalizacao)+'_add'" v-b-modal="slot.item.finalizacao + '_delete'" class="add-btn" variant="outline"
                 v-html="deleteIcon"/>
        </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.finalizacao+'_edit'">
      <b-modal
          :id="i.finalizacao+'_edit_modal'"
          :ref="i.finalizacao+'_edit_modal'"
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
              <b-col class="finalizacao-head-container" cols="3">
                <span class="finalizacao-head">Finalização</span>
              </b-col>
              <b-col class="produtiva-head-container" cols="2">
                <span class="produtiva-head">ID</span>
              </b-col>
              <b-col class="obrigatoria-head-container" cols="2">
                <span class="obrigatoria-head">Descrição</span>
              </b-col>
              <b-col class="alerta-head-container" cols="1">
                <span class="alerta-head">CPC</span>
              </b-col>
              <b-col class="limite-head-container" cols="1">
                <span class="limite-head">CPCA</span>
              </b-col>
              <b-col class="icone-head-container" cols="1">
                <span class="icone-head">Alega pagamento</span>
              </b-col>
              <b-col class="ativa-head-container" cols="1">
                <span class="ativa-head">Promessas/Vendas</span>
              </b-col>
              <b-col class="ativa-head-container" cols="1">
                <span class="ativa-head">Status</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="finalizacao-body-container" cols="3">
                <b-form-input :id="i.finalizacao+'_edit_row_pausa'" :ref="i.finalizacao+'_edit_row_pausa'" v-model="editRowInput.finalizacao"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="finalizacao-body-container" cols="2">
                <b-form-input :id="i.finalizacao+'_edit_row_pausa'" :ref="i.finalizacao+'_edit_row_pausa'" v-model="editRowInput.IP"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="finalizacao-body-container" cols="2">
                <b-form-input :id="i.finalizacao+'_edit_row_pausa'" v-model="editRowInput.descricao"
                              :presentState="i" type="text"/>
              </b-col>
              <b-col class="produtiva-body-container" cols="1">
                <b-form-checkbox :id="i.finalizacao+'_edit_row_produtiva'" v-model="editRowInput.CPC"
                                 :presentState="i" :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.finalizacao+'_edit_row_obrigatoria'" v-model="editRowInput.CPCA"
                                 :presentState="i" :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.finalizacao+'_edit_row_obrigatoria'" v-model="editRowInput.alega_pgto"
                                 :presentState="i" :unchecked-value="false" :value="true"/>
              </b-col>
              <b-col class="obrigatoria-body-container" cols="1">
                <b-form-checkbox :id="i.finalizacao+'_edit_row_obrigatoria'" v-model="editRowInput.promessasv"
                                 :presentState="i" :unchecked-value="false" :value="true"/>
              </b-col>
              
              <b-col class="ativa-body-container" cols="1">
                <b-form-checkbox :id="i.finalizacao+'_edit_row_ativa'" v-model="editRowInput.status" :presentState="i"
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
          :id="i.finalizacao+'_delete'"
          :hide-header-close="false"
          :lazy="true"
          :no-close-on-backdrop="false"
          :no-close-on-esc="false"
          cancel-title="MANTER"
          cancel-variant="success"
          ok-title="EXCLUIR"
          ok-variant="danger"
          title="ATENÇÃO!!!"
          @cancel="cancelDelete(i.finalizacao)"
          @ok="deleteRow(i.finalizacao)">
        Tem certeza que deseja excluir a finalizacao <b>{{ i.finalizacao }}</b>?
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
            <b-col class="finalizacao-head-container" cols="3">
              <span class="finalizacao-head">Finalização</span>
            </b-col>
            <b-col class="produtiva-head-container" cols="2">
              <span class="produtiva-head">ID</span>
            </b-col>
            <b-col class="obrigatoria-head-container" cols="2">
              <span class="obrigatoria-head">Descrição</span>
            </b-col>
            <b-col class="alerta-head-container" cols="1">
              <span class="alerta-head">CPC</span>
            </b-col>
            <b-col class="limite-head-container" cols="1">
              <span class="limite-head">CPCA</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">Alega pagamento</span>
            </b-col>
            <b-col class="icone-head-container" cols="1">
              <span class="icone-head">Promessas/Vendas</span>
            </b-col>
            <b-col class="ativa-head-container" cols="1">
              <span class="ativa-head">Status</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="finalizacao-body-container" cols="3">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.finalizacao" type="text"></b-form-input>
            </b-col>
            <b-col class="finalizacao-body-container" cols="2">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.IP" type="text"></b-form-input>
            </b-col>
            <b-col class="finalizacao-body-container" cols="2">
              <b-form-input :id="'new_row_pausa'" v-model="newRowInput.descricao" type="text"></b-form-input>
            </b-col>
            <b-col class="produtiva-body-container" cols="1">
              <b-form-checkbox :id="'new_row_produtiva'" v-model="newRowInput.CPC" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_obrigatoria'" v-model="newRowInput.CPCA" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_alega_pgto'" v-model="newRowInput.alega_pgto" :unchecked-value="false"
                               :value="true"/>
            </b-col>
            <b-col class="obrigatoria-body-container" cols="1">
              <b-form-checkbox :id="'new_row_promessasv'" v-model="newRowInput.promessasv" :unchecked-value="false"
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
  finalizacao: '',
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
      const p = this.finalizacoes.indexOf(ev);
      this.filas.splice(p, 1);
      this.finalizacoes.splice(p, 1);
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
      let newPausa = this.newRowInput.finalizacao.trim();
      if (newPausa.length > 0) {
        console.log("Filas ok:")
        console.log(this.filas)
        console.log("New Row Input:")
        console.log(this.newRowInput)
        this.filas.push(Object.assign({}, this.newRowInput));
        this.finalizacoes.push(newPausa);
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
      let newPausa = this.newRowInput.finalizacao.trim();
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
      let p = this.editRowInput.finalizacao.trim();

      if (p.length > 0) { // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row, 1, {...this.editRowInput});
        this.finalizacoes.splice(row, 1, p);
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
      let p = this.filas[row].finalizacao;
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
      finalizacoes: this.items[0].finalizacoes,
      icons: [{value: 'i1', html: '<span class="fal fa-trash-alt"/>'},
        {value: 'i2', html: '<span class="fal fa-plus"/>'},
        {value: 'i3', html: '<span class="fal fa-air-conditioner"/>'},
        {value: 'i4', html: '<span class="fal fa-abacus"/>'}],
      fields: [
        {
          key: 'finalizacao',
          label: 'Finalização',
        },
        {
          key: 'ID',
          label: 'ID'
        },
        {
          key: 'descricao',
          label: 'Descrição'
        },
        {
          key: 'CPC',
          label: 'CPC'
        },
        {
          key: 'CPCA',
          label: 'CPCA'
        },
        {
          key: 'alega_pgto',
          label: 'Alega Pagamento'
        },
        {
          key: 'promessasv',
          label: 'Promessas/Vendas'
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

.finalizacao-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container {
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.finalizacao-head {
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


.finalizacao-body-container, .produtiva-body-container, .obrigatoria-body-container, .alerta-body-container, .limite-body-container, .icone-body-container, .ativa-body-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding-left: 2px !important;
  padding-right: 2px !important;
}


.tabela-finalizacoes > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-finalizacoes > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}

.tabela-finalizacoes > .table.b-table > thead > tr > [aria-sort=none], .tabela-finalizacoes > .table.b-table > tfoot > tr > [aria-sort=none] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}

.tabela-finalizacoes > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-finalizacoes > .table.b-table > tfoot > tr > [aria-sort=ascending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}

.tabela-finalizacoes > .table.b-table > thead > tr > [aria-sort=descending], .tabela-finalizacoes > .table.b-table > tfoot > tr > [aria-sort=descending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}

.tabela-finalizacoes > .table.b-table > thead > tr > .table-b-table-default {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}
.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="9"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="9"] {
  /* display: flex; */
  text-align: center !important;
  width: 5%;
}


.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="8"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="8"] {
  text-align: center !important;
  width: 2.5%;
}

.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="7"], .tabela-finalizacoes > .table.b-table > tbody > tr >[aria-colindex="6"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="7"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="6"] .tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="5"], .tabela-finalizacoes > .table.b-table > tbody > tr >[aria-colindex="4"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="5"], .tabela-finalizacoes > .table.b-table > thead > tr >[aria-colindex="4"] {
  width: 3%;
  text-align: center;
  justify-content: center;
  display: table-cell;
}

.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="5"], .tabela-finalizacoes > .table.b-table > tbody > tr >[aria-colindex="4"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="5"], .tabela-finalizacoes > .table.b-table > tbody > tr >[aria-colindex="4"] {
  width: 14%;
  text-align: center;
}

.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="3"], [aria-colindex="2"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="3"], [aria-colindex="2"] {
  width: 15%;
  text-align: center;
}

.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="1"] {
  width: 15%;
}

.tabela-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-finalizacoes > .table.b-table > thead > tr > [aria-colindex="1"] {
  text-align: left !important;
}

#editar-finalizacoes > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-finalizacoes > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}
</style>