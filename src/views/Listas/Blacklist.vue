<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Blacklist">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="status-filter"></div>
        </div>
      </div>
    </PagesSubHeader>
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a
              id="one-tab"
              aria-controls="One"
              aria-selected="true"
              class="nav-link active"
              data-toggle="tab"
              href="#subir"
              role="tab"
              >Subir Arquivo</a
            >
          </li>
          <li class="nav-item">
            <a
              id="two-tab"
              aria-controls="Two"
              aria-selected="false"
              class="nav-link"
              data-toggle="tab"
              href="#cadastrar"
              role="tab"
              >Cadastro Manual</a
            >
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div
          id="subir"
          aria-labelledby="one-tab"
          class="tab-pane fade show active p-3"
          role="tabpanel"
        >
          <div class="card">
            <div class="card-body d-flex">
              <div class="d-flex" id="filtro-grupo-pausa">
                <b-form-input
                  v-model="busca"
                  @keydown.enter.native="setFilter(busca, 'subido')"
                ></b-form-input>
                <div class="card">
                  <div class="card-body" />
                </div>
                <b-btn
                  type="submit"
                  id="pesquisa_faturamento"
                  class="btn btn-info waves-effect waves-themed fal fa-search"
                  @click="setFilter(busca, 'subido')"
                />
               
              </div>
            </div>
          </div>
          <!-- v-if="BuildTab" -->
    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaBlacklist :items="items" :filter="filter" :filter_fields="filter_fields" />
        </div>
      </div>
    </div>
        </div>
        <div
          id="cadastrar"
          aria-labelledby="two-tab"
          class="tab-pane fade p-3"
          role="tabpanel"
        >
         <div class="card">
            <div class="card-body d-flex">
              <div class="d-flex" id="filtro-grupo-pausa">
                <b-form-input
                  v-model="busca2"
                  @keydown.enter.native="setFilter2(busca2, 'cadastrado')"
                ></b-form-input>
                <div class="card">
                  <div class="card-body" />
                </div>
                <b-btn
                  type="submit"
                  id="pesquisa_faturamento"
                  class="btn btn-info waves-effect waves-themed fal fa-search"
                  @click="setFilter2(busca2, 'cadastrado')"
                />
                 <b-form-checkbox
                class="ml-2 mt-2"
                  v-model="status_filter2"
                  id="status-filter-button"
                  switch
                  @change="setFilter2(status_filter2, 'status')"
                />
              </div>
            </div>
          </div>
          <TabelaBlacklist2 :items="items2" :filter="filter2" :filter_fields="filter_fields2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";
import TabelaBlacklist from "../../components/DataTables/TabelaBlacklist";
import TabelaBlacklist2 from "../../components/DataTables/TabelaBlacklist2";

export default {
  components: {
    PagesSubHeader,
    TabelaBlacklist,
    TabelaBlacklist2,
  },
  data() {
      return {
      items: [
    {
         subidos: ["Exemplo","Outro Exemplo"],
         },
        { 
            subido: 'exemplo.csv',
            data_importacao: '',
            usuario: '',
            
        },
        { 
            subido: 'outro_exemplo.txt',
            data_importacao: '',
            usuario: '',
        },
      ],
      subidos: [],
      msg: "",
      filter:'',
      filter_fields:[''],
      busca:'',
      status_filter: true,
       items2: [
    {
         cadastrados: ["Exemplo","Outro Exemplo"],
         },
        { 
            DDD: '11',
            cadastrado: '90543-4401',
            usuario: '',
            status: true
            
        },
        { 
            DDD: '21',
            cadastrado: '98642-2854',
            usuario: '',
            status: false
        },
      ],
      cadastrados: [],
      filter2:'',
      filter_fields2:[''],
      busca2:'',
      status_filter2: true,
      }
    
  },
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    },
    setFilter2(filter,field){
      this.filter2 = filter.toString();
      this.filter_fields2.splice(0,1,field);
    }
  },
  mounted() {},
  name: "BlacklistMailing",
};
</script>

<style scoped>
.panel-content {
  overflow: auto;
}
.panel .panel-container .panel-content {
  padding: 0;
}

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
  padding: 0px 5px 10px 5px;
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