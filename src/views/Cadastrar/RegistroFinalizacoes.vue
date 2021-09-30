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
          <div class="row justify-content-left">
            <div class="col-4">
              <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-at"></i
                ></span>
                <input
                  aria-describedby="basic-addon1"
                  aria-label="Username"
                  class="form-control"
                  maxlength="120"
                  minlength="3"
                  placeholder="Nome da finalização"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-left">
            <div class="col-4">
              <div class="input-group image-preview">
                <span class="input-group">
                  <button
                    type="button"
                    class="btn btn-default image-preview-clear"
                    style="display: none"
                  >
                    <span class="glyphicon glyphicon-remove"></span> Limpar
                  </button>
                  <div class="btn btn-default image-preview-input">
                    <span class="form-icon"><i class="fal fa-at"></i></span>
                    <span class="image-preview-input-title"> </span>
                    <input
                      type="file"
                      accept=".txt,.csv"
                      name="input-file-preview"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Anexar Arquivo"
                    class="form-control image-preview-filename"
                    disabled="disabled"
                  />
                </span>
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
          <div class="card mb-g border shadow-0">
            <div class="card-header">
              <div class="row no-gutters align-items-center">
                <div class="col">
                  <span class="h6 font-weight-bold text-uppercase">Nome</span>
                </div>
                <div class="col d-flex">
                  <a
                    href="javascript:void(0);"
                    class="
                      btn btn-outline-success btn-sm
                      ml-auto
                      mr-2
                      flex-shrink-0
                    "
                    ><i class="fal fa-plus"></i
                  ></a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-outline-danger btn-sm flex-shrink-0"
                    ><i class="fal fa-minus"></i
                  ></a
                  >
                </div>
              </div>
            </div>

            <div class="card-body p-0">
              <div class="row no-gutters row-grid">
                <div class="col-12">
                  <div class="row no-gutters row-grid align-items-stretch">
                    <div class="col-md">
                      <div class="p-3">
                        <div class="d-flex">
                          <div class="d-inline-flex flex-column">
                            <div class="input-group mb-3">
                              <span
                                id="basic-addon1"
                                class="input-group-text form-icon"
                                ><i class="fal fa-at"></i
                              ></span>
                              <input
                                aria-describedby="basic-addon1"
                                aria-label="Username"
                                class="form-control"
                                maxlength="120"
                                minlength="3"
                                placeholder="Nome da finalização"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
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
.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
}

.coluna_2 {
  flex: 0 0 31.666667%;
  max-width: 31.666667%;
}

.coluna {
  flex: 0 0 16.666667%;
  max-width: 7.766667%;
}

.btn-default {
  background-image: linear-gradient(to top, #e9ecef, #e9ecef);
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

.cart-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.cart {
  box-shadow: none;
  border: none;
}
</style>