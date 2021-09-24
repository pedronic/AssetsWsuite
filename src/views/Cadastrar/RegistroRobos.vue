<template>
  <div>
    <PagesSubHeader titulo="Robôs" icon="fal fa-user-robot">
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
                <div class="input-group mb-3">
                <span class="input-group-text form-icon" id="basic-addon1"
                ><i class="far fa-ad"></i
                ></span>
                  <input
                      type="text"
                      class="form-control"
                      placeholder="Nome"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      minlength="3"
                      maxlength="120"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="input-group mb-3">
                  <span class="input-group-text form-icon" id="basic-addon1"
                  ><i class="fal fa-user-secret"></i
                  ></span>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="Login"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="input-group mb-3">
                <span class="input-group-text form-icon" id="basic-addon1"
                ><i class="fal fa-address-card"></i
                ></span>
                  <input
                      type="text"
                      class="form-control"
                      placeholder="Documento"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      minlength="3"
                      maxlength="120"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="panel ">
            <div class="panel-container show">
              <div class="panel-content">
                <TabelaFilas nome="Robô" />
              </div>
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
  </div>
</template>

<script>
import TabelaFilas from "../../components/DataTables/TabelaFilas.vue";
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    TabelaFilas,
    PagesSubHeader,
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
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    };
  },
  created() {
    // this.usuario = new UsuarioMetodos(this.$resource);
    // if (this.id) {
    //   this.service.search(this.id).then((user) => (this.user = user));
    // }
  },
};
</script>
<style scoped>
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
.card-body{
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}
.card{
  box-shadow: none;
  border: none;
}

</style>