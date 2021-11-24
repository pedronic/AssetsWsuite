<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Operadoras">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-operadora">
            <b-form-input
              v-model="busca"
              @keydown.enter.native="setFilter(busca, 'operadora')"
            ></b-form-input>
            <div class="card">
              <div class="card-body" />
            </div>
            <b-btn
              type="submit"
              id="pesquisa_faturamento"
              class="btn btn-info waves-effect waves-themed fal fa-search"
              @click="setFilter(busca, 'operadora')"
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
    </PagesSubHeader>
  <!-- Cabeçalho: FIM -->
    <TabelaOperadoras :items="items" :filter="filter" :filter_fields="filter_fields" v-if="buildTable" :isLoading="loadingPage" :permissions='{add:!adds, edit:!edits, delete:!deletes}'/>
    <b-container fluid class="salvar-container">
            <b-pagination
              v-model="currentPage"
              :total-rows="total_items"
              :per-page="perPage"
              aria-controls="my-table"
              prev-class="single-arrow-button"
              next-class="single-arrow-button"
              ellipsis-text="···"
              @change="showSelectedPage"
            />
        <!-- </b-container>
        <b-container fluid class="salvar-container"> -->
        </b-container>
  </div>
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaOperadoras from "../../components/DataTables/TabelaOperadoras.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import { baseApiUrl } from "../../config/global";

export default {
  name: "ListaOperadoras",
  mixins: [ValidateToaster],
  components: {
    PagesSubHeader,
    TabelaOperadoras,
  },
  methods: {
    getPermission(){
      let page = JSON.parse(localStorage.getItem('__pagesIndexTable'));
      let perms = JSON.parse(localStorage.getItem('__userAccessPages'));
      this.adds = perms[page.Operadoras - 1].add;
      this.edits = perms[page.Operadoras - 1].edit;
      this.deletes = perms[page.Operadoras - 1].delete;

    },
    async getOperadoras() {
      this.getPermission();
      let res = await axios.get(baseApiUrl + "/operators");
      let p = res.data.data;
      let operadoras = [];
      let first = {};
      let items = [];
      let operadora = {};

      for (let i in p) {
        operadoras.push(p[i].name);
      }
      first.operadoras = [...operadoras];
      items.push({ ...first });

      for (let i in p) {
        operadora.operadora = p[i].name;
        operadora.IP = p[i].host;
        operadora.porta = p[i].port;
        operadora.contexto = p[i].context;
        operadora.id = p[i].id;
        operadora.local = p[i].flag_local ? true : false;
        operadora.LDN = p[i].flag_ldn ? true : false;
        operadora.VC1 = p[i].flag_vc1 ? true : false;
        operadora.VC2 = p[i].flag_vc2 ? true : false;
        operadora.VC3 = p[i].flag_vc3 ? true : false;
        operadora.LDI = p[i].flag_ldi ? true : false;
        operadora.status = p[i].status ? true : false;
        operadora.secret = p[i].secret;
        operadora.dial_format = p[i].dial_format;
        items.push({ ...operadora });
      }
      console.log("Items:\n", items);
      this.items = [...items];
      this.buildTable = true;
    },
    setFilter(filter, field) {
      this.filter = filter.toString();
      this.filter_fields.splice(0, 1, field);
    },
  },
  created() {
    this.getOperadoras();
    this.service = new UsuarioMetodos(this.$resource);
    this.service.list().then(
      (usuarios) => (this.usuarios = usuarios),
      (err) => {
        console.log(err);
        this.msg = err.message;
      }
    );
  },
  computed: {
    UsuarioFiltrado() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), "i");
        return this.usuarios.filter((usuario) => exp.test(usuario.user));
      } else {
        return this.usuarios;
      }
    },
  },
  data() {
    return {
      adds:null,
      edits:null,
      deletes:null,      
      items: null,
      /* [
        {
          operadoras: ["Exemplo","Outro Exemplo"],
        },
        {
          operadora: 'Exemplo',
          IP: '192.168.0.226',
          porta: '8080',
          contexto: '',
          local: true,
          LDN: true,
          VC1: false,
          VC2: false,
          VC3: false,
          LDI: false,
          status:true,
          secret:''
        },
        {
          operadora: 'Outro Exemplo',
          IP: '192.168.0.296',
          porta: '3000',
          contexto: '',
          local: true,
          LDN: false,
          VC1: true,
          VC2: false,
          VC3: false,
          LDI: false,
          status:true,
          secret:''
        },
      ], */
      operadoras: [],
      msg: "",
      filter: "",
      filter_fields: [""],
      busca: "",
      status_filter: true,
      buildTable: false,
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
.d-flex#filtro-grupo-operadora {
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