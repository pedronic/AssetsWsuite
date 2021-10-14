<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Blacklist">

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'Nome')"></b-form-input>
            <div class="card">
              <div class="card-body"/>
            </div>
            <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="setFilter(busca,'Nome')"/>
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
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a id="one-tab" aria-controls="One" aria-selected="true" class="nav-link active" data-toggle="tab" href="#subir"
               role="tab">Subir Arquivo</a>
          </li>
          <li class="nav-item">
            <a id="two-tab" aria-controls="Two" aria-selected="false" class="nav-link" data-toggle="tab" href="#cadastrar"
               role="tab">Cadastro Manual</a>
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div id="subir" aria-labelledby="one-tab" class="tab-pane fade show active p-3" role="tabpanel">

          <TabelaBlacklist/>
        </div>
        <div id="cadastrar" aria-labelledby="two-tab" class="tab-pane fade p-3" role="tabpanel">
          <TabelaBlacklist2/>
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
    TabelaBlacklist2
  },
  data() {
    return {
    };
  },
  mounted() {

  },
  name: "BlacklistMailing"
}


</script>

<style scoped>
.dow-color2 {
  background-color: rgb(13, 109, 157) !important;
}

.col-botoes{
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.col-inputs{
  padding-left: 3px !important;
  padding-right: 10px !important;
}
.panel-content{
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
.dow-color{
  background-color: #1a7f37 !important;
}
</style>