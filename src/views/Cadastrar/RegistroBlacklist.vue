<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-align-slash" titulo="Blacklist">
      <div class="cart">
        <div class="cart-body"/>
      </div>
    </PagesSubHeader>
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a id="one-tab" aria-controls="One" aria-selected="true" class="nav-link active" data-toggle="tab" href="#subir"
               role="tab">Subir</a>
          </li>
          <li class="nav-item">
            <a id="two-tab" aria-controls="Two" aria-selected="false" class="nav-link" data-toggle="tab" href="#cadastrar"
               role="tab">Cadastrar</a>
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div id="subir" aria-labelledby="one-tab" class="tab-pane fade show active p-3" role="tabpanel">
          <div class="row justify-content-left">
            <div class="col-4">
              <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                <select id="inputGroupSelect01" class="custom-select">
                  <option disabled selected>Fila</option>
                  <option value="1">Fila 1000</option>
                  <option value="2">Fila 2000</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row justify-content-left">
            <div class="col-4">
              <div class="input-group image-preview">
                  <span class="input-group">
                    <button class="btn btn-default image-preview-clear" style="display:none;" type="button">
                        <span class="glyphicon glyphicon-remove"></span> Limpar
                    </button>
                    <span id="basic-addon1" class="input-group-text form-icon"
                    ><i class="fal fa-at"></i
                    ></span>
                  <input class="form-control image-preview-filename" disabled="disabled" placeholder="Anexar arquivo"
                         type="text">
                    <div class="btn btn-default image-preview-input">
                        <span class="form-icon"><i class="fal fa-upload mr-1"></i>Importar</span>
                        <span class="image-preview-input-title"></span>
                        <input accept=".txt,.csv" name="input-file-preview" type="file"/>
                    </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="cadastrar" aria-labelledby="two-tab" class="tab-pane fade p-3" role="tabpanel">
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna_2">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <select id="inputGroupSelect01" class="custom-select">
                    <option disabled selected>Fila</option>
                    <option value="1">Fila 1000</option>
                    <option value="2">Fila 2000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
                        type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
                        type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
                        type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
                        type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
                        type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row justify-content-left ml-1">
              <div class="coluna">
                <div class="input-group mb-3">
                <span id="basic-addon1" class="input-group-text form-icon"
                ><i class="fal fa-ad"></i
                ></span>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control"
                      maxlength="120"
                      minlength="3"
                      placeholder="DDD"
                      type="text"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Número"
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
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";

export default {
  components: {
    PagesSubHeader,
  },
  mounted() {
    $(document).on('click', '#close-preview', function () {
      $('.image-preview').popover('hide');

    });

    $(function () {

      // Clear event
      $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
          id: 'dynamic',
          width: 50,
          height: 100
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

  },
  name: "BlacklistPhone"
}


</script>

<style scoped>
.coluna_2 {
  flex: 0 0 31.666667%;
  max-width: 31.666667%;
}

.coluna {
  flex: 0 0 16.666667%;
  max-width: 7.766667%;
}

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
  margin-left: 2px;
}

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
  margin-left: 2px;
}

.form-control:disabled, .form-control[readonly] {
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