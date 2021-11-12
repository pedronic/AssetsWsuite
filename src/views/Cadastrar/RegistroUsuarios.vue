<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div class="formularios">
    <PagesSubHeader icon="fal fa-user" titulo="Usuários do sistema">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div v-if="dataOK">
      <form @submit.prevent="carregar()" class="conteiner">
        <div class="form-group">
          <div class="d-inline">
            <div class="row mb-2">
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
                      v-model="email"
                      id="profile-name-input"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-user fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    v-model="username"
                    id="profile-name-input"
                    type="text"
                    placeholder="Usuário"
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
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-key fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      v-model="confirmPassword"
                      id="profile-name-input"
                      type="password"
                      placeholder="Confirmar Senha"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                    <multiselect
                      v-model="perfilName"
                      :placeholder="'Perfil'"
                      :label="'name'"
                      :track-by="'id'"
                      :options="perfis"
                      :multiple="false"
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <div class="input-group image-preview">
                      <span class="input-group">
                        botão de limpar foto selecionada
                        <button
                          type="button"
                          class="btn btn-default image-preview-clear"
                          style="display: none"
                        >
                          <span class="glyphicon glyphicon-remove"></span>
                          Limpar
                        </button>
                        campo de pré-visualização da imagem 
                        <div
                          class="btn btn-default image-preview-input"
                          id="butao"
                        >
                          <i id="pic" class="fal fa-image fa-2x"></i>
                          <span class="image-preview-input-title"> </span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            name="input-file-preview"
                          />
                          renomear aqui 
                        </div>
                        <input
                          type="text"
                          placeholder="Foto"
                          class="form-control image-preview-filename"
                          id="input-pic"
                          disabled="disabled"
                        />
                        não nomear, não usar com PHP 
                      </span>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-2">
              <div class="col-12">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                    <multiselect
                      v-model="filas_finish"
                      :close-on-select="false"
                      placeholder="Filas"
                      :label="'name'"
                      :track-by="'id'"
                      :options="queues"
                      :multiple="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 
          {{ name }}
          {{ email }}
          {{ username }}
          {{ enable }}
          {{ perfilName }}
          {{ queues }}
          {{ filas_finish }}
          {{ filas }} -->
          {{ id }}
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button>
            </b-col>
            <b-col class="p-3" cols="auto">
              <div class="custom-control custom-switch">
                <b-form-checkbox id="status-button" v-model="enable" switch
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
// import Usuario from "../../domain/User/Usuario";
import Multiselect from "vue-multiselect";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import "jquery";
// import "select2";
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
  },
  name: "RegistroUsuarios",
  methods: {
    testPerfilSelect() {
      console.log("Filas Selecionadas:\n", this.filas_finish);
    },
    async getUserQueues() {
      console.clear();
      var res = await axios.get(baseApiUrl + "/users/queues/");
      var response = res.data;
      console.log(response);
      for (let u in response) {
        if (response[u].user_id == this.id) {
          let selectedQueue = {};
          selectedQueue.id = response[u].queue_id;
          selectedQueue.name = response[u].queue_name;
          selectedQueue.code = response[u].queue_number;
          this.filas_finish.push(selectedQueue);
        }
      }
      this.dataOK = true;
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
        console.log(pages);
      } else {
        requests = parseInt(count / limit);
        while (requests > 0) {
          // console.log(requests);
          pages.push(`/queues?page=${requests}`);
          requests--;
        }
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
    async getUsers() {
      let users = await axios.get(baseApiUrl + "/users");
      for (let u in users) {
        this.userMails.push(users[u].email);
        this.userNames.push(users[u].username);
      }
    },
    async getPerfil() {
      let p = await axios.get(baseApiUrl + "/perfils");
      console.log("p.data.data\n", p.data.data);
      this.perfis = p.data.data;
      if (this.id) {
        for (let u in this.perfis) {
          if (this.perfis[u].name == this.$route.params.perfilName) {
            this.perfilName = this.perfis[u];
          }
        }
      }
    },
    async postNewUser(nu) {
      console.log(nu);
      let s = await axios.post(`${baseApiUrl}/users/`, nu);
      console.log("Post status:\n", s);
    },
    async putUser(nu) {
      console.log(nu);
      let s = await axios.put(`${baseApiUrl}/users/${this.id}`, nu);
      console.log("Put status:\n", s);
    },
    carregar() {
      console.log("ye");
      // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      let blankMail = !(this.email.trim().length > 0);
      let blankUser = !(this.username.trim().length > 0);
      let blankProfile = !(this.perfilName.name.length > 0);
      if (
        passCheck ||
        blankPass ||
        blankName ||
        blankMail ||
        blankUser ||
        blankProfile
      ) {
        console.log(passCheck);
        console.log(blankPass);
        console.log(blankName);
        console.log(blankUser);
        console.log(blankMail);
        console.log(blankProfile);
        // console.log(validEmail);
        // console.log(validUsername);
      } else {
        let postBody = {};
        postBody.username = this.username.trim();
        postBody.email = this.email.trim();
        postBody.name = this.name.trim();
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.perfil_id = this.perfilName.id;
        postBody.type = "user";
        postBody.enable = this.enable == true ? 1 : 0;

        for (let f in this.filas_finish) {
          let line = {};
          line.queue_id = this.filas_finish[f].id;
          line.queue_number = this.filas_finish[f].code;
          line.queue_name = this.filas_finish[f].name;
          this.userQueue.push(line);
        }
        postBody.userQueue = [...this.userQueue];
        let validEmail = !(this.userMails.indexOf(this.email.trim()) > -1);
        let validUsername = !(
          this.userNames.indexOf(this.username.trim()) > -1
        );
        if (validEmail || validUsername) {
          if (this.id) {
            this.putUser(postBody);
          } else {
            this.postNewUser(postBody);
          }
        }
      }
    },
  },
  data() {
    return {
      // edition:
      filas_finish: [],
      dataOK: false,
      id: this.$route.params.id,
      nameEdit: this.$route.params.name,
      usernameEdit: this.$route.params.username,
      emailEdit: this.$route.params.email,
      enable: this.$route.params.enable,
      perfilName: [],
      userMails: [],
      userNames: [],
      msg: "",
      states: [],
      queues: [],
      perfis: [],
      name: this.$route.params.name,
      email: this.$route.params.email,
      username: this.$route.params.username,
      password: "",
      confirmPassword: "",
      perfil_id: [],
      userQueue: [],
      queueObject: {
        queue_id: "",
        queue_number: "",
        queue_name: "",
      },
    };
  },
  mounted() {
    this.getPerfil();
    this.getUsers();
    this.getQueues();
    if (this.id) {
      this.dataOK = false;

      this.getUserQueues();
    }

    $(document).on("click", "#close-preview", function() {
      $(".image-preview").popover("hide");
    });

    $(function() {
      // Clear event
      $(".image-preview-clear").click(function() {
        $(".image-preview")
          .attr("data-content", "")
          .popover("hide");
        $(".image-preview-filename").val("");
        $(".image-preview-clear").hide();
        $(".image-preview-input input:file").val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function() {
        var img = $("<img/>", {
          id: "dynamic",
          width: 50,
          height: 100,
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
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
};
</script>

<style scoped>
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
#input-pic {
  border-left: 1px solid rgb(0, 0, 0) !important;
  /* border-color: rgb(0, 0, 0)!important; */
}

.btn-default {
  background-image: linear-gradient(to top, #ffffff, #ffffff);
}
.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  /* width: 35px; */
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

/*.form-icon,*/
/*.form-icon:hover {*/
/*  width: 42px;*/
/*}*/

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
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
