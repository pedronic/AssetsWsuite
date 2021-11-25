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
    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaServidores
            :items="items"
            :filter="filter"
            :filter_fields="filter_fields"
            v-if="buildTable"
            :isLoading="loadingPage"
          />
          <b-container fluid class="salvar-container">
            <b-pagination
              v-model="currentPage"
              :total-rows="total_items"
              :per-page="perPage"
              prev-class="single-arrow-button"
              next-class="single-arrow-button"
              ellipsis-text="···"
              @change="showSelectedPage"
            />
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaServidores from "../../components/DataTables/TabelaServidores.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios"; //ferramenta responsável pela promise (await)
import { baseApiUrl } from "@/config/global";

const perpage = 10;

export default {
  components: {
    PagesSubHeader, //título da página com ícone (via slot) 
    TabelaServidores,
  },
    data() {
    return {
      msg: "",
      buildTable: false, //habilitado sempre que a tabela há de carregar novos dados
      items: null,
      // PAGINAÇÃO
      currentPage: 1,
      perPage: perpage,
      loadingPage: false,
      total_pages: 0,
      total_items: 0,
      //FIM DADOS PAGINAÇÃO
      /* [
        {
          names: ["Dickerson", "Larsen"],
        },
        {login_crm: "", name: "Macdonald", email:'', document:'', last_login:'', flag: true},
        {login_crm: "", name: "Shaw", email:'', document:'', last_login:'', flag: false},
      ], */
      names: [],
            //dados que serão usados no filtro
      filter: "",
      filter_fields: [""],
      busca: "",
    };
  },

  methods: {
    showSelectedPage(page) {
      this.loadingPage = true;
      this.getServers(page);
      this.loadingPage = false;
    },

    setFilter(filter, field) { //método de filtragem: pega o valor recebido (que pode ser true do valor de enable) e envia para o componente
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getServers(page) { //pega os servidores da API
      let pag = page.toString();
      let res = await axios.get(baseApiUrl + "/servers" + "?page=" + pag);
      let a = res.data.data;
      this.total_items = res.data.count;
      this.total_pages = Math.ceil(res.data.count / res.data.limit);
      this.perPage = res.data.limit > perpage ? res.data.limit : perpage;
      let servers = [];
      let first = {};
      let items = [];
      let server = {};

      //inserindo os dados da requisição no field
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
      this.buildTable = true; //depois que está tudo ok, ele ativa as tabelas  
    },
  },
  // get
  // post
  // put
  // delete
  created() { //assim que o componente for criado, vamos fazer a consulta a API e inserir na tabela
    this.getServers(this.currentPage);
    // this.getPages();
    // this.setDefaultUser();
  },
};
</script>

<style scoped>

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
</style>
