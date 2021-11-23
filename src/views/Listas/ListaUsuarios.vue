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
    v-if="buildTable"
      :items="items"
      :filter="filter"
      :filter_fields="filter_fields"
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
</template>

<script>
// import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from "../../components/DataTables/TabelaUsuariosCadastrados.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

const perpage = 10;

export default {
  components: {
    PagesSubHeader,
    TabelaUsuariosCadastrados,
  },
  methods: {
    showSelectedPage(page) {
      this.loadingPage = true;
      this.getUsers(page);
      this.loadingPage = false;
    },
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getUsers(page) {
      let pag = page.toString();
      let res = await axios.get(baseApiUrl + "/users"+"?page="+pag);
      // console.log("Resposta de Usuários endpoint:\n",res);
      let a = res.data.data;
      this.total_items = res.data.count;
      this.total_pages = Math.ceil(res.data.count / res.data.limit);
      this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
      let usuarios = [];
      let first = {};
      let items = [];
      let usuario = {};

        // console.clear();
        // console.log(u);
      // for (let i in a) {
      //   u[i].enable = new Boolean(u[i].enable);
      //   this.items[0].names.push(u[i].name);
      //   this.items.push(u[i]);
      // }
      for(let i in a){
        usuarios.push(a[i].name)
      }
      first.names = [...usuarios];
      items.push({...first});

      for(let i in a){
        usuario.name = a[i].name;
        usuario.username = a[i].username;
        usuario.email = a[i].email;
        usuario.profileName = '';// Não disponível ainda. futuramente: a[i].profileName;
        usuario.enable = a[i].enable?true:false;
        items.push({...usuario});
      }
      console.log("Items @getUsers():\n",this.items);
      this.items = [...items];
      this.buildTable = true;      
    },
    
  },
  // get
  // post
  // put
  // delete
  created() {
    this.getUsers(this.currentPage);
    // this.getPages();
    // this.setDefaultUser();
  },
  data() {
    return {
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
        {login_crm: "", name: "Macdonald", email:'', document:'', last_login:'', enable: true},
        {login_crm: "", name: "Shaw", email:'', document:'', last_login:'', enable: false},
      ], */
      names: [],
      filter: '',
      filter_fields: [''],
      busca: '',
      flag_filter: true,
    };
  }
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