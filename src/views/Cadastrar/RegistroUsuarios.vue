<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div class="formularios">
    <PagesSubHeader icon="fal fa-user" titulo="Usuários do sistema">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    {{ nomeEdit }}
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
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                <div id="multiselect-input">
                  <multiselect
                    v-model="perfil_id"
                    :placeholder="'Perfil'"
                    :label="'name'"
                    :track-by="'id'"
                    :options="perfis"
                    :multiple="false"
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="d-inline">
                <div class="profile-content user-name-line d-flex">
                  <div class="input-group image-preview">
                    <span class="input-group">
                      <!-- image-preview-clear button -->
                      <button
                        type="button"
                        class="btn btn-default image-preview-clear"
                        style="display: none"
                      >
                        <span class="glyphicon glyphicon-remove"></span> Limpar
                      </button>
                      <!-- image-preview-input -->
                      <div class="btn btn-default image-preview-input" id="butao">
                          <i id="pic" class="fal fa-image fa-2x"></i
                        >
                        <span class="image-preview-input-title "> </span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/gif"
                          name="input-file-preview"
                        />
                        <!-- rename it -->
                      </div>
                      <input
                        type="text"
                        placeholder="Foto"
                        class="form-control image-preview-filename"
                        id="input-pic"
                        disabled="disabled"
                      />
                      <!-- don't give a name === doesn't send on POST/GET -->
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-inline">
          <div class="row mb-2">
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

            <div class="col-8">
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

        <b-row>
          <b-col class="mr-auto p-3" cols="auto">
            <button class="btn btn-dark botao-salvar" type="submit">
              Salvar
            </button>
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
            </div> -->
            <b-form-checkbox switch :checked="true" id="status-button"><span>Status</span></b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </form>
  </div>
</template>

<script>
// import Usuario from "../../domain/User/Usuario";
import Multiselect from "vue-multiselect";
import axios from "axios";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import "jquery";
// import "select2";
import {baseApiUrl} from "@/config/global";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
  },
  name: "RegistroUsuarios",
  methods: {
    testPerfilSelect(){
      console.log("Filas Selecionadas:\n",this.filas_finish)
    },

    async getFilas(){
      let f = await axios.get(baseApiUrl+"/queues");
      console.log("f.data.data\n",f.data.data)
      this.filas = f.data.data;
    },
    async getPerfil(){
      let p = await axios.get(baseApiUrl+"/perfils");
      console.log("p.data.data\n",p.data.data)
      this.perfis =  p.data.data;
    },
    async getUsers(){
      let users = axios.get(baseApiUrl+"/users");
      for(let u in users){
        this.userMails.push(users[u].email);
        this.userNames.push(users[u].username);
      }
    },
    async postNewUser(nu){
      let s = await axios.post(`${baseApiUrl}/users`, nu);
      console.log("Post status:\n",s)
    },
    carregar() { // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      let blankMail = !(this.email.trim().length > 0);
      let blankUser = !(this.username.trim().length > 0);
      let blankProfile = !(this.perfil_id.length > 0);
      let validEmail = !(this.userMails.indexOf(this.email.trim()) > -1);
      let validUsername = !(this.userNames.indexOf(this.username.trim()) > -1);
      if (passCheck || blankPass || blankName || blankMail || blankUser || blankProfile || validEmail || validUsername) return;
      else{
        let postBody = {};
        postBody.username = this.username.trim();
        postBody.email = this.email.trim();
        postBody.name = this.name.trim();
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.perfil_id = this.perfil_id.id;
        for (let f in this.filas_finish){
          this.userQueue.push(this.filas_finish[f]);
        }
        postBody.userQueue = [...this.userQueue];

        this.postNewUser(postBody);
      }
    },
  },
  data() {
    return {
      nomeEdit: this.$route.params.nome,
      userMails: [],
      userNames: [],
      id: this.$route.params.id,
      msg: "",
      states: [],
      filas:[],
      perfis: [],
      filas_finish: [],
      name:'',
      email:'',
      username:'',
      password:'',
      confirmPassword:'',
      perfil_id:[],
      userQueue: [],
      queueObject: {
        queue_id:'',
        queue_number:'',
        queue_name:'',
      }

    };
  },
  mounted() {
    this.getFilas();
    this.getPerfil();
    this.getUsers();

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
#profile-name-input{
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}
#profile-name-input2{
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