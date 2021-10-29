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
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 2: FIM -->
          <!-- DEPURAÇÃO -->
          <!-- {{ servers }} -->
          {{ type }}
          {{ flag }}
          {{ tipo }}
          <!-- DEPURAÇÃO [FIM]-->
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button>
            </b-col>
            <b-col class="p-3" cols="auto">
              <b-form-checkbox id="status-button" v-model="flag" switch
                >Status</b-form-checkbox
              >
            </b-col>
          </b-row>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
  },
  name: "RegistroServidores",
  methods: {
    async getServers() {
      let agents = await axios.get(baseApiUrl + "/servers");
      let data = agents.data.data;
      for (let u in data) {
        this.servers.push(data[u].name);
      }
    },
    async putServer(nu) {
      console.log(nu);
      let s = await axios.put(`${baseApiUrl}/servers/${this.id}`, nu);
      console.log("Put status:\n", s);
    },
    async postNewServer(nu) {
      console.log(nu);
      let s = await axios.post(`${baseApiUrl}/servers`, nu);
      console.log("Post status:\n", s);
    },

    carregar() {
      // Refatorar para incluir avisos de toast após ação

      let blankSip = !(this.gateway_sip_user.trim().length > 0);
      let blankExt = !(this.gateway_ext.trim().length > 0);
      let blankDomain = !(this.gateway_domain.trim().length > 0);
      let blankIP = !(this.ip.trim().length > 0);
      let blankType = !(this.type.length > 0);
      let blankName = !(this.name.trim().length > 0);
      let blankFlag = !(this.flag);
      // console.clear();
      if (
        blankDomain ||
        blankIP ||
        blankType ||
        blankName ||
        blankExt ||
        blankSip ||
        blankFlag
        // blankDocument
      ) {
        console.log(blankDomain);
        console.log(blankIP);
        console.log(blankName);
        console.log(blankType);
        console.log(blankFlag);
      } else {
        let postBody = {};
        postBody.ip = this.ip;
        postBody.gateway_domain = this.gateway_domain.trim();
        postBody.gateway_ext = this.gateway_ext.trim();
        postBody.name = this.name.trim();
        postBody.gateway_sip_user = this.gateway_sip_user.trim();
        postBody.type = this.tipo.name;
        postBody.flag = this.flag;
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
        let validServer = !(this.servers.indexOf(this.server) < -1);

        if (validServer) {
          console.log("valido");
          if (this.id) {
            postBody.type = this.type[0].name;
            console.log(postBody.type);
            this.putServer(postBody);
          } else {
            console.log(postBody.type);
            this.postNewServer(postBody);
          }
        }
      }
    },
  },
  mounted() {
    this.getServers();
  },
  data() {
    return {
      type: [
        {
          name: this.$route.params.type,
          code: this.$route.params.type,
        },
      ],
      tipo: [],
      flag: this.$route.params.flag,
      servers: [],
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
        { name: "PABX", code: "D" },
        { name: "Robot", code: "R" },
      ],
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    };
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