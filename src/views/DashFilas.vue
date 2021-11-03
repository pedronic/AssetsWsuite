<template>
  <div class="relatorios">
    <pages-sub-header>
      <form class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-1 col-botoes">
              <button
                type="submit"
                name="pesquisa-faturamento"
                class="btn btn-success waves-effect waves-themed dow-color"
              >
                <i class="fal fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </pages-sub-header>
    {{ selectedQueues }}
    <!-- TAB ITERÁVEL [INÍCIO] -->
    <div v-if="BuildTab" class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist" v-for="d in selectedQueues" :key="d.name">
          <li class="nav-item">
            <a
              :id="d.name"
              :aria-controls="d.name"
              :aria-selected="d === 0 ? 'true' : 'false'"
              :class="'nav-link' + d === 0 ? 'active' : ''"
              data-toggle="tab"
              :href="'#' +d.name"
              role="tab"
              >Fila {{ d.name }}</a
            >
          </li>
          <!-- <li class="nav-item">
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
          </li> -->
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div
          id="subir"
          aria-labelledby="one-tab"
          class="tab-pane fade show active p-3"
          role="tabpanel"
        >
          <!-- <TabelaBlacklist :items="items" :filter="filter" :filter_fields="filter_fields" /> -->
        </div>
        <!-- <div
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
        </div> -->
      </div>
    </div>
    <!-- FIM TAB ITERÁVEL -->
    <div class="panel">
      <div class="panel-container show">
        <div class="panel-content"></div>
      </div>
    </div>
    <!-- Modal de adição [Início] -->
    <b-modal
      v-model="modalShow"
      id="new_line"
      size="lg"
      ok-only
      ok-title="Salvar"
      ok-variant="info"
      @ok="refresh()"
      modalShow = !modalShow
      title=" "
    >
                <div class="profile-content user-name-line d-flex">
              <i class="fal fa-road fa-2x" style="margin-left: 5px" />

      <div id="multiselect-input">
        <multiselect
          v-model="selectedQueues"
          :placeholder="'Filas'"
          :label="'name'"
          :track-by="'code'"
          :options="uploadedQueues"
          :multiple="true"
          :selectLabel="MSprops.selectLabel"
          :selectGroupLabel="MSprops.selectGroupLabel"
          :selectedLabel="MSprops.selectedLabel"
          :deselectLabel="MSprops.deselectLabel"
          :deselectGroupLabel="MSprops.deselectGroupLabel"
        />
      </div>
                </div>
      <!-- <QueueAdder /> -->
      <!-- {{ operadoras_criadas }} -->
    </b-modal>
    <!-- Modal de edição [Fim] -->
  </div>
</template>

<script>
// import QueueAdder from './QueueAdder.vue'
import PagesSubHeader from "../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import { vueMultiselectProps } from "../config/global";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
    //   QueueAdder,
    //   TabelaRelatorioFaturamento
  },
  name: "DashFilas",
  methods: {
    getQueues() {
      axios.get(baseApiUrl + "/queues").then((f) => {
        let queue = f.data.data;
        let queues = [];
        console.log("f.data.data\n", f.data.data);
        for (let u in queue) {
          let fila = {};
          fila.name = queue[u].name;
          fila.code = queue[u].name;
          queues.push({ ...fila });
        }
        this.uploadedQueues = [...queues];
      });
    },
    refresh() {
        this.BuildTab = true;
        this.modalShow = !(this.modalShow);
    }
  },

  data() {
    return {
      BuildTab: false,
      selectedQueues: [],
      uploadedQueues: [],
      queues: {},
      modalShow: true,
      MSprops: vueMultiselectProps,
    };
  },
  mounted() {
    this.getQueues();
  },
  props: {},
};
</script>

<style>
.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}

.panel-content {
  overflow: auto;
}
.panel .panel-container .panel-content {
  padding: 0;
}
.card-body {
  padding: 5px;
}
.conteiner {
  padding: 0;
}
.col-botoes {
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.col-inputs {
  padding-left: 3px !important;
  padding-right: 10px !important;
}
.dow-color {
  background-color: #1a7f37 !important;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
#multiselect-input {
  display: flex;
  width: 100%;
  margin-left: 6px;
}
</style>