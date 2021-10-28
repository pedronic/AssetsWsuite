<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de scripts">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'nome')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'nome')"
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
              @change="setFilter(status_filter, 'status')"
            />
          </div>
        </div>
      </div>
    </PagesSubHeader>

    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaScripts
            :items="items"
            :filter="filter"
            :filter_fields="filter_fields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaScripts from "../../components/DataTables/TabelaScripts.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";


export default {
  components: {
    PagesSubHeader,
    TabelaScripts,
  },
  name: "ListaScripts",
  data() {
    return {
      buildTable: false,
      items: null,
      // {
      //   scripts: ["Exemplo", "Outro Exemplo"],
      // },
      // {
      //   script: 'Exemplo',
      //   criado_em: 'Ex',
      //   MCDU: 'ex@dom.com.br',

      //   status:true
      // },
      // {
      //   script: 'Outro Exemplo',
      //   criado_em: 'Ox',
      //   MCDU: 'ox@dom.com.br',

      //   status:false
      // },

      nomes: [],
      msg: "",
      filter: "",
      filter_fields: [""],
      busca: "",
      status_filter: true,
    };
  },
  methods: {
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
        async getScripts() {
      let res = await axios.get(baseApiUrl + "/scripts");
      let a = res.data.data;
      let nomes = [];
      let first = {};
      let items = [];
      let nome = {};

        // console.clear();
        // console.log(u);
      // for (let i in a) {
      //   u[i].enable = new Boolean(u[i].enable);
      //   this.items[0].names.push(u[i].name);
      //   this.items.push(u[i]);
      // }
      for(let i in a){
        nomes.push(a[i].name)
      }
      first.names = [...nomes];
      items.push({...first});

      for(let i in a){
        nome.name = a[i].name;
        nome.username = a[i].username;
        nome.email = a[i].email;
        nome.enable = a[i].enable?true:false;
        items.push({...nome});
      }
      console.log("Items @getUsers():\n",this.items);
      this.items = [...items];
      this.buildTable = true;      
    },

  },
  created() {
    this.getScripts();
  },

};
</script>

<style>
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