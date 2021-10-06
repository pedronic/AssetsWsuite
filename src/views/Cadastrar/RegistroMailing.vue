<template>
  <div>
    <PagesSubHeader icon="fal fa-list-ol" titulo="Mailing">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>
    <div>
      <form>
        <div class="form-group">

          <div class="d-inline">
            <div class="row justify-content-center ">

              <div class="col-4">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-ad"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Nome"
                        type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span id="basic-addon1" class="input-group-text form-icon"
                  ><i class="fal fa-at"></i
                  ></span>
                    <input
                        aria-describedby="basic-addon1"
                        aria-label="Username"
                        class="form-control"
                        placeholder="Data do mailing"
                        type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="input-group mb-3">
                    <select data-placeholder="Fila" class="js-select2-icons form-control" id="multiple-icons" multiple="multiple">
                    <option value="wordpress" data-icon="fal fa-road" selected disabled>Filas</option>
                    <option value="codepen" data-icon="">Fila 1000</option>
                    <option value="drupal" data-icon="">Fila 2000</option>
                </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
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
          </div>
        <b-row>
          <b-col class="mr-auto p-3" cols="auto">
            <button class="btn btn-dark botao-salvar" type="submit"><i class="fal fa-upload mr-2"></i>Importar</button>
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
  </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    PagesSubHeader,
  },
  name: 'RegistroMailing',
  methods: {
    // carregar() {
    //   this.service.register(this.usuario).then(
    //     () => {
    //       if (this.id) this.$router.push({ name: "Home" });
    //       this.usuario = new Usuario();
    //     },
    //     (err) => console.log(err)
    //   );
    // },
  },
  data() {
    return {
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    };
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
    $(".js-select2-icons").select2(
        {
          minimumResultsForSearch: 1 / 0,
          templateResult: icon,
          templateSelection: icon,
          // dropdownParent: $('#myModal'),
          escapeMarkup: function(elm)
          {
            return elm
          }
        });

    function icon(elm)
    {
      elm.element;
      return elm.id ? "<i class='" + $(elm.element).data("icon") + " mr-2'></i>" + elm.text : elm.text
    }
  },
};
</script>
<style scoped>
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

label#kkk {
  padding-top: 2.7px;
}

.form-icon, .form-icon:hover {
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

/*.title {*/
/*  font-family: Arial, Helvetica, sans-serif;*/
/*  text-transform: uppercase;*/
/*  margin-left: 30px;*/
/*  margin-top: 15px;*/
/*}*/

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