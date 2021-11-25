<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Robôs">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'agent')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'agent')"
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

    <TabelaRobos :items="items" :filter="filter" :filter_fields="filter_fields" :isLoading="loadingPage" v-if="buildTable"/>
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
</template>

<script>
// import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import TabelaRobos from "../../components/DataTables/TabelaRobos.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios"; //ferramenta responsável pela promise (await)
import { baseApiUrl } from "@/config/global";

const perpage = 10;

export default {
  components: {
    PagesSubHeader,
    TabelaRobos,
  },
  methods: {
    setFilter(filter, field) { //método de filtragem: pega o valor recebido (que pode ser true do valor de enable) e envia para o componente
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    showSelectedPage(page) {
      console.log('Selected page:\t',page,'\nCurrent page:\t',this.currentPage);
      this.loadingPage = true;
      this.getAgentRobos(page);
      this.loadingPage = false;
    },
    async getAgentRobos(page) {
      let pag = page.toString();
      let res = await axios.get(baseApiUrl + "/robos"+"?page="+pag);
      let a = res.data.data;
      this.total_items = res.data.count;
      this.total_pages = Math.ceil(res.data.count / res.data.limit);
      this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
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
          robo.agent = a[i].agent; // Não disponível ainda. futuramente: a[i].document;
          robo.last_login = a[i].last_login;
          robo.queue_default = a[i].queue_default;
          robo.flag = a[i].flag ? true : false;
          robo.agent = a[i].agent;
          items.push({ ...robo });
        }
      }
      this.items = [...items];
      console.log("Items @getAgentRobos():\n", this.items);
      this.buildTable = true; //depois que está tudo ok, ele ativa as tabelas  
    },
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getAgentRobos(this.currentPage);
    // this.getPages();
    // this.setDefaultUser();
  },
  data() {
    return {
      loadingPage:false,
      total_items:0,
      total_pages:0,
      currentPage:1,
      perPage:perpage,
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