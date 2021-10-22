<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de scripts">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'script')"></b-form-input>
            <div class="card">
              <div class="card-body"/>
            </div>
            <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="setFilter(busca,'script')"/>
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
    
    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaScripts :items="items" :filter="filter" :filter_fields="filter_fields"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaScripts from '../../components/DataTables/TabelaScripts.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    PagesSubHeader,
    TabelaScripts,
  },
  name: "ListaScripts",
  data() {
    return {
      items: [
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
      ],
      scripts: [],
      msg: "",
      filter:'',
      filter_fields:[''],
      busca:'',
      status_filter: true,
    };
  },
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    }
  },
  created() {
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

<style>
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

</style> 