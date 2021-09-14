<template>
  <div>
    <h1 class="title">usuários do sistema</h1>
    <div>
      <form @submit.prevent="carregar()" class="register-form">
        <div class="d-inline">
          <div class="row justify-content-center orientation">
            <div class="col-6">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
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
                  v-model.lazy="usuario.nome"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="d-inline">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="fal fa-at"></i
                  ></span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    v-model.lazy="usuario.email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-inline">
          <div class="row justify-content-center orientation">
            <div class="col-6">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fal fa-user"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Usuário"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  minlength="3"
                  maxlength="120"
                  v-model.lazy="usuario.user"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="d-inline">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="fal fa-key"></i
                  ></span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Senha"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    v-model.lazy="usuario.senha"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-inline">
          <div class="row justify-content-center orientation">
            <div class="col-6">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fal fa-id-card"></i
                ></span>
                <select
                  class="custom-select"
                  id="inputGroupSelect01"
                >
                  <option selected disabled>Perfil</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="d-inline">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01"
                      ><i class="fal fa-image"></i
                    ></span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label class="custom-file-label" for="inputGroupFile01"
                      >Foto</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel orientation">
            <div class="panel-container show">
                <div class="panel-content">
                    <TabelaFilas/>
                </div>
            </div>
        </div>
        <div class="header">
          <div class="d-inline">
            <button type="submit" class="btn btn-dark d-inline">Salvar</button>
          </div>
          <div class="custom-control custom-switch d-inline centralize">
            <input
              v-if="usuario.status"
              type="checkbox"
              class="custom-control-input bg-dark"
              id="customSwitch1"
              checked
            />
            <input
              v-else
              type="checkbox"
              class="custom-control-input bg-dark"
              id="customSwitch1"
            />
            <label class="custom-control-label" for="customSwitch1"
              >Status</label
            >
          </div>
        </div>
        <!-- </div> -->
      </form>
    </div>
  </div>
</template>

<script>
import Usuario from "../domain/User/Usuario";
import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import TabelaFilas from '../components/DataTables/TabelaFilas.vue'


export default {
  components: {
    TabelaFilas,
  },
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
    };
  },
  created() {
    this.usuario = new UsuarioMetodos(this.$resource);
    if (this.id) {
      this.service.search(this.id).then((user) => (this.user = user));
    }
  },
};
</script>
<style scoped>
.centralize {
  margin-left: 450px;
}
.orientation {
  width: 985px;
}
.invalid {
  color: brown;
}
.title {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  margin-left: 30px;
  margin-top: 15px;
}
.register-form {
  margin: 50px 65px 40px;
}
.bar {
  width: 955.5px !important;
}
.header {
  margin-top: 139px;
}

.panel-content{
    overflow: auto;
}
.panel .panel-container .panel-content {
    padding: 0;
}
</style> 