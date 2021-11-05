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
    >
      <template v-slot:thead-top>
        <b-tr>
          <b-th class="bg-primary" colspan="7">{{ queue_name }}</b-th>
        </b-tr>
      </template>
      <template v-slot:head(status)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(duration)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(agent)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(queue_number)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(answered_count)="data">
        <span v-html="data.label" class="head-add-button" />
      </template>
      <template v-slot:head(answered_receptive_count)="data">
        <span v-html="data.label" class="head-add-button" />
      </template>
      <template v-slot:head(bina)="data">
        <span>{{ data.label }}</span>
      </template>

      <template v-slot:cell(status)="slot">
        <span :id="slot.item.agent + '_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(duration)="slot">
        <span :id="slot.item.agent + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(agent)="slot">
        <span :id="slot.item.agent + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(queue_number)="slot">
        <span :id="slot.item.agent + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(answered_count)="slot">
        <span :id="slot.item.agent + '_limite'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(answered_receptive_count)="slot">
        <span :id="slot.item.agent + '_icone'" v-html="slot.value" />
      </template>

      <template v-slot:cell(bina)="slot">
        <span :id="slot.item.agent + '_icone'" v-html="slot.value" />
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/config/global";
import { jsonPath } from "jsonpath";
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)

const defaultRow = {
  agent: "",
  username: false,
  email: false,
  perfilName: "",
  limite: "",
  icone: "",
  enable: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name: "TabelaFila",
  mixins: [ValidateToaster],
  props: {
    queue_name: String,
    number: String,
  },
  methods: {
    async getFields(id) {
      let res = await axios.get(baseApiUrl + "/monitorarFilas", JSON);
      let sorted = jsonPath(
        res,
        `$.data[?(@.queue_number = ${id})].`
      ).toJSONString();
      console.log(sorted);
    },

    deleteRow(ev, id) {
      const p = this.agents.indexOf(ev);
      this.filas.splice(p, 1);
      this.agents.splice(p, 1);
      let toast = {
        isValidated: true,
        title: "USUÁRIO EXCLUÍDO",
        message: "Usuário " + ev.toUpperCase() + " excluído com sucesso!",
      };
      this.deleteUser(id);
      this.validateAndToast(toast);
    },
    cancelDelete(p) {
      let toast = {
        isValidated: false,
        title: "USUÁRIO MANTIDO",
        message:
          "Usuário " +
          p.toUpperCase() +
          " foi mantido. A exclusão foi cancelada.",
      };
      this.validateAndToast(toast);
    },
    okayAdd() {
      let newPausa = this.newRowInput.agent.trim();
      if (newPausa.length > 0) {
        console.log("Filas ok:");
        console.log(this.filas);
        console.log("New Row Input:");
        console.log(this.newRowInput);
        this.filas.push(Object.assign({}, this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated: true,
          title: "NOVO USUÁRIO ADICIONADA",
          message:
            "Novo usuário " +
            newPausa.toUpperCase() +
            " adicionado com sucesso!",
        };
        this.validateAndToast(toast);
      } else {
        let toast = {
          isValidated: false,
          title: "NOVO USUÁRIO VAZIO NÃO ADICIONADA",
          message:
            "Nova Pausa " +
            newPausa.toUpperCase() +
            " não foi adicionada. Não é possível adicionar Pausas sem username ou com o username em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelAdd() {
      let newPausa = this.newRowInput.agent.trim();
      let toast = {
        isValidated: false,
        title: "NOVA PAUSA NÃO ADICIONADA",
        message:
          "Nova Pausa " +
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
      let p = this.editRowInput.agent.trim();

      if (p.length > 0) {
        // checando se o username não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row, 1, { ...this.editRowInput });
        this.pausas.splice(row, 1, p);
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: true,
          title: "PAUSA EDITADA",
          message: "Pausa " + p.toUpperCase() + " editada com sucesso!",
        };
        this.validateAndToast(toast);
      } else {
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: false,
          title: "PAUSA NÃO EDITADA",
          message:
            "Pausa " +
            p.toUpperCase() +
            " não foi modificada. Não é possível atualizar uma Pausa apagando seu username ou deixando apenas espaços em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row) {
      this.editRowInput = { ...this.newRowDefault };
      let p = this.filas[row].agent;
      let toast = {
        isValidated: false,
        title: "PAUSA NÃO EDITADA",
        message:
          "Pausa " +
          p.toUpperCase() +
          " não foi modificada. A edição foi cancelada pelo usuário.",
      };
      this.validateAndToast(toast);
    },
  },
  created() {
    this.newRowDefault = { ...defaultRow };
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    // localStorage.setItem(
    //   "__pedro-dev",
    //   JSON.stringify(this.items.slice(1, this.items.length))
    // );
    // this.editRowInput = this.filas;
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  updated() {
    this.getFields(parseInt(this.number));
  },
  watch: {
    // filas(newValue){
    //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
    // }
  },
  // computed() {
  //   Boolean(this.item.enable);
  //   },
  mounted() {
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  data() {
    return {
      newRowInput: Object.assign({}, this.newRowDefault),
      editRowInput: Object.assign({}, this.newRowDefault),
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      items: [
        {
          agents: ["3001", "3002"],
        },
        {
          status: "available",
          duration: "00:00:42",
          agent: 3001,
          name: "3001",
          queue_number: 5001,
          answered_count: 221,
          answered_receptive_count: 0,
          bina: "3234628481",
        },
        {
          status: "available",
          duration: "00:01:30",
          agent: 3002,
          name: "3002",
          queue_number: 5001,
          answered_count: 224,
          answered_receptive_count: 0,
          bina: "6132256844",
        },
      ],
      // this.items.slice(1, this.items.length)
      filas: [
        {
          status: "available",
          duration: "00:00:42",
          agent: 3001,
          name: "3001",
          queue_number: 5001,
          answered_count: 221,
          answered_receptive_count: 0,
          bina: "3234628481",
        },
        {
          status: "available",
          duration: "00:01:30",
          agent: 3002,
          name: "3002",
          queue_number: 5001,
          answered_count: 224,
          answered_receptive_count: 0,
          bina: "6132256844",
        },
      ],
      agents: [
        {
          agents: ["3001", "3002"],
        },
      ],
      // this.items[0].agents
      icons: [
        { value: "i1", html: '<span class="fal fa-trash-alt"/>' },
        { value: "i2", html: '<span class="fal fa-plus"/>' },
        { value: "i3", html: '<span class="fal fa-air-conditioner"/>' },
        { value: "i4", html: '<span class="fal fa-abacus"/>' },
      ],
      fields: [
        // {
        //   key: "queue_name",
        //   label: this.queue_name,
        //   sortable: true,
        // },

        {
          key: "status",
          label: "Status",
          sortable: true,
        },
        {
          key: "duration",
          label: "Duração",
          sortable: true,
        },
        {
          key: "agent",
          label: "Agente",
          sortable: true,
        },
        {
          key: "queue_number",
          label: "Fila",
          sortable: true,
        },
        {
          key: "answered_count",
          label: '<span class="fal fa-phone-volume fa-1x head-add-button"/>',
        },
        {
          key: "answered_receptive_count",
          label: '<span class="fal fa-phone-slash fa-1x head-add-button"/>',
        },
        {
          key: "bina",
          label: "Falando com: ",
          // Boolean,
        },
      ],
    };
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
#new_row_alerta {
  width: 100%;
  padding: 0.2ch;
  text-align: center;
}

.agent-head-container,
.username-head-container,
.email-head-container,
.perfilName-head-container,
.limite-head-container,
.icone-head-container,
.enable-head-container {
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.agent-head {
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

.agent-body-container,
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
.tabela-pausas > .table.b-table > thead > tr > .table-b-table-default {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}

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

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],
#editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}
</style>