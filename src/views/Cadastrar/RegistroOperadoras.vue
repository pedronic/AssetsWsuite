<template>
  <div>
    <PagesSubHeader icon="fal fa-sim-card" titulo="Operadoras">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div>
      <form>
        <div class="form-group">
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-6">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Nome"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-key fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="Password"
                      placeholder="Senha"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="IP"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-door-closed fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Porta"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-exchange fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Contexto"
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
                    <i
                      class="fal fa-file-audio fa-2x"
                      style="margin-left: 5px"
                    />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Codec"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="From user"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-sort-numeric-up fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Call limit"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Default user"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-12">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-textarea
                    id="profile-name-input"
                    placeholder="Formato discagem"
                    rows="2"
                    max-rows="15"
                  ></b-form-textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-3">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="tipos_finish"
                    :placeholder="'Perfil'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_tipos"
                    :multiple="false"
                  />
                </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Accountcode"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Channel"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="DTMF"
                    />
                  </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Lastms"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="NAT"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Perfil"
                    />
                  </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-3">
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="prioridades_finish"
                    :placeholder="'Prioridade'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_prioridades"
                    :multiple="false"
                  />
                </div>
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="qualificacoes_finish"
                    :placeholder="'Qualificar'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_qualificacoes"
                    :multiple="false"
                  />
                </div>
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Reg Seconds"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Reg Server"
                    />
                  </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Tec Prefix"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Tec Prefix Local"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Transport"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Usuário Agente"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3 justify-content-left">
            <div class="col-12">
              <div class="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="local"
                />
                <label class="custom-control-label pt-1 pr-1" for="local"
                  >Local</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="ldn" />
                <label class="custom-control-label pt-1 pr-1" for="ldn"
                  >LDN</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="vc1" />
                <label class="custom-control-label pt-1 pr-1" for="vc1"
                  >VC1</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="vc2" />
                <label class="custom-control-label pt-1 pr-1" for="vc2"
                  >VC2</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="VC3" />
                <label class="custom-control-label pt-1 pr-1" for="VC3"
                  >VC3</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="LDI" />
                <label class="custom-control-label pt-1 pr-1" for="LDI"
                  >LDI</label
                >
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
                <label id="kkk" class="custom-control-label" for="customSwitch1"
                  >Status</label
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
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";


export default {
  components: {
    PagesSubHeader,
    Multiselect
  },
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
      prioridades_finish: [],
      qualificacoes_finish: [],
      tipos_finish: [],
      finish_tipos: [
        { name: "Ativa", code: "A" },
        { name: "Manual", code: "M" },
        { name: "Recebe", code: "R" },
      ],
       finish_prioridades: [
        { name: "Ativa", code: "A" },
        { name: "Manual", code: "M" },
        { name: "Recebe", code: "R" },
      ],
       finish_qualificacoes: [
        { name: "Ativa", code: "A" },
        { name: "Manual", code: "M" },
        { name: "Recebe", code: "R" },
      ],
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    };
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