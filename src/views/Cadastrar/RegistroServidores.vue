<template>
  <div>
    <PagesSubHeader icon="fal fa-server" titulo="Servidores">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div>
      <form @submit.prevent="carregar()">
        <div class="form-group">
          <!-- LINHA 1 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
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
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <div id="multiselect-input" v-if="id">
                      <multiselect
                        v-model="type"
                        :placeholder="'Tipo'"
                        :label="'name'"
                        :track-by="'code'"
                        :options="types"
                        :multiple="false"
                        :selectLabel="MSprops.selectLabel"
                        :selectGroupLabel="MSprops.selectGroupLabel"
                        :selectedLabel="MSprops.selectedLabel"
                        :deselectLabel="MSprops.deselectLabel"
                        :deselectGroupLabel="MSprops.deselectGroupLabel"
                      />
                    </div>
                    <div id="multiselect-input" v-else>
                      <multiselect
                        v-model="tipo"
                        :placeholder="'Tipo'"
                        :label="'name'"
                        :track-by="'code'"
                        :options="types"
                        :multiple="false"
                        :preselect-first="true"
                        :selectLabel="MSprops.selectLabel"
                        :selectGroupLabel="MSprops.selectGroupLabel"
                        :selectedLabel="MSprops.selectedLabel"
                        :deselectLabel="MSprops.deselectLabel"
                        :deselectGroupLabel="MSprops.deselectGroupLabel"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      v-model="ip"
                      id="profile-name-input"
                      type="text"
                      placeholder="IP"
                      :required="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 1: FIM -->

          <!-- LINHA 2 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      v-model="gateway_domain"
                      id="profile-name-input"
                      type="text"
                      placeholder="gateway_domain"
                      :required="true"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    v-model="gateway_ext"
                    id="profile-name-input"
                    type="text"
                    placeholder="gateway_ext"
                    :required="true"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    v-model="gateway_sip_user"
                    id="profile-name-input"
                    type="text"
                    placeholder="gateway_sip_user"
                    :required="true"
                  />
                </div>
              </div>
            </div>
          </div>
        <!-- LINHA 2: FIM -->
        <b-row>
          <b-col class="mr-auto p-3" cols="auto">
            <button class="btn btn-dark botao-salvar" type="submit">Salvar</button>
          </b-col>
          <b-col class="p-3" cols="auto">
            <!-- <div class="custom-control custom-switch">
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
              :checked="true"
            </div> -->
            <b-form-checkbox switch v-model="flag" id="status-button"><span>Status</span></b-form-checkbox>
          </b-col>
        </b-row>
    </div>
      </form>
    </div>
  </div>
</template>

<script>
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import { vueMultiselectProps } from "../../config/global.js";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader, //título da página com ícone (via slot)
    Multiselect,
  },
  name: "RegistroServidores",
  mixins: [ValidateToaster],

  data() {
    return {
      MSprops: vueMultiselectProps, //essa variável é global e carrega com ela a tradução das mensagens que aparecem no MultiSelect (ctrl + click)
      type: [
        {
          name: this.$route.params.type,
          code: this.$route.params.type,
        },
      ],
      tipo: [],
      flag: this.$route.params.flag,
      name: this.$route.params.name,
      ip: this.$route.params.ip,
      gateway_domain: this.$route.params.gateway_domain,
      gateway_ext: this.$route.params.gateway_ext,
      gateway_sip_user: this.$route.params.gateway_sip_user,
      id: this.$route.params.id,
      types: [
        { name: "app", code: "A" },
        { name: "database", code: "D" },
        { name: "Gateway", code: "G" },
        { name: "PABX", code: "PABX" },
        { name: "Robot", code: "R" },
      ],
    };
  },

  methods: {
    async putServer(nu) {
      //posta novo servidor editado com base no ID
      console.log(nu);
      let s = await axios
        .put(`${baseApiUrl}/servers/${this.id}`, nu)
        .then(() => {
          let toast = {
            isValidated: true,
            title: "SERVIDOR EDITADO!",
            message: "Servidor editado com sucesso",
          };
          this.validateAndToast(toast);
        })
        .catch((error) => {
          if (error.response.data.errno) {
            let toast = {
              isValidated: false,
              title: "FALHA",
              message: "Erro ao registrar servidor",
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
    async postNewServer(nu) {
      //postagem de novo servidor
      console.log(nu);
      let s = await axios
        .post(`${baseApiUrl}/servers/`, nu)
        .then(() => {
          let toast = {
            isValidated: true,
            title: "SERVIDOR CRIADO!",
            message: "Servidor criado com sucesso",
          };
          this.validateAndToast(toast);
        })
        .catch((error) => {
          if (error.response.data.errno) {
            let toast = {
              isValidated: false,
              title: "Erro",
              message: "Erro ao registrar servidor",
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

      let blankSip = !(this.gateway_sip_user.trim().length > 0);
      let blankExt = !(this.gateway_ext.trim().length > 0);
      let blankDomain = !(this.gateway_domain.trim().length > 0);
      let blankIP = !(this.ip.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      if (
        blankDomain ||
        blankIP ||
        blankName ||
        blankExt ||
        blankSip
      ) {
        let toast = {
          isValidated: false,
          title: "NÃO FOI POSSÍVEL SALVAR O NOVO SERVIDOR",
          message:
            "O novo servidor não pôde ser criado. Não é permitido salvar uma novo servidor com o nome inválido ou apenas com espaços em branco.",
        };
                  this.validateAndToast(toast);

      } else {
        let postBody = {};
        postBody.ip = this.ip.trim();
        postBody.gateway_domain = this.gateway_domain.trim();
        postBody.gateway_ext = this.gateway_ext.trim();
        postBody.name = this.name.trim();
        postBody.gateway_sip_user = this.gateway_sip_user.trim();
        postBody.flag = this.flag == true ? 1 : 1; //por enquanto mandar true como padrão
        if (this.id) {
          postBody.type = this.type.name;
          console.log(postBody.type);
          this.putServer(postBody);
        } else {
          postBody.type = this.tipo.name;
          console.log(postBody.type);
          this.postNewServer(postBody);
        }
      }
    },
  },
  mounted() { //carregar dados que serão exibidos da API
    // this.getServers();
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
</style>
