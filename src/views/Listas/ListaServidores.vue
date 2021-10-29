<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Servidores">
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

    <TabelaServidores
      :items="items"
      :filter="filter"
      :filter_fields="filter_fields"
      v-if="buildTable"
    />
  </div>
</template>

<script>
import TabelaServidores from "../../components/DataTables/TabelaServidores.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    TabelaServidores,
  },
  methods: {
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getServers() {
      let res = await axios.get(baseApiUrl + "/servers");
      let a = res.data.data;
      let servers = [];
      let first = {};
      let items = [];
      let server = {};

      // console.clear();
      // console.log(u);
      // for (let i in a) {
      //   u[i].flag = new Boolean(u[i].flag);
      //   this.items[0].names.push(u[i].name);
      //   this.items.push(u[i]);
      // }
      for (let i in a) {
        servers.push(a[i].name);
      }
      first.names = [...servers];
      items.push({ ...first });

      for (let i in a) {
        server.id = a[i].id;
        server.name = a[i].name;
        server.type = a[i].type;
        server.ip = a[i].ip;
        server.flag = a[i].flag ? true : false;
        server.gateway_ext = a[i].gateway_ext;
        server.gateway_sip_user = a[i].gateway_sip_user;
        server.gateway_domain = a[i].gateway_domain;
        items.push({ ...server });
      }
      console.log("Items @getServers():\n", this.items);
      this.items = [...items];
      this.buildTable = true;
    },
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getServers();
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
.dow-color2 {
  background-color: rgb(13, 109, 157) !important;
}

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