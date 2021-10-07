<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-at" titulo="Finalizações">
      <div class="cart">
        <div class="cart-body" />
      </div>
    </PagesSubHeader>
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a
              id="one-tab"
              aria-controls="One"
              aria-selected="true"
              class="nav-link active"
              data-toggle="tab"
              href="#subir"
              role="tab"
              >Subir</a
            >
          </li>
          <li class="nav-item">
            <a
              id="two-tab"
              aria-controls="Two"
              aria-selected="false"
              class="nav-link"
              data-toggle="tab"
              href="#cadastrar"
              role="tab"
              >Cadastrar</a
            >
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div
          id="subir"
          aria-labelledby="one-tab"
          class="tab-pane fade show active p-3"
          role="tabpanel"
        >
          <div class="row mb-2 justify-content-left">
            <div class="col-4">
              <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Nome da finalização"
                  />
                </div>
            </div>
          </div>
          <div class="row justify-content-left">
            <div class="col-4">
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
                          ><i class="fal fa-at"></i
                        ></span>
                        <span class="image-preview-input-title"> </span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/gif"
                          name="input-file-preview"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subir Arquivo"
                        class="form-control image-preview-filename"
                        id="input-pic"
                        disabled="disabled"
                      />
                    </span>
                  </div>
                </div>
            </div>
          </div>
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                <i class="fal fa-upload mr-2"></i>Importar
              </button>
            </b-col>
            <b-col class="p-3" cols="auto"> </b-col>
          </b-row>
        </div>
        <div
          id="cadastrar"
          aria-labelledby="two-tab"
          class="tab-pane fade p-3"
          role="tabpanel"
        >
          <div class="card mb-g border shadow-0" id="interativo">
            <div class="card-header">
              <div class="row no-gutters align-items-center">
                <div class="col">
                  <span class="h6 font-weight-bold text-uppercase">Nome</span>
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
                    @click="putins++"
                    ><i class="fal fa-plus"></i
                  ></a>
                  <a
                    href="#"
                    class="btn btn-outline-danger btn-sm flex-shrink-0"
                    @click="putins > 1 ? putins-- : putins"
                    ><i class="fal fa-minus"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="mt-2">
                    <div v-for="i of putins" :key="i">
                      <div class="pl-3">
                        <div
                          class="
                            row
                            mb-2
                            no-gutters
                            row-grid
                            align-items-stretch
                          "
                        >
                          
                          <div class="col-4">
                            
                              <div
                                class="profile-content user-name-line d-flex"
                              >
                                <i
                                  class="fal fa-at fa-2x"
                                  style="margin-left: 5px"
                                />
                                <b-form-input
                                  id="profile-name-input"
                                  type="text"
                                  placeholder="Nome da finalização"
                                />
                              </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
            
          </div>
          <TabelaRegistroFinalizacoes />
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
      </div>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";
import TabelaRegistroFinalizacoes from "../../components/DataTables/TabelaRegistroFinalizacoes.vue";

export default {
  components: {
    PagesSubHeader,
    TabelaRegistroFinalizacoes,
  },
  data() {
    return {
      putins: 1,
    };
  },

  methods: {
    add() {
      var input = document.createElement("P");
      var textnode = document.createTextNode("Water");
      input.appendChild(textnode);
      document.getElementById("#interativo").appendChild(input);
    },
  },
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
  },
  name: "RegistroFinalizacoes",
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