<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de usuários">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'usuario')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'usuario')"
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
              @change="setFilter(status_filter, 'status')"
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
          usuarios: ["Exemplo", "Outro Exemplo"],
        },
        {
          usuario: "Exemplo",
          Nome: "Ex",
          Email: "ex@dom.com.br",
          Perfil: "lado",
          status: true,
        },
        {
          usuario: "Outro Exemplo",
          Nome: "Ox",
          Email: "ox@dom.com.br",
          Perfil: "azimutal",
          status: false,
        },
      ],
      usuarios: [],
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
    async getUsers() {
      let res = await axios.get(baseApiUrl + "/users");
      let u = res.data.data;
      console.clear();
      console.log(u);
    //   let users = [];
    //   let metaUsers = [];
    //   let metaData = {};
    //   let metaID = {};
    //   let user = {};
    //   // {
    //   //     name: '',
    //   //     id: '',
    //   //     data:[]
    //   // };
    //   let data = {};
    //   // {
    //   //     name:'',
    //   //     page_id:null,
    //   //     modulo_name:'',
    //   //     add:null,
    //   //     read:null,
    //   //     edit:null,
    //   //     delete:null,
    //   //     browser:null,
    //   // };
    //   for (let i in u) {
    //     if (metaUsers.indexOf(u[i].perfil_name) < 0) {
    //       metaUsers.push(u[i].perfil_name);
    //       metaData[u[i].perfil_name] = [i];
    //       metaID[u[i].perfil_name] = [u[i].perfil_id];
    //     } else {
    //       metaData[u[i].perfil_name].push(i);
    //     }
    //   }
    //   // console.log("Meta Users:\n",metaUsers,"\nMeta Data:\n",metaData);
    //   for (let i in metaUsers) {
    //     user.name = metaUsers[i];
    //     user.id = metaID[metaUsers[i]];
    //     user.data = [];

    //     for (let j in metaData[metaUsers[i]]) {
    //       data.name = u[metaData[metaUsers[i]][j]].page_name;
    //       data.page_id = u[metaData[metaUsers[i]][j]].page_id;
    //       data.modulo_name = u[metaData[metaUsers[i]][j]].modulo_name;
    //       data.add = u[metaData[metaUsers[i]][j]].add ? true : false;
    //       data.read = u[metaData[metaUsers[i]][j]].read ? true : false;
    //       data.edit = u[metaData[metaUsers[i]][j]].edit ? true : false;
    //       data.delete = u[metaData[metaUsers[i]][j]].delete ? true : false;
    //       data.browser = u[metaData[metaUsers[i]][j]].browser ? true : false;
    //       user.data.push({ ...data });
    //     }
    //     users.push({ ...user });
    //   }
    //   // console.log("Users:\n",users)
    //   this.users = [...users];
    },
    // getPages() {
    //   this.defaultAccessPages = JSON.parse(
    //     localStorage.getItem("__defaultAccessPages")
    //   );
    //   this.pagesIndexTable = JSON.parse(
    //     localStorage.getItem("__pagesIndexTable")
    //   );
    //   // console.log("Default Access Pages:\n",this.defaultAccessPages);
    // },
    // setDefaultUser() {
    //   this.defaultUserData = { ...defaultNewUserProfile };
    //   // console.log("Default User Data:\n",this.defaultUserData);
    // },
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
}
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