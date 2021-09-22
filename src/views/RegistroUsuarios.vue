<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-user" titulo="Usuários do sistema">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>
    <form @submit.prevent="carregar()">
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
                <div class="input-group ">
                  <label id="basic-addon1" for="selecao-arquivo" class="input-group-text form-icon"
                  ><i class="fal fa-image"></i
                  ></label>
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control pt-1 d-none"
                      placeholder="Foto"
                      type="text"
                      disabled
                  />
                  <input
                      aria-describedby="basic-addon1"
                      aria-label="Username"
                      class="form-control pt-1"
                      placeholder="Foto"
                      type="file"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          <!--        <div class="col-10">-->
          <!--          <div class="input-group">-->
        <div class="row justify-content-center">
          <div class="coluna">
<!--            <div class="d-inline">-->
            <span id="basic-addon1" class="input-group-text form-icon d-inline"
            ><i class="fal fa-road"></i
            ></span>
<!--            </div>-->
<!--            <div class="d-inline">-->
            <select class="js-example-basic-multiple" multiple="multiple" name="states">
              <option disabled selected value=" ">Fila</option>
              <option value="AL">Fila 1000</option>
              <option value="WY">Fila 2000</option>
            </select>
<!--              </div>-->
          </div>
        </div>
        <div class="bottom">
          <div class="d-inline">
            <button class="btn btn-dark d-inline botao-salvar" type="submit">Salvar</button>
          </div>
          <div class="custom-control custom-switch d-inline centralize">
            <input
                v-if="usuario.status"
                id="customSwitch1"
                checked
                class="custom-control-input bg-dark"
                type="checkbox"
            />
            <input
                v-else
                id="customSwitch1"
                class="custom-control-input bg-dark"
                type="checkbox"
            />
            <label id="kkk" class="custom-control-label" for="customSwitch1"
            >Status</label
            >
          </div>
        </div>
      </div>
    </form>
  </div>


</template>
<script>
import Usuario from "../domain/User/Usuario";
import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import PagesSubHeader from "../components/subheader/PagesSubHeader.vue";
import "jquery";
// import Vue from 'vue'
import "select2";

export default {
  components: {
    PagesSubHeader,
    // select2,
  },
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
    FotoSelect() {

    }
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
    this.usuario = new UsuarioMetodos(this.$resource);
    if (this.id) {
      this.service.search(this.id).then((user) => (this.user = user));
    }
  },
  mounted() {
    // function ex() {
    $('.js-example-basic-multiple').select2();
    // }
  },
};
</script>
<style scoped>

.coluna {
  flex: 0 0 91.666667%;
  max-width: 91.566667%;
}

label#kkk {
  padding-top: 2.7px;
}

.botao-salvar {
  background-color: #0d6d9d;
}

.botao-salvar:hover {
  background-color: #0d6d9dad;
}

.form-icon, .form-icon:hover {
  width: 42px;
}

.centralize {
  margin-left: 89%;
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


.bottom {
  margin-top: 20px;
}

.panel-content {
  overflow: auto;
}

.form-label {
  font-weight: 500;
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