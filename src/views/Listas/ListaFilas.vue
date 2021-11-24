<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Filas">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'queue_number')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'queue_number')"
            />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="enable-filter">
            <b-form-checkbox
              v-model="status_filter"
              id="status-button"
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
          <TabelaFilas_main
            v-if="buildTable"
            :items="items"
            :filter="filter"
            :filter_fields="filter_fields"
          />
        </div>
      </div>
    </div>
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
// import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaFilas_main from "../../components/DataTables/TabelaFilas_main.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios"; //ferramenta responsável pela promise (await)
import { baseApiUrl } from "@/config/global";

const perpage = 10; //quantas vão mostrar por páginas

export default {
  components: {
    PagesSubHeader, //título da página com ícone (via slot)
    TabelaFilas_main,
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
          queues_number: ["Dickerson", "Larsen"],
        },
        {login_crm: "", name: "Macdonald", email:'', document:'', last_login:'', enable: true},
        {login_crm: "", name: "Shaw", email:'', document:'', last_login:'', enable: false},
      ], */
      queues_number: [],
      //dados que serão usados no filtro
      filter: "",
      filter_fields: [""],
      busca: "",
      flag_filter: true,
    };
  },

  methods: {
    showSelectedPage(page) { //request de valores de acordo com a API
      this.loadingPage = true;
      this.getQueues(page);
      this.loadingPage = false;
    },
    setFilter(filter, field) { //método de filtragem: pega o valor recebido (que pode ser true do valor de enable) e envia para o componente
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getQueues(page) {
      let pag = page.toString();
      let res = await axios.get(baseApiUrl + "/queues" + "?page="+pag);
      let a = res.data.data;
      this.total_items = res.data.count;
      this.total_pages = Math.ceil(res.data.count / res.data.limit);
      this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
      let queues = [];
      let first = {};
      let items = [];
      let queue = {};

 //inserindo os dados da requisição no field
      for (let i in a) {
        queues.push(a[i].queue_number);
      }
      first.queues_number = [...queues];
      items.push({ ...first });

      for (let i in a) {
        queue.name_queue = a[i].name_queue;
        queue.queue_number = a[i].queue_number;
        queue.type = a[i].type;
        queue.queue_type = a[i].queue_type;
        queue.queue_id = a[i].queue_id;
        queue.finalization_name = a[i].finalization_name; 
        queue.break_group_id = a[i].break_group_id;
        queue.route_name = a[i].route_name;
        queue.dial_format = a[i].dial_format;
        queue.speedy = a[i].speedy;
        queue.flag = a[i].flag ? true : false;
        items.push({ ...queue });
      }
      console.log("Items @getQueues():\n", this.items);
      this.items = [...items];
      this.buildTable = true; //depois que está tudo ok, ele ativa as tabelas  
    },
  },
  // get
  // post
  // put
  // delete
  created() { //assim que o componente for criado, vamos fazer a consulta a API e inserir na tabela
    this.getQueues(this.currentPage);
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
