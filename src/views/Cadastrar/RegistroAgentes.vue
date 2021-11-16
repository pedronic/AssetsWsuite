<template>
  <div>
    <PagesSubHeader icon="fal fa-user-headset" titulo="Agentes">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div>
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
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      v-model="email"
                      type="email"
                      placeholder="E-mail"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
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
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-key fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      v-model="password"
                      id="profile-name-input"
                      type="password"
                      placeholder="Senha"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-address-card fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    v-model="confirmPassword"
                    id="profile-name-input"
                    type="password"
                    placeholder="Confirmar senha"
                  />
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
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="d-inline">
            <div class="row mb-2 justify-content-center ">


            </div>
          </div> -->
          <div class="d-inline">
            <div class="row mb-2">
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-calendar-alt fa-2x"
                    style="margin-left: 5px"
                  />
                  <div id="multiselect-input">
                    <multiselect
                      v-model="tipo_jornadas"
                      :placeholder="'Jornadas'"
                      :label="'name'"
                      :track-by="'code'"
                      :options="jornadas_tipos"
                      :multiple="false"
                      :selectLabel="MSprops.selectLabel"
                      :selectGroupLabel="MSprops.selectGroupLabel"
                      :selectedLabel="MSprops.selectedLabel"
                      :deselectLabel="MSprops.deselectLabel"
                      :deselectGroupLabel="MSprops.deselectGroupLabel"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-address-card fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    v-model="document"
                    id="profile-name-input"
                    type="text"
                    disabled
                    placeholder="Documento"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input" v-if="id">
                    <multiselect
                    @change="choose(e)"
                      v-model="queue_default"
                      placeholder="Filas"
                      :label="'name'"
                      :track-by="'id'"
                      :options="queues"
                      :multiple="false"
                    />
                  </div>
                  <div id="multiselect-input" v-else>
                    <multiselect
                      v-model="queue_def"
                      :preselect-first="true"
                      placeholder="Filas"
                      :label="'name'"
                      :track-by="'id'"
                      :options="queues"
                      :multiple="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ----------------------------------- -->
          <!-- DEPURAÇÃO [INÍCIO] -->
          <!-- {{ id }}
          {{ name }}
          {{ login_crm }}
          {{ flag }}
          {{ email }}
          {{ jornadas_tipos }}
          {{ agent }}
          {{ queues }}
          {{ queue_default.name }} -->
          {{ queue_def }}
          {{ queue_default }}
          <!-- DEPURAÇÃO [FIM] -->
          <!-- ------------------------------ -->
          <!-- <div class="panel">
            <div class="panel-container show">
              <div class="panel-content">
                <TabelaFilas :items="lista_de_filas" />
              </div>
            </div>
          </div> -->
          <!-- {{ queue_default[0].name }} -->
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button>
            </b-col>
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
// import TabelaFilas from "../../components/DataTables/TabelaFilas.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import { vueMultiselectProps } from "../../config/global.js";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    // TabelaFilas,
    PagesSubHeader,
    Multiselect,
  },
  methods: {
    choose(e) {
      console.log(e);
    },

    async getAgents() {
      let agents = await axios.get(baseApiUrl + "/agents");
      let data = agents.data.data;
      for (let u in data) {
        this.agents.push(data[u].agent);
      }
    },
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
              fila.id = testConcat[u].id;
              fila.code = testConcat[u].name;
              fila.name = testConcat[u].name_queue;
              queues.push({ ...fila });
            }
            this.queues = [...queues];


    },
    async putAgent(nu) {
      console.log(nu);
      let s = await axios.put(`${baseApiUrl}/agents/${this.id}`, nu);
      console.log("Put status:\n", s);
    },
    async postNewAgent(nu) {
      console.log(nu);
      let s = await axios.post(`${baseApiUrl}/agents`, nu);
      console.log("Post status:\n", s);
    },
    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankAgent = !(this.agent > 0);
      let blankName = !(this.name.trim().length > 0);
      // console.clear();
      if (
        passCheck ||
        blankPass ||
        blankAgent ||
        blankName ||
        blankAgent //||
        // blankDocument
      ) {
        console.log(passCheck);
        console.log(blankPass);
        console.log(blankName);
        console.log(blankAgent);
        // console.log(blankDocument);
      } else {
        let postBody = {};
        postBody.company_id = this.company_id;
        postBody.agent = this.agent;
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.name = this.name.trim();
        postBody.cpf = this.cpf;
        postBody.login_crm = this.login_crm.trim();
        postBody.journey = this.tipo_jornadas.name;
        // postBody
        // postBody.email = this.email.trim();
        // postBody.type = this.type;
        // postBody.work_time = this.work_time;
        // postBody.flag = this.flag;
        // postBody.last_login = this.last_login;
        // postBody.created_at = this.created_at;
        // postBody.updated_at = this.updated_at;

        // for (let f in this.queue_default) {
        //   this.queue_default.push(this.queue_default[f]);
        // }
        let validAgent = !(this.agents.indexOf(this.agent) < -1);
        
        if (validAgent) {
          console.log("valido");
          if (this.id) {
            postBody.queue_default = this.queue_default.code;
            console.log(postBody.queue_default);
            this.putAgent(postBody);
          } else {
            this.queue_def.length == 0 ? postBody.queue_default = 0 :  postBody.queue_default = this.queue_def.code ;
            console.log(postBody.queue_default);
            this.postNewAgent(postBody);
          }
        }
      }
    },
  },
  data() {
    return {
      tipo_jornadas: [],
      queue_default: 
        {
          name: this.$route.params.queue_default,
          code: this.$route.params.queue_default,
        },
      queue_def: [],
      agents: [],
      queues: [],
      id: this.$route.params.id,
      name: this.$route.params.name,
      login_crm: this.$route.params.login_crm,
      flag: this.$route.params.flag,
      email: this.$route.params.email,
      password: "",
      document: this.$route.params.document,
      confirmPassword: "",
      agent: this.$route.params.agent,
      MSprops: vueMultiselectProps,
      jornadas_tipos: [
        { name: "Ativa", code: "active" },
        { name: "Manual", code: "manual" },
        { name: "Receptiva", code: "receptive" },
      ],
      lista_de_filas: [
        {
          selected: false,
          agente: "Fila 1000",
          p0: false,
          p1: true,
          p2: false,
        },
        {
          selected: false,
          agente: "Fila 2000",
          p0: false,
          p1: false,
          p2: false,
        },
      ],
      cpf: null,
      company_id: 2,
      type: "human",
      work_time:
        '[\r\n{"opText":"Segunda-Feira","in":"08:00","out":"20:40"},\r\n{"opText":"Terça-Feira","in":"08:00","out":"20:40"},\r\n{"opText":"Quarta-Feira","in":"08:00","out":"20:40"},\r\n{"opText":"Quinta-Feira","in":"08:00","out":"20:40"},\r\n{"opText":"Sexta-Feira","in":"08:00","out":""20:40"},\r\n{"opText":"Sábado","in":"08:00","out":"14:00"},\r\n{"opText":"Domingo","in":"","out":""}\r\n]',
      last_login: null,
      created_at: "2021-10-21T09:58:30.000Z",
      updated_at: null,
    };
  },
  mounted() {
    this.getQueues();
    this.getAgents();

    $(document).on("click", "#close-preview", function () {
      $(".image-preview").popover("hide");
    });

    $(function () {
      // Clear event
      $(".image-preview-clear").click(function () {
        $(".image-preview").attr("data-content", "").popover("hide");
        $(".image-preview-filename").val("");
        $(".image-preview-clear").hide();
        $(".image-preview-input input:file").val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function () {
        var img = $("<img/>", {
          id: "dynamic",
          width: 50,
          height: 100,
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
          $(".image-preview-input-title").text(".  Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr("src", e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
  },
  created() {},
};
</script>
<style scoped>
#input-agent {
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

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
}
.btn#butao {
  padding: 2px 4px 0px 2px !important;
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