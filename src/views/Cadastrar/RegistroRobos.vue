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
            </div>
          </div>
          <div class="row mb-2 justify-content-center">
            <div class="col-12">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                <div id="multiselect-input">
                  <multiselect
                    v-model="filas_finish"
                    placeholder="Filas"
                    :label="'queue_name'"
                    :track-by="'queue_id'"
                    :options="queues"
                    :multiple="false"
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
            {{ queue_default }}
            {{ names }}
            {{ id }}
            <b-col class="p-3" cols="auto">
              <div class="custom-control custom-switch">
                <input
                  id="customSwitch1"
                  v-model="flag"
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

    async getQueues() {
      let f = await axios.get(baseApiUrl + "/queues");
      let queue = f.data.data;
      console.log("f.data.data\n", f.data.data);
      for (let u in queue) {
        this.queues.push(queue[u].name);
      }
    },
    async getRobots() {
      let robots = await axios.get(baseApiUrl + "/agents");
      let iterator = robots.data;
      console.clear();
      console.log(iterator);
      for (let u in iterator) {
        this.names.push(iterator[u].name);
      }
      // console.log(this.names);
      this.dataOK = true;
    },

    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let blankName = !(this.name.trim().length > 0);
      let blankLogin_crm = !(this.login_crm.trim().length > 0);
      let blankDocument = !(this.document.trim().length > 0);
      // console.clear();
      if (blankName || blankLogin_crm || blankDocument) {
        console.log(blankName);
        console.log(blankLogin_crm);
        console.log(blankDocument);
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
        postBody.flag = this.flag;

        // for (let f in this.filas_finish) {
        //   this.queue_default.push(this.filas_finish[f]);
        // }
        let validRobot = !(this.names.indexOf(this.name.trim()) > -1);
        console.log(this.names.indexOf(this.name.trim()) > -1);
        console.log(postBody);
        if (validRobot) {
          console.log("valido");
          if (this.id) {
            console.log("1");
            this.putRobot(postBody);
          } else {
            postBody.agent = 4372;

            console.log("0");
            this.postNewRobot(postBody);
          }
        }
      }
    },
  },
  data() {
    return {
      dataOK: true,
      names: [],
      queue_default: this.$route.params.queue_default,
      filas_finish: [],
      queues: [],
      flag: this.$route.params.flag,
      id: this.$route.params.id,
      name: this.$route.params.name,
      login_crm: this.$route.params.login_crm,
    };
  },
  created() {
    this.getQueues();
    this.getRobots();
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
