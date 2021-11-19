<template>
  <div>
    <PagesSubHeader titulo="Robôs" icon="fal fa-user-robot">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div v-if="dataOK">
      <form @submit.prevent="carregar()">
        <div class="form-group">
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    v-model="name"
                    id="profile-name-input"
                    type="text"
                    placeholder="Nome"
                    :required="true"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i
                      class="fal fa-user-secret fa-2x"
                      style="margin-left: 5px"
                    />
                    <b-form-input
                      v-model="login_crm"
                      id="profile-name-input"
                      type="text"
                      placeholder="Login"
                      :required="true"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-phone-office fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    v-model="agent"
                    id="profile-name-input"
                    type="text"
                    placeholder="Ramal"
                    :required="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2 justify-content-center">
            <div class="col-12">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                <div id="multiselect-input" v-if="id">
                  <multiselect
                    v-model="queue_default"
                    placeholder="Filas"
                    :label="'name'"
                    :track-by="'id'"
                    :options="queues"
                    :multiple="false"
                    :required="true"
                  />
                </div>
                <div id="multiselect-input" v-else>
                  <multiselect
                    v-model="queue_def"
                    placeholder="Filas"
                    :label="'name'"
                    :track-by="'id'"
                    :options="queues"
                    :multiple="false"
                    :required="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button>
            </b-col>
            <!-- {{ queues }}
            {{ queue_default }}
            {{ names }}
            {{ id }} -->
            <b-col class="p-3" cols="auto">
              <div class="custom-control custom-switch">
                <b-form-checkbox id="status-button" v-model="flag" switch
                  >Status</b-form-checkbox
                >
              </div>
            </b-col>
          </b-row>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    Multiselect,
    PagesSubHeader,
  },
  methods: {
    async putRobot(nu) {
      console.log(nu);
      let s = await axios.put(`${baseApiUrl}/agents/${this.id}`, nu);
      console.log("Put status:\n", s);
    },
    async postNewRobot(nu) {
      let s = await axios.post(`${baseApiUrl}/agents`, nu);
      console.log("Post status:\n", s);
    },

    async getRobots() {
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
      var testConcat = responses[0].concat(responses[1], responses[2]);

      //CRIAÇÃO DAS FILAS COM CADA REQUEST

      let queues = [];
      console.log("f.data.data\n", testConcat);
      for (let u in testConcat) {
        let fila = {};
        fila.id = testConcat[u].id;
        fila.code = testConcat[u].name;
        fila.name = testConcat[u].name_queue;
        queues.push({ ...fila });
      }
      this.queues = [...queues];
      this.dataOK = true;
    },

    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let blankName = !(this.name.trim().length > 0);
      let blankLogin_crm = !(this.login_crm.trim().length > 0);
      let blankAgent = !(this.agent > -1);
      // let blankDocument = !(this.document.trim().length > 0);
      // console.clear();
      if (blankName || blankLogin_crm || blankAgent) {
        console.log(blankName);
        console.log(blankLogin_crm);
        console.log(blankAgent);
      } else {
        let postBody = {};
        postBody.id = this.id;
        postBody.name = this.name.trim();
        postBody.login_crm = this.login_crm.trim();
        postBody.queue_default = this.queue_default;
        postBody.type = "robot";
        postBody.company_id = 2;
        postBody.cpf = null;
        postBody.password = "null";
        postBody.confirmPassword = "null";
        postBody.flag = this.flag == true ? 1 : 0;
        postBody.agent = this.agent;
        // for (let f in this.filas_finish) {
        //   this.queue_default.push(this.filas_finish[f]);
        // }
        let validRobot = !(this.names.indexOf(this.name.trim()) > -1);
        console.log(this.names.indexOf(this.name.trim()) > -1);
        console.log(postBody);
        if (validRobot) {
          console.log("valido");
          if (this.id) {
            postBody.queue_default = this.queue_default.code;
            console.log(postBody.queue_default);
            this.putRobot(postBody);
          } else {
            this.queue_def.length == 0 ? postBody.queue_default = 0 :  postBody.queue_default = this.queue_def.code ;
            console.log(postBody.queue_default);
            this.postNewRobot(postBody);
          }
        }
      }
    },
  },
  data() {
    return {
      dataOK: false,
      names: [],
      queue_default: [
        {
          name: this.$route.params.queue_default,
          code: this.$route.params.queue_default,
        },
      ],
      queue_def: [],
      filas_finish: [],
      queues: null,
      flag: this.$route.params.flag,
      id: this.$route.params.id,
      name: this.$route.params.name,
      login_crm: this.$route.params.login_crm,
      agent: this.$route.params.agent,
    };
  },
  created() {
    this.getRobots();
    this.getQueues();
  },
};
</script>
<style scoped>
#input-pic {
  border-left: 1px solid rgb(0, 0, 0) !important;
}

.btn-default {
  background-image: linear-gradient(to top, #ffffff, #ffffff);
}
.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.image-preview-input input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
.image-preview-input-title {
  margin-left: 2px;
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #ffffff;
  opacity: 1;
}

label#kkk {
  padding-top: 2.7px;
}

.form-icon,
.form-icon:hover {
  width: 42px;
}

.centralize {
  margin-left: 450px;
}
#multiselect-input {
  display: flex;
  width: 100%;
  margin-left: 6px;
}

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
}

.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
.user-name-line2 {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  height: 42px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}
#profile-name-input2 {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
#multiselect-input {
  display: flex;
  width: 100%;
  margin-left: 6px;
}

i.fal.fa-2x {
  width: 26px;
  height: 26px;
}

.bottom {
  margin-top: 20px;
}

.panel-content {
  overflow: auto;
}

.panel .panel-container .panel-content {
  padding: 0;
}

.card-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.card {
  box-shadow: none;
  border: none;
}
</style>
