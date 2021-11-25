<template>
  <div class="pausas">
    <b-table
      id="tabela-de-pausas"
      :ref="'tabela-de-pausas'"
      class="
        tabela-pausas
        table-sm table-hover table-striped
        w-100
        dt-responsive
        dtr-inline
      "
      :items="filas"
      :responsive="true"
      :fields="fields"
      :filter="filter"
      filter-debounce="50"
      :filter-included-fields="filter_fields"
      sticky-header
      :per-page="10"
      :busy="busy"
    >
        <!--editando os headers das tabelas-->

      <template v-slot:head(queue_number)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(name_queue)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(type)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(queue_type)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(finalization_name)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(break_group_id)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(route_name)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(dial_format)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(speedy)="data">
        <span>{{ data.label }}</span>
      </template>
      <!--Editando cada célula da tebela-->

      <template v-slot:head(flag)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(add)="data">
        <!-- v-b-modal="'new_line'" -->
        <b-button
          class="head-add-button btn-success"
          :to="{ name: 'FilasCadastro' }"
          variant="outline-dark"
        >
          <span v-html="data.label" class="head-add-button" />
        </b-button>
      </template>
      <!--célula de adição é personalizada dessa maneira para recebeer os dois botões-->

      <template v-slot:cell(queue_number)="slot">
        <span :id="slot.item.queue_number + '_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(name_queue)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(type)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(queue_type)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(finalization_name)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(break_group_id)="slot">
        <span :id="slot.item.queue_number + '_limite'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(route_name)="slot">
        <span :id="slot.item.queue_number + '_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(dial_format)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(speedy)="slot">
        <span :id="slot.item.queue_number + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(flag)="slot">
        <b-form-checkbox
          v-model="slot.value"
          :id="slot.item.queue_number + '_ativa'"
          :value="true"
          :unchecked-value="false"
          switch
          disabled
        />
      </template>
      <template v-slot:cell(add)="slot">
        <!-- v-b-modal="(slot.item.queue_number)+'_edit_modal'" 
        , email: '', queue_number:'', -->
        <router-link
          :to="{
            name: 'FilasCadastro',
            params: {
              username: slot.item.username,
              queue_number: slot.item.queue_number,
              email: slot.item.email,
              perfilName: slot.item.perfilName,
              enable: slot.item.enable,
              id: slot.item.id,
            },
          }"
        >
          <b-button
            :id="slot.item.queue_number + '_edit'"
            class="edit-btn"
            variant="outline"
            v-html="editIcon"
          />
        </router-link>
        <b-btn
          :id="slot.item.queue_number + '_add'"
          v-html="deleteIcon"
          class="add-btn"
          variant="outline"
          v-b-modal="slot.item.queue_number + '_delete'"
        />
      </template>
    </b-table>
    <!-- ----------------------------------------------------A ser implementado futuramente -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.queue_number + '_edit'">
      <b-modal
        :id="i.queue_number + '_edit_modal'"
        :ref="i.queue_number + '_edit_modal'"
        title="Editar Fila"
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
              <b-col cols="4" class="queue_number-head-container">
                <span class="queue_number-head">Usuário</span>
              </b-col>
              <b-col cols="2" class="username-head-container">
                <span class="username-head">Nome</span>
              </b-col>
              <b-col cols="2" class="email-head-container">
                <span class="email-head">Email</span>
              </b-col>
              <b-col cols="1" class="perfilName-head-container">
                <span class="perfilName-head">Perfil</span>
              </b-col>
              <b-col cols="1" class="enable-head-container">
                <span class="enable-head">Status</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4" class="queue_number-body-container">
                <b-form-input
                  v-model="editRowInput.queue_number"
                  :presentState="i"
                  :id="i.queue_number + '_edit_row_pausa'"
                  :ref="i.queue_number + '_edit_row_pausa'"
                  type="text"
                />
              </b-col>
              <b-col cols="2" class="username-body-container">
                <b-form-input
                  v-model="editRowInput.username"
                  :presentState="i"
                  :id="i.queue_number + '_edit_row_produtiva'"
                  type="text"
                />
              </b-col>
              <b-col cols="2" class="email-body-container">
                <b-form-input
                  v-model="editRowInput.email"
                  :presentState="i"
                  :id="i.queue_number + '_edit_row_obrigatoria'"
                  type="text"
                />
              </b-col>
              <b-col cols="1" class="perfilName-body-container">
                <b-form-input
                  v-model="editRowInput.perfilName"
                  :presentState="i"
                  :id="i.queue_number + '_edit_row_alerta'"
                  type="text"
                ></b-form-input>
              </b-col>
              <b-col cols="1" class="enable-body-container">
                <b-form-checkbox
                  v-model="editRowInput.enable"
                  :presentState="i"
                  :id="i.queue_number + '_edit_row_ativa'"
                  :value="true"
                  :unchecked-value="false"
                  switch
                />
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
        :id="i.queue_number + '_delete'"
        title="ATENÇÃO!!!"
        :hide-header-close="false"
        :no-close-on-backdrop="false"
        :no-close-on-esc="false"
        :lazy="true"
        ok-title="EXCLUIR"
        ok-variant="danger"
        cancel-title="MANTER"
        cancel-variant="success"
        @ok="deleteRow(i.queue_number, i.id)"
        @cancel="cancelDelete(i.queue_number)"
      >
        Tem certeza que deseja excluir a pausa número <b>{{ i.queue_number }}</b
        >?
      </b-modal>
    </div>
    <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- A ser implementado futuramente -->
    <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
    <b-modal
      id="new_line"
      refs="new_line"
      title="Adicionar Nova Fila"
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
      @show="populateNewLine()"
    >
      <b-container fluid>
        <b-col cols="12">
          <b-row>
            <b-col cols="4" class="queue_number-head-container">
              <span class="queue_number-head">Usuário</span>
            </b-col>
            <b-col cols="2" class="username-head-container">
              <span class="username-head">Nome</span>
            </b-col>
            <b-col cols="2" class="email-head-container">
              <span class="email-head">Email</span>
            </b-col>
            <b-col cols="1" class="perfilName-head-container">
              <span class="perfilName-head">Perfil</span>
            </b-col>
            <b-col cols="1" class="enable-head-container">
              <span class="enable-head">Ativa</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="queue_number-body-container">
              <b-form-input
                v-model="newRowInput.queue_number"
                :id="'new_row_pausa'"
                type="text"
              ></b-form-input>
            </b-col>
            <b-col cols="2" class="username-body-container">
              <b-form-input
                v-model="newRowInput.username"
                :id="'new_row_produtiva'"
                type="text"
              />
            </b-col>
            <b-col cols="2" class="email-body-container">
              <b-form-input
                v-model="newRowInput.email"
                :id="'new_row_obrigatoria'"
                type="text"
              />
            </b-col>
            <b-col cols="1" class="perfilName-body-container">
              <b-form-input
                v-model="newRowInput.perfilName"
                :id="'new_row_alerta'"
                type="text"
              ></b-form-input>
            </b-col>
            <b-col cols="1" class="enable-body-container">
              <b-form-checkbox
                v-model="newRowInput.enable"
                :id="'new_row_ativa'"
                :value="true"
                :unchecked-value="false"
                switch
              />
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
import axios from "axios";
import { baseApiUrl } from "@/config/global";
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)

