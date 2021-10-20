<!--  este é um componente que faz um formulário para cadastrar no banco de dados-->
<template>
  <div class="formularios">
    <PagesSubHeader icon="fal fa-route" titulo="Rotas">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>

    <!-- Formulário de preenchimento [INÍCIO] -->
    <form @submit.prevent="carregar()" class="conteiner">
      <div class="form-group">
        <div class="d-inline">
          <div class="row mb-2">
            <div class="col-4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-route fa-2x" style="margin-left: 5px" />
                <b-form-input
                  v-model="name"
                  id="profile-name-input"
                  type="text"
                  placeholder="Rota"
                />
              </div>
            </div>
            <b-button
              class="head-add-button btn-success"
              v-b-modal="'new_line'"
              variant="outline-dark"
            >
              <span class="fal fa-plus fa-1x head-add-button" />
            </b-button>
          </div>
        </div>
        <!-- TABELA -->
        <TabelaRegistroRotas v-show="visible" />
        <!-- TABELA  -->
        <!-- CONFIRMAR DADOS [INÍCIO] -->
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
        <!-- CONFIRMAR DADOS [INÍCIO] -->
      </div>
    </form>
    <!-- Formulário de preenchimento [FIM] -->
    <!-- Modal de adição [Início] -->
    <b-modal
      id="new_line"
      size="lg"
      ok-only
      ok-title="Salvar"
      ok-variant="info"
      @ok="visible == false ? visible=true : visible=true"
      title=" "
      ><div class="card mb-g border shadow-0 pb-1" id="interativo">
        <div class="card-header">
          <div class="row no-gutters align-items-center">
            <div class="col">
              <span class="h6 font-weight-bold text-uppercase"
                >Adicionar Operadora</span
              >
            </div>
            <div class="col d-flex">
              <a
                href="#"
                class="
                  btn btn-outline-success btn-sm
                  ml-auto
                  mr-2
                  flex-shrink-0
                "
                @click="addOperadora()"
                ><i class="fal fa-plus"></i
              ></a>
              <a
                href="#"
                class="btn btn-outline-danger btn-sm flex-shrink-0"
                @click="qtd_operadoras > 1 ? removeOperadora() : qtd_operadoras"
                ><i class="fal fa-minus"></i
              ></a>
            </div>
          </div>
        </div>
        <!-- Tab {Operadoras} -->
        <div class="mt-2">
          <b-container fluid>
            <b-col cols="12">
              <!-- THEAD -->
              <b-row class="tab-top-section-row2">
                <b-col class="empty-head-container">
                  <span class="blank-space" />
                </b-col>
                <b-col cols="5" class="dia-head-container">
                  <span class="dia-head">Operadora</span>
                </b-col>
                <b-col cols="3" class="time-head-container">
                  <span class="time-head">Disponível</span>
                </b-col>
                <b-col cols="3" class="time-head-container2">
                  <span class="time-head2">Quantidade</span>
                </b-col>
              </b-row>
              <!-- THEAD: FIM -->

              <!-- TBODY -->
              <div v-for="d in operadoras_criadas" :key="d.index">
                <b-row :class="d.index % 2 == 0 ? 'grey-bg' : ''">
                  <!-- índice -->
                  <b-col cols="1" class="dia-body-container">
                    <span class="dia-body">{{ d.index }}</span>
                  </b-col>
                  <!-- índice: FIM -->
                  <!-- operadoras -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- operadoras FIM -->
                  <!-- col Disponível -->
                  <b-col cols="3" class="time-body-container">
                    <form class="was-validated">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control is-valid ml-3"
                          id="simpleinputInvalid2"
                          required
                          value="test"
                          v-model="d.disponivel"
                          placeholder="Operadora"
                        />
                        
                      </div>
                    </form>
                  </b-col>
                 
                  <!-- col Disponível FIM -->
                  <!-- col Quantidade -->
                  <b-col cols="3" class="time-body-container">
                    <form class="was-validated">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control is-valid ml-4"
                          id="simpleinputInvalid2"
                          required
                          value="test"
                          v-model="d.quantidade"
                          placeholder="Operadora"
                        />
                        
                      </div>
                    </form>
                    <!-- <b-form-input
                      v-model="d.quantidade"
                      id="profile-name-input3"
                      type="text"
                      placeholder="Operadora"
                    /> -->
                  </b-col>
                  <!-- col Quadidade FIM -->
                </b-row>
              </div>
            </b-col>
          </b-container>
          <!-- TBODY FIM -->
        </div>
        <!-- FIM tab qtd_operadoras -->
      </div>
    </b-modal>
    <!-- Modal de edição [Fim] -->
  </div>
