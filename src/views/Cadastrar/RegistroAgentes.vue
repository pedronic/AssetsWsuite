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
                      type="text"
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
                        class="fal fa-user-secret fa-2x"
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
                    placeholder="Documento"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                    <multiselect
                      v-model="filas_finish"
                      placeholder="Filas"
                      :label="'queue_name'"
                      :track-by="'queue_id'"
                      :options="filas"
                      :multiple="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {{ agent }}
          {{ tipo_jornadas }}
          <!-- <div class="panel">
            <div class="panel-container show">
              <div class="panel-content">
                <TabelaFilas :items="lista_de_filas" />
              </div>
            </div>
          </div> -->
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button>
            </b-col>
            <b-col class="p-3" cols="auto">
              <div class="custom-control custom-switch">
                <input
                  id="customSwitch1"
                  checked
                  class="custom-control-input bg-dark"
                  type="checkbox"
                />
                <input
                  id="customSwitch1"
                  class="custom-control-input bg-dark"
                  type="checkbox"
                />
                <label id="kkk" class="custom-control-label" for="customSwitch1"
                  >Status</label
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
    async getAgents() {
      let agents = axios.get(baseApiUrl + "/agents");
      for (let u in agents) {
        this.agents.push(agents[u].agent);
      }
    },
    async getFilas() {
      let f = await axios.get(baseApiUrl + "/queues");
      console.log("f.data.data\n", f.data.data);
      this.filas = f.data.data;
    },
    async postNewAgent(nu) {
      let s = await axios.post(`${baseApiUrl}/agents`, nu);
      console.log("Post status:\n", s);
    },
    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      let blankMail = !(this.email.trim().length > 0);
      let blankLogin_crm = !(this.agent.trim().length > 0);
      let blankDocument = !(this.document.trim().length > 0);
      let blankJourney = !(this.tipo_jornadas.length > 0);
      let validAgent = !(this.agents.indexOf(this.agent.trim()) > -1);
      if (
        passCheck ||
        blankPass ||
        blankJourney ||
        blankName ||
        blankMail ||
        blankLogin_crm ||
        blankDocument ||
        validAgent
      )
        return;
      else {
        let postBody = {};
        postBody.login_crm = this.login_crm.trim();
        postBody.email = this.email.trim();
        postBody.name = this.name.trim();
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.agent = this.agent.trim();
        postBody.journey = this.tipo_jornadas.code;
        for (let f in this.filas_finish) {
          this.queue_default.push(this.filas_finish[f]);
        }
        postBody.queue_default = [...this.queue_default];
        console.log(postBody);
        this.postNewAgent(postBody);
      }
    },
  },
  data() {
    return {
      tipo_jornadas: [],
      filas_finish: [],
      agents: [],
      filas: [],
      name: "",
      login_crm: "",
      email: "",
      password: "",
      document: "",
      confirmPassword: "",
      agent: "",
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
    };
  },
  mounted() {
    this.getFilas();
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