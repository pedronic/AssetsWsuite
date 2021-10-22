<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de usuários">
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
          <div class="d-flex" id="enable-filter">
            <b-form-checkbox
              v-model="status_filter"
              id="enable-filter-button"
              switch
              @change="setFilter(status_filter, 'enable')"
            />
          </div>
        </div>
      </div>

      <!-- <div class="card">
        <div class="card-body d-flex">
          <router-link class="d-flex" id="add-grupo-pausa" :to="{path:'/registro-usuarios',params:{nome:''}}" >
            <b-btn variant="success" class="fal fa-plus"/>
          </router-link>
        </div>
      </div> -->
    </PagesSubHeader>
    <!-- Cabeçalho: FIM -->

    <TabelaUsuariosCadastrados
      :items="items"
      :filter="filter"
      :filter_fields="filter_fields"
    />
  </div>
</template>

<script>
// import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from "../../components/DataTables/TabelaUsuariosCadastrados.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    TabelaUsuariosCadastrados,
  },
  data() {
    return {
      items: [
        {
          names: ["Exemplo", "Outro Exemplo"],
        },
        {
          name: "Exemplo",
          username: "Ex",
          email: "ex@dom.com.br",
          perfilName: "lado",
          enable: true,
        },
        {
          name: "Outro Exemplo",
          username: "Ox",
          email: "ox@dom.com.br",
          perfilName: "azimutal",
          enable: false,
        },
      ],
      names: [],
      msg: "",
      filter: "",
      filter_fields: [""],
      busca: "",
      enable_filter: true,
    };
  },

  methods: {
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getUsers() {
      let res = await axios.get(baseApiUrl + "/users");
      let u = res.data.data;
        console.clear();
        console.log(u);
      for (let i in u) {
        u[i].enable = Boolean(u[i].enable);
        this.items[0].names.push(u[i].username);
        this.items.push(u[i]);
      }
      console.log(this.items);

      
    },
    
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getUsers();
    // this.getPages();
    // this.setDefaultUser();
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