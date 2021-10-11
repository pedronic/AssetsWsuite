<template>
  <div>
    <PagesSubHeader icon="fal fa-user-headset" titulo="Scripts">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>
    <div>
      <form>
        <div class="form-group">
         <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-6">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-ad fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-6">
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
          </div>
          <div class="panel ">
            <div class="panel-container show">
              <div class="panel-content">
                <TabelaMCDU/>
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
import TabelaMCDU from "../../components/DataTables/TabelaMCDU.vue";
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    TabelaMCDU,
    PagesSubHeader,
  },
  name: "RegistroScripts",
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