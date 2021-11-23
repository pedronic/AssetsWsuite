<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Scripts">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-script">
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
          <TabelaScripts :items="items" :filter="filter" :filter_fields="filter_fields" v-if="dataOK"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaScripts from '../../components/DataTables/TabelaScripts.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'
import axios from 'axios';
import {baseApiUrl} from '../../config/global';

export default {
  components: {
    PagesSubHeader,
    TabelaScripts,
  },
  name: "ListaScripts",
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    },
    getScripts(){
      axios.get(baseApiUrl+"/scripts")
      .then(res => {
        let s = res.data.data;
        let scripts = [];
        let first = {};
        let items = [];
        
        for(let i in s){
            scripts.push(s[i].name);
        }
        first.scripts = [...scripts];
        items.push({...first});

        for(let i in s){
            let script = {};
            script.script = s[i].name;
            console.log("Date:\n",s[i].created_at)
            let date = new Date(s[i].created_at);
            script.criado_em = date.toLocaleString('pt-BR');
            script.created_at = s[i].created_at;
            script.MCDU = s[i].mcdu;
            script.status = s[i].status?true:false;
            script.id = s[i].id;
            items.push({...script});
        }
        console.log("Items:\n",items);
        this.items = [...items];
        this.dataOK = true;
      })
    }
  },
  created() {
    this.getScripts();
  },
  computed: {
    UsuarioFiltrado() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), "i");
        return this.usuarios.filter((usuario) => exp.test(usuario.user));
      } else {
        return this.usuarios;
      }
    }
  },
  data() {
    return {
      dataOK:false,
      items: null,
      /* [
        {
          scripts: ["Exemplo", "Outro Exemplo"],
        },
        {
          script: 'Exemplo',
          criado_em: 'Ex',
          MCDU: 'ex@dom.com.br',
          
          status:true
        },
        {
          script: 'Outro Exemplo',
          criado_em: 'Ox',
          MCDU: 'ox@dom.com.br',
          
          status:false
        },
      ], */
      scripts: [],
      msg: "",
      filter: "",
      filter_fields: [""],
      busca: "",
      status_filter: true,
    };
  },
}
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
.d-flex#filtro-grupo-script{
  height: 38px !important;
}

.card {
  box-shadow: none;
  border: none;
}
</style> 