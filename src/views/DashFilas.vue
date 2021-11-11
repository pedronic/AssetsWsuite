<template>
  <div class="relatorios">
    <pages-sub-header>
      <div class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-1 col-botoes">
              <b-button
                variant="success"
                class="btn btn-success waves-effect waves-themed dow-color"
                @click="configTable"
                ><i class="fal fa-plus"></i
              ></b-button>
            </div>
          </div>
        </div>
      </div>
    </pages-sub-header>
    {{ selectedQueues }}
    <div v-if="BuildTab" class="panel">
      <div class="panel-container show">
        <div class="panel-content">
          <!-- TAB ITERÁVEL [INÍCIO] -->
          <div class="card tab-card">
            <b-card no-body>
              <b-tabs card>
                <b-tab :title="'Fila ' + firstQueue.code" active>
                  <!-- :number="firstQueue.name" -->
                  <b-card-text
                    ><TabelaFila
                      :id="firstQueue.code"
                      :queue_name="firstQueue.name"
                  /></b-card-text>
                </b-tab>
                <div v-for="d in selectedQueues" :key="d.name">
                  <b-tab :title="'Fila ' + d.code">
                    <!-- :queue_number="d.name" -->
                    <b-card-text
                      ><TabelaFila :id="d.code" :queue_name="d.name" 
                    />
                    <TabelaMCDU />
                    </b-card-text>
                  </b-tab>
                </div>
              </b-tabs>
            </b-card>
          </div>
          <!-- FIM TAB ITERÁVEL -->
        </div>
      </div>
    </div>
    <!-- Modal de adição [Início] -->
    <b-modal
      v-model="modalShow"
      id="new_line"
      size="xl"
      ok-only
      ok-title="Salvar"
      ok-variant="info"
      @ok="refresh()"
      modalShow="!modalShow"
      title=" "
    >
      <div class="profile-content user-name-line d-flex">
        <i class="fal fa-road fa-2x" style="margin-left: 5px" />

        <div id="multiselect-input">
          <multiselect
            v-model="selectedQueues"
            :placeholder="'Filas'"
            :label="'code'"
            :close-on-select="false"
            :track-by="'name'"
            :options="uploadedQueues"
            :multiple="true"
            :selectLabel="MSprops.selectLabel"
            :selectGroupLabel="MSprops.selectGroupLabel"
            :selectedLabel="MSprops.selectedLabel"
            :deselectLabel="MSprops.deselectLabel"
            :deselectGroupLabel="MSprops.deselectGroupLabel"
            :max="10"
            :allow-empty="false"
            @select="onSelect()"
          />
        </div>
      </div>
      <label class="mt-2 text-danger" v-show="isInvalid"
        >Você só pode selecionar até 10 filas para visualização!</label
      >
      <!-- <QueueAdder /> -->
      <!-- {{ operadoras_criadas }} -->
    </b-modal>
    <!-- Modal de edição [Fim] -->
  </div>
</template>

<script>
import PagesSubHeader from "../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import { vueMultiselectProps } from "../config/global";
import axios from "axios";
import { baseApiUrl } from "@/config/global";
import TabelaFila from "../components/DataTables/TabelaFila.vue";
import TabelaMCDU from '../components/DataTables/TabelaMCDU.vue';

export default {
  components: {
    PagesSubHeader,
    Multiselect,
    TabelaFila,
    TabelaMCDU,
  },
  name: "DashFilas",
  methods: {
    async getQueues() {
      let res = await axios.get(baseApiUrl + "/queues");
      let count = res.data.count;
      let limit = res.data.limit;
      var requests = null;
      var pages = [];

      // CONTAGEM DE PÁGINAS
      if (count % limit > 0) {
        requests = parseInt(count / limit + 1);
        while (requests > 0) {
          // console.log(requests);
          pages.push(`/queues?page=${requests}`);
          requests--;
        }
        console.clear();
        console.log(pages);
      } else {
        requests = parseInt(count / limit);
        while (requests > 0) {
          // console.log(requests);
          pages.push(`/queues?page=${requests}`);
          requests--;
        }
        console.clear();
        console.log(pages);
      }

      // CRIAÇÃO REQUEST DE CADA PÁGINA
      var responses = [];
      for (let u in pages) {
        let res = await axios.get(baseApiUrl + pages[u]);
        responses.push(res.data.data);
      }
      var testConcat = responses[0].concat(responses[1], responses[2])

      //CRIAÇÃO DAS FILAS COM CADA REQUEST

            let queues = [];
            console.log("f.data.data\n", testConcat);
            for (let u in testConcat) {
              let fila = {};
              fila.code = testConcat[u].name;
              fila.name = testConcat[u].name_queue;
              queues.push({ ...fila });
            }
            this.uploadedQueues = [...queues];


    },

    configTable() {
      let first = {};
      first.name = this.firstQueue.name;
      first.code = this.firstQueue.code;
      this.selectedQueues.unshift(first);
      this.BuildTab = false;
      this.modalShow = !this.modalShow;
    },

    onSelect() {
      if (this.selectedQueues.length > 8) {
        this.isInvalid = true;
      } else {
        this.isInvalid = false;
      }
    },

    refresh() {
      this.firstQueue = {};
      this.firstQueue.name = this.selectedQueues[0].name;
      this.firstQueue.code = this.selectedQueues[0].code;
      this.selectedQueues.shift();
      this.BuildTab = true;
      this.modalShow = !this.modalShow;
    },
  },

  data() {
    return {
      BuildTab: false,
      selectedQueues: [],
      firstQueue: "",
      uploadedQueues: [],
      queues: {},
      modalShow: true,
      MSprops: vueMultiselectProps,
      isInvalid: false,
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