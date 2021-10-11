<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div class="formularios">
    <PagesSubHeader icon="fal fa-user" titulo="Usuários do sistema">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <form @submit.prevent="carregar()" class="conteiner">
      <div class="form-group">
        <div class="d-inline">
          <div class="row mb-2">
            <div class="col-4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                <b-form-input
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
                    type="text"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-user fa-2x" style="margin-left: 5px" />
                <b-form-input
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
                    v-model="perfis_finish"
                    :placeholder="'Perfil'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_perfis"
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
                      <div class="btn btn-default image-preview-input">
                        <span class="form-icon"
                          ><i class="fal fa-image"></i
                        ></span>
                        <span class="image-preview-input-title"> </span>
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
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-road fa-2x" style="margin-left: 5px" />
                <div id="multiselect-input">
                  <multiselect
                    v-model="filas_finish"
                    :placeholder="'Filas'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_filas"
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
</template>
<script>
import Usuario from "../../domain/User/Usuario";
import Multiselect from "vue-multiselect";
// import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import "jquery";
import "select2";

export default {
  components: {
    PagesSubHeader,
    Multiselect,
  },
  name: "RegistroUsuarios",
  methods: {
    carregar() {
      this.service.register(this.usuario).then(
        () => {
          if (this.id) this.$router.push({ name: "Home" });
          this.usuario = new Usuario();
        },
        (err) => console.log(err)
      );
    },
  },
  data() {
    return {
      usuario: new Usuario(),
      id: this.$route.params.id,
      msg: "",
      states: [],
      perfis_finish: [],
      filas_finish: [],
        finish_filas: [
          { name: "Fila 1000", code: "1000" },
          { name: "Fila 2000", code: "2000" },
        ],
      finish_perfis: [
        { name: "Ativa", code: "A" },
        { name: "Manual", code: "M" },
        { name: "Recebe", code: "R" },
      ],
    };
  },
  created() {},
  mounted() {
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
          $(".image-preview-input-title").text("Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr("src", e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    $(".js-select2-icons").select2({
      minimumResultsForSearch: 1 / 0,
      templateResult: icon,
      templateSelection: icon,
      dropdownParent: $("#modal"),
      escapeMarkup: function (elm) {
        return elm;
      },
    });

    function icon(elm) {
      elm.element;
      return elm.id
        ? "<i class='" + $(elm.element).data("icon") + " mr-2'></i>" + elm.text
        : elm.text;
    }
  },
};
//get
</script>
<style scoped>
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

.form-icon,
.form-icon:hover {
  width: 42px;
}

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