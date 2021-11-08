<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de agentes">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'name')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'name')"
            />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="status-filter">
            <b-form-checkbox
              v-model="status_filter"
              id="status-filter-button"
              switch
              @change="setFilter(status_filter, 'flag')"
            />
          </div>
        </div>
      </div>
    </PagesSubHeader>
    <!-- Cabeçalho: FIM -->
    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaAgentes
            :filter="filter"
            :filter_fields="filter_fields"
            :items="items"
            v-if="buildTable"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaAgentes from "../../components/DataTables/TabelaAgentes.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    TabelaAgentes,
  },
  methods: {
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getNames() {
      let res = await axios.get(baseApiUrl + "/agents?page=29");
      let a = res.data.data;
      let agentes = [];
      let first = {};
      let items = [];
      let agente = {};
      for (let i in a) {
        if (a[i].type == "human") {
          agentes.push(a[i].name);
        }
      }
      first.names = [...agentes];
      items.push({ ...first });

      for (let i in a) {
        if (a[i].type == "human") {
          agente.name = a[i].name;
          agente.login_crm = a[i].login_crm;
          agente.email = a[i].email;
          agente.document = ""; // Não disponível ainda. futuramente: a[i].document;
          agente.last_login = a[i].last_login;
          agente.id = a[i].id;
          agente.queue_default = a[i].queue_default;
          agente.flag = a[i].flag ? true : false;
          agente.agent = a[i].agent;
          items.push({ ...agente });
        }
      }
      console.log("Items @getNames():\n", this.items);
      this.items = [...items];
      this.buildTable = true;
    },
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getNames();
    // this.getPages();
    // this.setDefaultUser();
  },
  data() {
    return {
      msg: "",
      buildTable: false,
      items: null,
      /* [
        {
          names: ["Dickerson", "Larsen"],
        },
        {login_crm: "", name: "Macdonald", email:'', document:'', last_login:'', flag: true},
        {login_crm: "", name: "Shaw", email:'', document:'', last_login:'', flag: false},
      ], */
      names: [],
      filter: "",
      filter_fields: [""],
      busca: "",
      flag_filter: true,
    };
  },
};
</script>

<style scoped>
.col-botoes {
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.panel-content {
  overflow: auto;
}
.panel .panel-container .panel-content {
  padding: 0;
}

.col-inputs {
  padding-left: 3px !important;
  padding-right: 10px !important;
}

.panel-content {
  overflow: auto;
}

.panel .panel-container .panel-content {
  padding: 0;
}

.card-body {
  padding: 5px;
  /* height: 50px; */
  /* width: 0;
  border: 0px;
  color: #ffffff transparent; */
}

.card > .card-body > .d-flex > button#pesquisa_faturamento {
  margin-right: 0.3rem !important;
}

.card > .card-body > .d-flex > button,
input {
  height: 38px !important;
}

.d-flex#filtro-grupo-pausa {
  height: 38px !important;
}

.card {
  box-shadow: none;
  border: none;
}

.dow-color {
  background-color: #1a7f37 !important;
}

.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}

.user-name-line2 {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  /* border-top-width: 2px;
    border-bottom-width: 2px; */
  height: 42px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}

#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}

#profile-name-input2 {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
</style> 