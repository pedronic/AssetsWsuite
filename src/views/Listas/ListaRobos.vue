<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Robôs">
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
              id="status-button"
              class="status-filter-button"
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
          <TabelaRobos
            :items="items"
            :filter="filter"
            :filter_fields="filter_fields"
            v-if="buildTable"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import TabelaRobos from "../../components/DataTables/TabelaRobos.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    TabelaRobos,
  },
  methods: {
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getAgentRobos() {
      let res = await axios.get(baseApiUrl + "/agents?page=29");
      let a = res.data.data;
      let robos = [];
      let first = {};
      let items = [];
      let robo = {};

      for (let i in a) {
        if (a[i].type == "robot") {
          robos.push(a[i].name);
        }
      }
      first.names = [...robos];
      items.push({ ...first });

      for (let i in a) {
        if (a[i].type == "robot") {
          robo.id = a[i].id;
          robo.name = a[i].name;
          robo.login_crm = a[i].login_crm;
          robo.email = a[i].email;
          robo.document = ""; // Não disponível ainda. futuramente: a[i].document;
          robo.last_login = a[i].last_login;
          robo.queue_default = a[i].queue_default;
          robo.flag = a[i].flag ? true : false;
          robo.agent = a[i].agent;
          items.push({ ...robo });
        }
      }
      this.items = [...items];
      console.log("Items @getAgentRobos():\n", this.items);
      this.buildTable = true;
    },
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getAgentRobos();
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
</style>