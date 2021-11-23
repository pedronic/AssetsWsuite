<template>
  <div>
    <!--Refatorado: row, col e d-inline-->
    <PagesSubHeader icon="fal fa-user-headset" titulo="Agentes">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div>
      <form @submit.prevent="carregar()">
        <div class="form-group">
          <b-row class="mb-2 justify-content-center">
            <b-col cols="4">
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
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                <!--v-model="email"-->
                <b-form-input
                  id="profile-name-input"
                  type="email"
                  placeholder="E-mail"
                  :disabled="true"
                />
              </div>
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-user-secret fa-2x" style="margin-left: 5px" />
                <b-form-input
                  v-model="login_crm"
                  id="profile-name-input"
                  type="text"
                  placeholder="Login"
                />
              </div>
            </b-col>
          </b-row>

          <b-row class="mb-2 justify-content-center">
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-key fa-2x" style="margin-left: 5px" />
                <b-form-input
                  v-model="password"
                  id="profile-name-input"
                  type="password"
                  placeholder="Senha"
                  :required="true"
                />
              </div>
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-address-card fa-2x" style="margin-left: 5px" />
                <b-form-input
                  v-model="confirmPassword"
                  id="profile-name-input"
                  type="password"
                  placeholder="Confirmar senha"
                  :required="true"
                />
              </div>
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-phone-office fa-2x" style="margin-left: 5px" />
                <b-form-input
                  v-model="agent"
                  id="profile-name-input"
                  type="text"
                  placeholder="Ramal"
                  :required="true"
                />
              </div>
            </b-col>
          </b-row>

          <b-row class="mb-2 justify-content-center">
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-calendar-alt fa-2x" style="margin-left: 5px" />
                <div id="multiselect-input">
                  <multiselect
                    v-model="journey"
                    :placeholder="'Jornadas'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="journeys"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel"
                    :selectGroupLabel="MSprops.selectGroupLabel"
                    :selectedLabel="MSprops.selectedLabel"
                    :deselectLabel="MSprops.deselectLabel"
                    :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-address-card fa-2x" style="margin-left: 5px" />
                <!--v-model="document"-->
                <b-form-input
                  id="profile-name-input"
                  type="text"
                  disabled
                  placeholder="Documento"
                />
              </div>
            </b-col>
            <b-col cols="4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                <!--caso esteja no modo de edição, as filas carregadas virão para esse 1° MultiSelect -->
                <div id="multiselect-input" class="multiple-true" v-if="id">
                  <multiselect
                    v-model="queue_default"
                    placeholder="Filas"
                    :label="'code'"
                    :track-by="'id'"
                    :options="queues"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel"
                    :selectGroupLabel="MSprops.selectGroupLabel"
                    :selectedLabel="MSprops.selectedLabel"
                    :deselectLabel="MSprops.deselectLabel"
                    :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
                <div id="multiselect-input" class="multiple-true" v-else>
                  <multiselect
                    v-model="queue_def"
                    :preselect-first="true"
                    placeholder="Filas"
                    :label="'name'"
                    :track-by="'id'"
                    :options="queues"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel"
                    :selectGroupLabel="MSprops.selectGroupLabel"
                    :selectedLabel="MSprops.selectedLabel"
                    :deselectLabel="MSprops.deselectLabel"
                    :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- DEPURAÇÃO [INÍCIO] -->
          <!-- {{ id }}
          {{ this.$route.params.journey }}
          {{ flag }}
          {{ name }}
          {{ login_crm }}
          {{ email }}
          {{ agent }}
          {{ queues }}
          {{ queue_def }}
          {{ queue_default }}
          {{ queue_default.name }} -->
          <!-- DEPURAÇÃO [FIM] -->
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
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)
import Multiselect from "vue-multiselect";
import { vueMultiselectProps } from "../../config/global.js";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    // TabelaFilas,
    PagesSubHeader, //título da página com ícone (via slot)
    Multiselect,
  },
    mixins: [ValidateToaster],

  data() {
    return {
      jornadas: [],
      queue_default: {
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
      password: "",
      company_id: this.$route.params.company_id,
      // email: this.$route.params.email,
      // document: this.$route.params.document,
      confirmPassword: "",
      journey: [],
      agent: this.$route.params.agent,
      MSprops: vueMultiselectProps, //essa variável é global e carrega com ela a tradução das mensagens que aparecem no MultiSelect (ctrl + click)
      journeys: [
        { name: "Ativa", code: "active" },
        { name: "Manual", code: "manual" },
        { name: "Receptiva", code: "receptive" },
      ],
      //componente que será implementado futuramente
      // lista_de_filas: [
      //   {
      //     selected: false,
      //     agente: "Fila 1000",
      //     p0: false,
      //     p1: true,
      //     p2: false,
      //   },
      //   {
      //     selected: false,
      //     agente: "Fila 2000",
      //     p0: false,
      //     p1: false,
      //     p2: false,
      //   },
      // ],
    };
  },

  methods: {
    // async getAgents() {
    //   //pega todas as chaves primárias do sistema para verificação de validade na função carregar()
    //   let agents = await axios.get(baseApiUrl + "/agents");
    //   let data = agents.data.data;
    //   for (let u in data) {
    //     this.agents.push(data[u].agent);
    //   }
    // },
    async getQueues() {
      //Pega todas as filas disponíveis
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
    },
    async putAgent(nu) {
      //posta novo agente editado com base no ID
      console.log(nu);
      let s = await axios
        .put(`${baseApiUrl}/agents/${this.id}`, nu)
        .then(() => {
          let toast = {
            isValidated: true,
            title: "AGENTE EDITADO!",
            message: "Agente editado com sucess",
          };
          this.validateAndToast(toast);
        })
        .catch((error) => {
          if (error.response.data.errno) {
            let toast = {
              isValidated: false,
              title: "FALHA",
              message: "Erro no servidor",
            };
            this.validateAndToast(toast);
          } else {
            let toast = {
              isValidated: false,
              title: "FALHA",
              message: error.response.data,
            };
            this.validateAndToast(toast);
          }
        });
      console.log("Put status:\n", s);
    },
    async postNewAgent(nu) {
      console.log(nu);
      let s = await axios
        .post(`${baseApiUrl}/agents`, nu)
        .then(() => {
          let toast = {
            isValidated: true,
            title: "AGENTE CRIADO!",
            message: "Agente criado com sucesso",
          };
          this.validateAndToast(toast);
        })
        .catch((error) => {
          if (error.response.data.errno) {
            let toast = {
              isValidated: false,
              title: "FALHA",
              message: "Erro no servidor",
            };
            this.validateAndToast(toast);
          } else {
            let toast = {
              isValidated: false,
              title: "FALHA",
              message: error.response.data,
            };
            this.validateAndToast(toast);
          }
        });
      console.log("Post status:\n", s);
    },
    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankAgent = !(this.agent.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      // console.clear();
      if (
        passCheck ||
        blankPass ||
        blankAgent ||
        blankName //||
        // blankDocument
      ) {
        console.log(passCheck);
        console.log(blankPass);
        console.log(blankName);
        console.log(blankAgent);
        // console.log(blankDocument);
      } else {
        let postBody = {};
        postBody.company_id = 2; //alterar quando o campo "compania" for criado
        postBody.agent = parseInt(this.agent.trim());
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.name = this.name.trim();
        postBody.cpf = this.cpf;
        postBody.login_crm = this.login_crm;
        postBody.journey = this.journey.code;
        // postBody.flag = this.flag;

        // for (let f in this.queue_default) {
        //   this.queue_default.push(this.queue_default[f]);
        // }
        // let validAgent = !(this.agents.indexOf(this.agent) < -1);
        // if (validAgent) {
        console.log("valido");
        if (this.id) {
          postBody.queue_default = this.queue_default.code;
          console.log(postBody.queue_default);
          this.putAgent(postBody);
        } else {
          this.queue_def.length == 0
            ? (postBody.queue_default = 0)
            : (postBody.queue_default = this.queue_def.code);
          console.log(postBody.queue_default);
          this.postNewAgent(postBody);
        }
        // }
      }
    },
  },
  mounted() {
    //montagens de valores das listas e get usuários para checar se já existem (chaves primárias)
    this.getQueues();
    this.getAgents();

    //modelagem do campo foto que será implementado futuramente
    $(document).on("click", "#close-preview", function() {
      $(".image-preview").popover("hide");
    });

    $(function() {
      // limpar evento
      $(".image-preview-clear").click(function() {
        $(".image-preview")
          .attr("data-content", "")
          .popover("hide");
        $(".image-preview-filename").val("");
        $(".image-preview-clear").hide();
        $(".image-preview-input input:file").val("");
        $(".image-preview-input-title").text(" ");
      });
      // pré-visualizar a imagem escolhida
      $(".image-preview-input input:file").change(function() {
        var img = $("<img/>", {
          id: "dynamic",
          width: 50,
          height: 100,
        });
        var file = this.files[0];
        var reader = new FileReader();
        // pega a imagem de pré-visulização e coloca em um popover
        reader.onload = function(e) {
          $(".image-preview-input-title").text(".  Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr("src", e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
  },
  created() {
    //adicionando a jornada do agente (caso edição)
    for (let u in this.journeys) {
      if (this.journeys[u].code == this.$route.params.journey) {
        this.journey = this.journeys[u];
      }
    }
  },
};
</script>
<style scoped>
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

#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
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
/*estilizações da foto
.btn#butao {
  padding: 2px 4px 0px 2px !important;
}
.btn-default {
  background-image: linear-gradient(to top, #ffffff, #ffffff);
}
.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  width: 35px; 
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
#input-pic {
  border-left: 1px solid rgb(0, 0, 0) !important;
  border-color: rgb(0, 0, 0)!important; 
}*/
</style>
