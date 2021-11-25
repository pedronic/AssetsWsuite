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
    <TabelaAgentes :filter="filter" :filter_fields="filter_fields" :items="items" :isLoading="loadingPage" v-if="buildTable" :permissions='{add:!adds, edit:!edits, delete:!deletes}'/>
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
import TabelaAgentes from "../../components/DataTables/TabelaAgentes.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

const perpage = 10;

export default {
  name:"ListaAgentes",
  props:{
    //
  },
  components: {
    PagesSubHeader,
    TabelaAgentes,
  },
  methods: {
    getPermission(){
      let page = JSON.parse(localStorage.getItem('__pagesIndexTable'));
      let perms = JSON.parse(localStorage.getItem('__userAccessPages'));
      this.adds = perms[page.Agentes - 1].add;
      this.edits = perms[page.Agentes - 1].edit;
      this.deletes = perms[page.Agentes - 1].delete;
    },
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    showSelectedPage(page) {
      console.log('Selected page:\t',page,'\nCurrent page:\t',this.currentPage);
      this.loadingPage = true;
      this.getNames(page);
      this.loadingPage = false;
    },
    getNames(page) {
      let pag = page.toString();
      axios.get(baseApiUrl + "/agents"+"?page="+pag)
      .then(res => {
        let a = res.data.data;
        let agentes = [];
        let first = {};
        let items = [];
        let agente = {};

          // console.clear();
          // console.log(u);
        // for (let i in a) {
        //   u[i].flag = new Boolean(u[i].flag);
        //   this.items[0].names.push(u[i].name);
        //   this.items.push(u[i]);
        // }
        for(let i in a){
          agentes.push(a[i].name)
        }
        first.names = [...agentes];
        items.push({...first});

        for(let i in a){
          agente.name = a[i].name;
          agente.login_crm = a[i].login_crm;
          agente.email = a[i].email;
          agente.document = '';// Não disponível ainda. futuramente: a[i].document;
          agente.last_login = a[i].last_login; // Não há campo e-mail na tabela de agentes
          agente.flag = a[i].flag?true:false;
          items.push({...agente});
          agente.document = ""; // Não disponível ainda. futuramente: a[i].document;
          agente.company_id = a[i].company_id;
          agente.id = a[i].id;
          agente.queue_default = a[i].queue_default;
          agente.flag = a[i].flag ? true : false;
          agente.agent = a[i].agent;
          agente.journey = a[i].journey;
          items.push({ ...agente });
        }
        // console.log("Items @getNames():\n",items);
        this.items = [...items];
        this.buildTable = true;
        this.total_items = res.data.count;
        this.total_pages = Math.ceil(res.data.count / res.data.limit);
        this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
        console.log("Items @getNames():\n",this.items);
        console.log("Total da tabela:\t",this.total_items,"\tTotal de Páginas:\t",this.total_pages)
      })
    },
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getNames(this.currentPage);
    // this.getPages();
    // this.setDefaultUser();
  },
  data() {
    return {
      adds:null,
      edits:null,
      deletes:null,
      reads:null,
      loadingPage:false,
      msg: "",
      buildTable:false,
      total_items:0,
      total_pages:0,
      currentPage:1,
      perPage:perpage,
      items:null,
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