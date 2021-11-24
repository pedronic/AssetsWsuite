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
              id="status-button"
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
        <!-- Cabeçalho: FIM -->
    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content">

    <TabelaUsuariosCadastrados
    v-if="buildTable"
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
// import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from "../../components/DataTables/TabelaUsuariosCadastrados.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios"; //ferramenta responsável pela promise (await)
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader, //título da página com ícone (via slot)
    TabelaUsuariosCadastrados,
  },
    data() {
    return {
      buildTable:false, //habilitado sempre que a tabela há de carregar novos dados
      items:null,
      /* [ modelo de como os dados devem vir
        {
          names: ["Dickerson", "Larsen"],
        },
        {login_crm: "", name: "Macdonald", email:'', document:'', last_login:'', enable: true},
        {login_crm: "", name: "Shaw", email:'', document:'', last_login:'', enable: false},
      ], */
      names: [],
      //dados que serão usados no filtro
      filter: '',
      filter_fields: [''],
      busca: '',
    };
  },

  methods: {
    setFilter(filter, field) { //método de filtragem: pega o valor recebido (que pode ser true do valor de enable) e envia para o componente
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
    async getUsers() {
      let res = await axios.get(baseApiUrl + "/users?page=2");
      let a = res.data.data;
      let usuarios = [];
      let first = {};
      let items = [];
      let usuario = {};

      for(let i in a){
        usuarios.push(a[i].name)
      }
      first.names = [...usuarios];
      items.push({...first});

      for(let i in a){
        usuario.name = a[i].name;
        usuario.username = a[i].username;
        usuario.email = a[i].email;
        usuario.id = a[i].id;
        usuario.perfilName = a[i].perfilName;// Não disponível ainda. futuramente: a[i].profileName;
        usuario.enable = a[i].enable ? true : false;
        items.push({...usuario});
      }
      console.log("Items @getUsers():\n",this.items);
      this.items = [...items];
      this.buildTable = true; //depois que está tudo ok, ele ativa as tabelas  
    },
    
  },
  created() { //assim que o componente for criado, vamos fazer a consulta a API e inserir na tabela
    this.getUsers();
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