</template>

<script>
import TabelaRegistroRotas from "../../components/DataTables/TabelaRegistroRotas.vue";
import axios from "axios";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import "jquery";
import { baseApiUrl } from "@/config/global";
import Multiselect from "vue-multiselect";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
    TabelaRegistroRotas
  },
  name: "RegistroUsuarios",
  methods: {
    testPerfilSelect() {
      console.log("Filas Selecionadas:\n", this.filas_finish);
    },

    async getFilas() {
      let f = await axios.get(baseApiUrl + "/queues");
      console.log("f.data.data\n", f.data.data);
      this.filas = f.data.data;
    },
    async getPerfil() {
      let p = await axios.get(baseApiUrl + "/perfils");
      console.log("p.data.data\n", p.data.data);
      this.perfis = p.data.data;
    },
    async getUsers() {
      let users = axios.get(baseApiUrl + "/users");
      for (let u in users) {
        this.userMails.push(users[u].email);
        this.userNames.push(users[u].username);
      }
    },
    async postNewUser(nu) {
      let s = await axios.post(`${baseApiUrl}/users`, nu);
      console.log("Post status:\n", s);
    },
    carregar() {
      // Refatorar para incluir avisos de toast após ação
      let passCheck = !(this.password === this.confirmPassword);
      let blankPass = !(this.password.trim().length > 0);
      let blankName = !(this.name.trim().length > 0);
      let blankMail = !(this.email.trim().length > 0);
      let blankUser = !(this.username.trim().length > 0);
      let blankProfile = !(this.perfil_id.trim().length > 0);
      let validEmail = !(this.userMails.indexOf(this.email.trim()) > -1);
      let validUsername = !(this.userNames.indexOf(this.username.trim()) > -1);
      if (
        passCheck ||
        blankPass ||
        blankName ||
        blankMail ||
        blankUser ||
        blankProfile ||
        validEmail ||
        validUsername
      )
        return;
      else {
        let postBody = {};
        postBody.username = this.username.trim();
        postBody.email = this.email.trim();
        postBody.name = this.name.trim();
        postBody.password = this.password.trim();
        postBody.confirmPassword = this.confirmPassword.trim();
        postBody.perfil_id = this.perfil_id.id;
        for (let f in this.filas_finish) {
          this.userQueue.push(this.filas_finish[f]);
        }
        postBody.userQueue = [...this.userQueue];

        this.postNewUser(postBody);
      }
    },
    addOperadora() {
      this.qtd_operadoras++;
      this.operadoras_criadas.push({
        index: this.qtd_operadoras,
        operadora_selecionada: "operadora",
        disponivel: "",
        quantidade: "",
      });
    },
    removeOperadora() {
      this.qtd_operadoras--;
      this.operadoras_criadas.pop()
    },
    // habilitar() {
    //   if (this.visible == false) {
    //     this.visible.set;
    //     console.clear();
    //     console.log(this.visible);
    //   }
    // }
  },
  data() {
    return {
      visible: false,
      qtd_operadoras: 1,
      operadoras: ["tim", "vivo", "claro", "oi"],
      operadoras_criadas: [
        {
          index: 1,
          operadora_selecionada: "operadora",
          disponivel: "",
          quantidade: "",
        },
      ],
      rotas: [],
      // rotas: {

      // },
      id: this.$route.params.id,
      msg: "",
      states: [],
      filas_finish: [],
      userQueue: [],
      queueObject: {
        queue_id: "",
        queue_number: "",
        queue_name: "",
      },
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
.tab-pane.active {
  border-width: 2px !important;
  border-color: black !important;
}
div.tabs > div > ul.nav.nav-tabs.nav-justified > li.nav-item > a.nav-link {
  background-color: whitesmoke !important;
  text-decoration: none !important;
}

div#timepicker-append > div > button {
  border: none;
}

.grey-bg {
  border-bottom-width: 2px;
  background-color: rgba(13, 109, 165, 0.08);
}

div.container-fluid > div.col-6 > div.container-fluid,
div.container-fluid > div.col-6 > div.row,
div.tab-pane.active > div.container-fluid > div.col-6 {
  padding-left: 0;
  padding-right: 0;
}

.dia-head-container,
.produtiva-head-container,
.obrigatoria-head-container,
.alerta-head-container,
.limite-head-container,
.icone-head-container,
.ativa-head-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding: 5px;
  padding-left: 0px;
}

