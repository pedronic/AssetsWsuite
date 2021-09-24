<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div class="formularios">
    <PagesSubHeader icon="fal fa-user" titulo="Usuários do sistema">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>
    <form @submit.prevent="carregar()" class="conteiner">
      <div class="form-group">
        <div class="d-inline">
          <div class="row ">
            <div class="col-4">
              <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="far fa-ad"></i
                ></span>
                <input
                    v-model.lazy="usuario.nome"
                    aria-describedby="basic-addon1"
                    aria-label="Username"
                    class="form-control"
                    maxlength="120"
                    minlength="3"
                    placeholder="Nome"
                    type="text"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="d-inline">
                <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-at"></i
                  ></span>
                  <input
                      v-model.lazy="usuario.email"
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      placeholder="Email"
                      type="email"
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-user"></i
                ></span>
                <input
                    v-model.lazy="usuario.user"
                    aria-describedby="basic-addon1"
                    aria-label="Username"
                    class="form-control"
                    maxlength="120"
                    minlength="3"
                    placeholder="Usuário"
                    type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="d-inline">
          <div class="row justify-content-center ">
            <div class="col-4">
              <div class="d-inline">
                <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-key"></i
                  ></span>
                  <input
                      v-model.lazy="usuario.senha"
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      placeholder="Senha"
                      type="password"
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group ">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-id-card"></i
                ></span>
                <select id="inputGroupSelect01" class="custom-select">
                  <option disabled selected>Perfil</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <div class="d-inline">
                <div class="input-group image-preview">
                  <span class="input-group">
                    <!-- image-preview-clear button -->
                    <button type="button" class="btn btn-default image-preview-clear" style="display:none;">
                        <span class="glyphicon glyphicon-remove"></span> Limpar
                    </button>
                    <!-- image-preview-input -->
                    <div class="btn btn-default image-preview-input">
                        <span class="form-icon"><i class="fal fa-image"></i></span>
                        <span class="image-preview-input-title"> </span>
                        <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview"/> <!-- rename it -->
                    </div>
                  <input type="text" placeholder="Foto" class="form-control image-preview-filename" disabled="disabled"> <!-- don't give a name === doesn't send on POST/GET -->
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="coluna">
            <span id="basic-addon1" class="input-group-text form-icon d-inline"
            ><i class="fal fa-road"></i
            ></span>
            <select class="js-example-basic-multiple" multiple="multiple" name="states">
              <option disabled selected value=" ">Fila</option>
              <option value="AL">Fila 1000</option>
              <option value="WY">Fila 2000</option>
            </select>
          </div>
        </div>
        <b-row>
          <b-col class="mr-auto p-3" cols="auto">
            <button class="btn btn-dark botao-salvar" type="submit">Salvar</button>
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
              <label id="kkk" class="custom-control-label "
                     for="customSwitch1">Status</label
              >
            </div>
          </b-col>
        </b-row>
      </div>
    </form>
  </div>
</template>
<script>
import Usuario from "../domain/User/Usuario";
// import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import PagesSubHeader from "../components/subheader/PagesSubHeader.vue";
import "jquery";
// import Vue from 'vue'
import "select2";

export default {
  components: {
    PagesSubHeader,
    // select2,
  },
    name: 'RegistroUsuarios',
  methods: {
    carregar() {
      this.service.register(this.usuario).then(
          () => {
            if (this.id) this.$router.push({name: "Home"});
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
      msg: '',
      states: [],
    };
  },
  created() {


  },
  mounted() {

    $(document).on('click', '#close-preview', function(){
      $('.image-preview').popover('hide');

    });

    $(function() {

      // Clear event
      $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function (){
        var img = $('<img/>', {
          id: 'dynamic',
          width:50,
          height:100
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
          $(".image-preview-input-title").text("Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
      });
    });
    $('.js-example-basic-multiple').select2();
  },
};
</script>
<style scoped>

.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.image-preview-input input[type=file] {
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
  margin-left:2px;
}
.form-control:disabled, .form-control[readonly] {
  background-color: #ffffff;
  opacity: 1;
}
.coluna {
  flex: 0 0 91.666667%;
  max-width: 91.566667%;
}

label#kkk {
  padding-top: 2.7px;
}

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
}

.form-icon, .form-icon:hover {
  width: 42px;
}

.centralize {
  margin-left: 89%;
}

.bottom {
  margin-top: 20px;
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

.conteiner{
    padding: 0;
}

.col-botoes{
    padding-left: 3px !important;
    padding-right: 3px !important;
}
.col-inputs{
    padding-left: 3px !important;
    padding-right: 10px !important;
}


</style>