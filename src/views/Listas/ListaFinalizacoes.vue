<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de finalizacoes">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'finalizacao')"></b-form-input>
            <div class="card">
              <div class="card-body"/>
            </div>
            <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="setFilter(busca,'finalizacao')"/>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="status-filter">
            <b-form-checkbox v-model="status_filter" id="status-filter-button" switch @change="setFilter(status_filter,'status')"/>
          </div>
        </div>
      </div>

    </PagesSubHeader>
    <!-- Cabeçalho: FIM -->

    <TabelaFinalizacoes :items="items" :filter="filter" :filter_fields="filter_fields"/>
        </div>
      
    
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaFinalizacoes from '../../components/DataTables/TabelaFinalizacoes.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'
import axios from 'axios';
import {baseApiUrl} from '../../config/global.js';


export default {
  components: {
    PagesSubHeader,
    TabelaFinalizacoes,
  },
  name: "ListaFinalizacoes",
  data() {
    return {
      items: [
        {
          finalizacoes: ["Exemplo","Outro Exemplo"],
        },
        {
          finalizacao: 'Exemplo',
          ID: 'Ex',
          descricao: 'ex@dom.com.br',
          CPC: true,
          CPCA: true,
          alega_pgto: false,
          promessav: true,
          status:true
        },
        {
          finalizacao: 'Outro Exemplo',
          ID: 'Ox',
          descricao: 'ox@dom.com.br',
          CPC: false,
          CPCA: true,
          alega_pgto: false,
          promessav: false,
          status:true
        },
      ],
      finalizacoes: [],
      msg: "",
      filter:'',
      filter_fields:[''],
      busca:'',
      status_filter: true,
    };
  },
  methods: {
    getFinalizationData(){
      axios.get(baseApiUrl+'/finalizations'+'/1')
      .then(res => {
        console.log("Status:\t",res.status," - ",res.statusText);
        let f = res.data.data;
        let parsed = JSON.parse(f[0].columns);
        console.log("Dados recebidos:\n",f,"\nColumns parsed:\n",parsed);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
      })
    },
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    }
  },
  created() {
    this.getFinalizationData();
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

.card-body{
  padding: 5px;
  /* height: 50px; */
  /* width: 0;
  border: 0px;
  color: #ffffff transparent; */
}
.card > .card-body > .d-flex > button#pesquisa_faturamento{
  margin-right: 0.3rem !important;
}
.card > .card-body > .d-flex > button,input{
  height: 38px !important;
}
.d-flex#filtro-grupo-pausa{
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