.dia-head-container {
  padding-right: 5px;
  margin-left: -15px;
}

.time-body-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  /*   */
  margin-left: -8px;
  margin-right: -4px;
}
.time-body-container2 {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 5px;
  margin-right: -5px;
}

.time-head-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
  margin-left: 20px;
}
.time-head-container2 {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
  margin-right: -7px;
}

.dia-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.dia-body-container[data-v-a13cb5f8] {
  display: flex;
  align-items: left;
  padding: 0px;
  padding-left: 4ch;
  /* padding-right: 0px; */
}

.blank-space {
  background-color: white !important;
  width: 100%;
}

/* .dia-body {
    margin-left: 2ch;
} */

.empty-head-container.col {
  min-width: 20px;
}
.empty-head-container2.col {
  max-width: 7px;
}
.empty-body-container.col {
  min-width: 5px;
  background-color: white;
  margin-left: -14px;
  margin-right: -10px;
}

.time-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  margin-left: -35px;
  margin-right: -6px;
}

.time-head2 {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  margin-left: -9px;
  margin-right: -6px;
}

.salvar-container {
  margin-top: 5px;
  bottom: 0;
}
.filas-top-section-row {
  margin-bottom: 1ch;
}
.filas-top-section-row2 {
  margin-bottom: 3ch;
}
.tab-top-section-row {
  margin-top: 2.5ch;
  margin-bottom: 1ch;
}

.tab-top-section-row2 {
  margin-top: 2.5ch;
  /* margin-bottom: 1ch; */
  margin-left: 0px;
  margin-right: -9px;
}

.head-items {
  align-content: center;
  align-items: center;
}
/* .profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
} */
.botao-salvar {
  background-color: #0d6d9dad;
}
.botao-salvar:hover {
  background-color: #0d6d9d;
}
.card-body.spacer {
  padding: 5px;
  height: 50px;
  width: 0;
  border: none;
  border-color: #ffffff transparent;
  color: #ffffff transparent;
}
.card.spacer {
  box-shadow: none;
  border: none;
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
  /* border-top-width: 2px;
    border-bottom-width: 2px; */
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
  width: 100%;
  margin-left: 13px;
  margin-right: -13px;
  border-left-color: black;
  border-radius: 0px;
}

#profile-name-input3 {
  width: 100%;
  margin-left: 33px;
  margin-right: -33px;
  border-left-color: black;
  border-radius: 0px;
}

#multiselect-input {
  display: flex;
  width: 100%;
  /* margin-left: 6px; */
}
.input-group-sm > .form-control {
  font-size: 13px !important;
}
/* #profile-name-input>.multiselect>.multiselect__tags{
    border-radius: 0px !important;
    border-left-width: 1px !important;
    border-left-color: black;
    width: 100%;
} */

i.fal.fa-2x {
  width: 26px;
  height: 26px;
}

.tab-content {
  border-left: 1px solid green;
  border-right: 1px solid green;
  padding: 10px;
}

.nav-tabs {
  margin-bottom: 0;
}
</style>