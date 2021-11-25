<template>
  <div class="pausas" v-show="buildTable">
    <b-table
      id="tabela-de-pausas"
      :ref="'tabela-de-pausas'"
      class="
        tabela-dash
        table-sm table-hover table-striped
        dtr-inline
        w-100
      "
      :items="items"
      :responsive="true"
      :fields="fields"
      sticky-header
    >
        <!--editando os headers das tabelas-->

      <template v-slot:head(iten)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(quantity)="data">
        <span>{{ data.label }}</span>
      </template>

      <!--Editando cada célula da tebela-->
      <template v-slot:cell(iten)="slot">
        <span :id="slot.item.iten + '_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(quantity)="slot">
        <span :id="slot.item.iten + '_alerta'">{{ slot.value }}</span>
      </template>
    </b-table>
    <!-- ---------------------------------------------------- -->
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/config/global";
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)

const defaultRow = { //linha para se exibir alguma coisa na tela caso ocorra alguma falha na requisição de dados
  iten: "",
  username: false,
  email: false,
  perfilName: "",
  limite: "",
  icone: "",
  enable: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name: "TabelaFilaDashAnalytic",
  mixins: [ValidateToaster],
  props: { //recebe os itens, o parâmetro de filtragem e os campos a serem filtrados
    id: String,
  },
  data() {
    return {
      referential: 0,
      buildTable: false,
      newRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha criada
      editRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha editada
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      msg: "",
      items: [],
      // this.items.slice(1, this.items.length)
      filas: [ //campos de teste
        {
          status: "available",
          duration: "00:00:42",
          iten: 3001,
          name: "3001",
          queue_number: 5001,
          answered_count: 221,
          answered_receptive_count: 0,
          bina: "3234628481",
        },
        {
          status: "available",
          duration: "00:01:30",
          iten: 3002,
          name: "3002",
          queue_number: 5001,
          answered_count: 224,
          answered_receptive_count: 0,
          bina: "6132256844",
        },
      ],
      itens: [],
      // this.items[0].itens
      fields: [ //todas as colunas que receberam chave e valores
        {
          key: "iten",
          label: "Item",
          sortable: true,
          thStyle: "width: 10%",
        },
        {
          key: "quantity",
          label: "Quantidade",
          thStyle: "text-align: center",
        },
      ],
    };
  },

  methods: {
    setBrowserData(items) {
      sessionStorage.setItem(`monitorando ${this.id}`, JSON.stringify(items));
      var cache = JSON.parse(sessionStorage.getItem(`monitorando ${this.id}`));
      this.items = [...cache];
      this.buildTable = true;

      setTimeout(() => {
        this.getFields();
      }, 10000);
    },

    async getFields() {
      let res = await axios.get(
        baseApiUrl + `/dashboardAnalytics/?queue_number=${this.id}`
      );
      let param = res.data.data[0];
      let items = [];
      var item = {};
      var itens = [];
      var quantities = [];

      Object.keys(param).map(function(key) {
        itens.push(key);
      });
      Object.values(param).map(function(key) {
        quantities.push(key);
      });

      for (let u in itens) {
        item.iten = itens[u];
        item.quantity = quantities[u];
        items.push({ ...item });
      }
      console.log(items);
      const onViewItems = items.slice(6)
      this.setBrowserData(onViewItems);
    },

  },
  created() { //insere a nova linha no cache do navegador (em tempo de desenvolvimento)
    this.newRowDefault = { ...defaultRow };
    this.getFields();
    // parseInt(this.id)
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    // localStorage.setItem(
    //   "__pedro-dev",
    //   JSON.stringify(this.items.slice(1, this.items.length))
    // );
    // this.editRowInput = this.filas;
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  // created() {
  // },
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
};
</script>

<style>
.pausas {
  display: inline !important;
}

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
#new_row_alerta { /*implementado no futuro modal*/
  width: 100%;
  padding: 0.2ch;
  text-align: center;
}

.iten-head-container,
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

.iten-head {
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

.iten-body-container,
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
.b-table-sticky-header > .table.b-table > thead > tr > th { /*estilização padrão dos headers*/
    position: sticky I !important;
    top: -1px !important;
    z-index: 2 !important;
}
/* estilização do íconezinho de sort */
/*--------------------------![COMEÇO]!------------------------------------------------------*/
.tabela-dash
  > .table.b-table.table-sm
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
.tabela-dash
  > .table.b-table.table-sm
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.tabela-dash > .table.b-table > thead > tr > [aria-sort="none"],
.tabela-dash > .table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
.tabela-dash > .table.b-table > thead > tr > [aria-sort="ascending"],
.tabela-dash > .table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-dash > .table.b-table > thead > tr > [aria-sort="descending"],
.tabela-dash > .table.b-table > tfoot > tr > [aria-sort="descending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
/*--------------------------![FIM]!------------------------------------------------------*/

.tabela-dash > .table.b-table > thead > tr > .table-b-table-default { /*Header*/
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}
/*------------------------------Edição individual de cada coluna por sequência em que aparecem------------------------------------*/
.tabela-dash > .table.b-table > tbody > tr > [aria-colindex="1"],
.tabela-dash > .table.b-table > thead > tr > [aria-colindex="1"] {
  text-align: left !important;
}
.tabela-dash > .table.b-table > tbody > tr > [aria-colindex="2"]{
  text-align: right !important;
}


</style>