const defaultRow = { //linha para se exibir alguma coisa na tela caso ocorra alguma falha na requisição de dados
  queue_number: "",
  username: false,
  email: false,
  perfilName: "",
  limite: "",
  icone: "",
  enable: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name: "TabelaFilas_main",
  mixins: [ValidateToaster],
  props: {//recebe os itens, o parâmetro de filtragem e os campos a serem filtrados
    items: Array,
    filter: String,
    filter_fields: Array,
  },
    data() {
    return {
      filas: this.items.slice(1, this.items.length), //o primeiro item se refere aos nomes de cada
      newRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha criada
      editRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha editada
      editIcon: '<span class="fal fa-pencil"/>',
      busy: this.isLoading,
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      queues_number: this.items[0].queues_number, //usado em métodos de filtragem
      fields: [ //todas as colunas que receberam chave e valores
        {
          key: "queue_number",
          label: "Número",
          sortable: true,
        },
        {
          key: "name_queue",
          label: "Nome",
          sortable: true,
        },
        {
          key: "type",
          label: "Tipo (H x R)",
          sortable: true,
        },
        {
          key: "queue_type",
          label: "Tipo Fila",
          sortable: true,
        },
        {
          key: "finalization_name",
          label: "Finalização",
          sortable: true,
        },
        {
          key: "break_group_id",
          label: "Grupo de Pausas",
          sortable: true,
        },
        {
          key: "route_name",
          label: "Rota",
          sortable: true,
        },
        {
          key: "dial_format",
          label: "Modo de discagem",
          sortable: true,
        },
        {
          key: "speedy",
          label: "Velocidade",
          sortable: true,
          //   tdStyle: "text-align: center",
        },
        {
          key: "flag",
          label: "Status",
          // Boolean,
        },
        {
          key: "add",
          label: '<span class="fal fa-plus fa-1x head-add-button"/>',
        },
      ],
    };
  },

  methods: {
    async deleteUser(id) { //metódo de deleção de fila (na base de dados)
      console.log("delete");
      console.log(id);
      let s = await axios.delete(`${baseApiUrl}/users/${id}`);
      console.clear();
      console.log("Delete status:\n", s);
    },
    deleteRow(ev, id) { //metódo de deleção de usuário
      const p = this.queues_number.indexOf(ev);
      this.filas.splice(p, 1);
      this.queues_number.splice(p, 1);
      let toast = {
        isValidated: true,
        title: "FILA EXCLUÍDA",
        message: "Fila " + ev.toUpperCase() + " excluída com sucesso!",
      };
      this.deleteUser(id);
      this.validateAndToast(toast);
    },
    cancelDelete(p) { //efeito que ocorre quando o usuário desiste da seleção
      let toast = {
        isValidated: false,
        title: "FILA MANTIDa",
        message:
          "Fila " + p.toUpperCase() + " foi mantida. A exclusão foi cancelada.",
      };
      this.validateAndToast(toast);
    },
    okayAdd() { //adição visual de novo usuário
      let newPausa = this.newRowInput.queue_number.trim();
      if (newPausa.length > 0) {
        console.log("Filas ok:");
        console.log(this.filas);
        console.log("New Row Input:");
        console.log(this.newRowInput);
        this.filas.push(Object.assign({}, this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated: true,
          title: "NOVA FILA ADICIONADA",
          message:
            "Nova fila " + newPausa.toUpperCase() + " adicionada com sucesso!",
        };
        this.validateAndToast(toast);
      } else {  //em caso de o nome inserido for vazio
        let toast = {
          isValidated: false,
          title: "NOVA FILA VAZIA NÃO ADICIONADA",
          message:
            "Nova Fila " +
            newPausa.toUpperCase() +
            " não foi adicionada. Não é possível adicionar Filas sem rota ou com o rota em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelAdd() { //cancelamento do método de adição
      let newPausa = this.newRowInput.queue_number.trim();
      let toast = {
        isValidated: false,
        title: "NOVA FILA NÃO ADICIONADA",
        message:
          "Nova Fila " +
          newPausa.toUpperCase() +
          " não foi adicionada. A operação de adicionar foi cancelada pelo usuário.",
      };
      this.validateAndToast(toast);
    },
    populateEditLine(i) {
      this.editRowInput = { ...this.filas[i] };
    },
    populateNewLine() {
      this.newRowInput = { ...this.newRowDefault };
    },
    updateRow(row) {
      let p = this.editRowInput.queue_number.trim();

      if (p.length > 0) {
        // checando se o username não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row, 1, { ...this.editRowInput });
        this.pausas.splice(row, 1, p);
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: true,
          title: "FILA EDITADA",
          message: "Fila " + p.toUpperCase() + " editada com sucesso!",
        };
        this.validateAndToast(toast);
      } else {
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: false,
          title: "FILA NÃO EDITADA",
          message:
            "Fila " +
            p.toUpperCase() +
            " não foi modificada. Não é possível atualizar uma Fila apagando sua rota ou deixando apenas espaços em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row) {
      this.editRowInput = { ...this.newRowDefault };
      let p = this.filas[row].queue_number;
      let toast = {
        isValidated: false,
        title: "FILA NÃO EDITADA",
        message:
          "Fila " +
          p.toUpperCase() +
          " não foi modificada. A edição foi cancelada pelo usuário.",
      };
      this.validateAndToast(toast);
    },
  },
  created() {  //insere a nova linha no cache do navegador (em tempo de desenvolvimento)
    this.newRowDefault = { ...defaultRow };
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    localStorage.setItem(
      "__pedro-dev",
      JSON.stringify(this.items.slice(1, this.items.length))
    );
    // this.editRowInput = this.filas;
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  watch: { //a ser implementado
    // filas(newValue){
    //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
    // }
    isLoading(newValue, oldValue) {
      console.log(
        "WATCHING PROP 'isLoading'...\n",
        "\tisLoading OLD:\t",
        oldValue,
        "\n\tisLoading NEW:\t",
        newValue
      );
      this.busy = newValue;
      console.log("Items PROP:\n", this.items);
    },
    items(newValue, oldValue) {
      console.log(
        "WATCHING PROP 'items'...\n",
        "\titems OLD:\t",
        oldValue,
        "\n\titems NEW:\t",
        newValue
      );
      this.filas = newValue.slice(1, newValue.length);
      this.queues_number = newValue[0].queues_number;
    },
  },
  // computed() {
  //   Boolean(this.item.enable);
  //   },
  mounted() {
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
};
</script>

<style>
span.fal {
  pointer-events: none;
}

.add-btn > i,
.edit-btn > i {
  padding: 0px !important;
  border-width: 0px 1px !important;
  display: flex;
  align-content: center;
  justify-content: center;
}

.add-btn,
.edit-btn {
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

#new_row_limite,
#new_row_alerta {  /*implementado no futuro modal*/
  width: 100%;
  padding: 0.2ch;
  text-align: center;
}

.queue_number-head-container,
.username-head-container,
.email-head-container,
.perfilName-head-container,
.limite-head-container,
.icone-head-container,
.enable-head-container { /*estilização de todas as colunas*/
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.queue_number-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.username-head,
.email-head,
.perfilName-head,
.limite-head,
.icone-head,
.enable-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center !important;
}

.queue_number-body-container,
.username-body-container,
.email-body-container,
.perfilName-body-container,
.limite-body-container,
.icone-body-container,
.enable-body-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding-left: 2px !important;
  padding-right: 2px !important;
}
/* estilização do íconezinho de sort */
/*--------------------------![COMEÇO]!------------------------------------------------------*/
.tabela-pausas
  > .table.b-table.table-sm
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
.tabela-pausas
  > .table.b-table.table-sm
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="none"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="ascending"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="descending"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="descending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
/*--------------------------![FIM]!------------------------------------------------------*/
.tabela-pausas > .table.b-table > thead > tr > .table-b-table-default { /*Header*/
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}
/*------------------------------Edição individual de cada coluna por sequência em que aparecem------------------------------------*/

.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  width: 3.5%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],
[aria-colindex="6"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="7"],
[aria-colindex="6"] {
  width: 3%;
  text-align: center;
  justify-content: center;
  /* display: table-cell; */
  min-width: 100px;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],
[aria-colindex="4"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="5"],
[aria-colindex="4"] {
  width: 6%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],
[aria-colindex="2"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="3"],
[aria-colindex="2"] {
  width: 6%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"] {
  width: 10%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"] {
  text-align: left !important;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="9"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="9"] {
  text-align: center !important;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="10"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="10"] {
  text-align: center !important;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="11"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="11"] {
  text-align: center !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="11"],
#editar-pausas > .table.b-table > thead > tr > [aria-colindex="11"] {
  display: none !important;
}
</style>
