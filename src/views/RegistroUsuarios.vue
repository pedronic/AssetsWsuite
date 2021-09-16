<!--  este é um componente que faz um formulário para castrar usuários no banco de dados-->
<template>
  <div>
    <PagesSubHeader titulo="Usuários do sistema" icon="fal fa-user" />
    <div>
      <form @submit.prevent="carregar()" class="register-form">
        <div class="d-inline">
          <div class="row orientation">
            <div class="col-4">
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
            <div class="col-4">
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
            <div class="col-4">
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
          </div>
        </div>
        <div class="d-inline">
          <div class="row justify-content-center orientation">
            <div class="col-4">
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
            <div class="col-4">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fal fa-id-card"></i
                ></span>
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected disabled>Perfil</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div class="col-4">
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
<!--        <div class="form-group">-->
<!--          <label class="form-label" for="multiple-basic">-->
<!--            Basic Multi Select-->
<!--          </label>-->
<!--          <select class="select2 form-control select2-hidden-accessible" multiple="multiple" id="multiple-basic" data-select2-id="multiple-basic" tabindex="-1" aria-hidden="true">-->
<!--            <optgroup label="Alaskan/Hawaiian Time Zone">-->
<!--              <option value="AK">Alaska</option>-->
<!--              <option value="HI">Hawaii</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Pacific Time Zone">-->
<!--              <option value="CA" selected="">California</option>-->
<!--              <option value="NV">Nevada</option>-->
<!--              <option value="OR">Oregon</option>-->
<!--              <option value="WA">Washington</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Mountain Time Zone">-->
<!--              <option value="AZ">Arizona</option>-->
<!--              <option value="CO" selected="">Colorado</option>-->
<!--              <option value="ID">Idaho</option>-->
<!--              <option value="MT">Montana</option>-->
<!--              <option value="NE">Nebraska</option>-->
<!--              <option value="NM">New Mexico</option>-->
<!--              <option value="ND">North Dakota</option>-->
<!--              <option value="UT">Utah</option>-->
<!--              <option value="WY">Wyoming</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Central Time Zone">-->
<!--              <option value="AL">Alabama</option>-->
<!--              <option value="AR">Arkansas</option>-->
<!--              <option value="IL">Illinois</option>-->
<!--              <option value="IA">Iowa</option>-->
<!--              <option value="KS">Kansas</option>-->
<!--              <option value="KY">Kentucky</option>-->
<!--              <option value="LA">Louisiana</option>-->
<!--              <option value="MN">Minnesota</option>-->
<!--              <option value="MS">Mississippi</option>-->
<!--              <option value="MO">Missouri</option>-->
<!--              <option value="OK">Oklahoma</option>-->
<!--              <option value="SD">South Dakota</option>-->
<!--              <option value="TX">Texas</option>-->
<!--              <option value="TN">Tennessee</option>-->
<!--              <option value="WI">Wisconsin</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Eastern Time Zone">-->
<!--              <option value="CT">Connecticut</option>-->
<!--              <option value="DE">Delaware</option>-->
<!--              <option value="FL">Florida</option>-->
<!--              <option value="GA">Georgia</option>-->
<!--              <option value="IN">Indiana</option>-->
<!--              <option value="ME">Maine</option>-->
<!--              <option value="MD">Maryland</option>-->
<!--              <option value="MA">Massachusetts</option>-->
<!--              <option value="MI">Michigan</option>-->
<!--              <option value="NH">New Hampshire</option>-->
<!--              <option value="NJ">New Jersey</option>-->
<!--              <option value="NY">New York</option>-->
<!--              <option value="NC">North Carolina</option>-->
<!--              <option value="OH">Ohio</option>-->
<!--              <option value="PA">Pennsylvania</option>-->
<!--              <option value="RI">Rhode Island</option>-->
<!--              <option value="SC">South Carolina</option>-->
<!--              <option value="VT">Vermont</option>-->
<!--              <option value="VA">Virginia</option>-->
<!--              <option value="WV">West Virginia</option>-->
<!--            </optgroup>-->
<!--          </select>-->
<!--          <span class="select2 select2-container select2-container&#45;&#45;default select2-container&#45;&#45;below" dir="ltr" data-select2-id="9">-->
<!--            <span class="selection">-->
<!--              <span class="select2-selection select2-selection&#45;&#45;multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false">-->
<!--                <ul class="select2-selection__rendered">-->
<!--                  <li class="select2-selection__choice" title="California" data-select2-id="103">-->
<!--                    <span class="select2-selection__choice__remove" role="presentation">×</span>-->
<!--                  </li>-->
<!--                  -->
<!--        </div>-->
<!--        <b-select class="select2-selection__rendered orientation" :multiple="multiple">
          <option selected disabled>Filas</option>
          <option value="1000">fila 1000</option>
          <option value="2000">fila 2000</option>
        </b-select> -->

        <div class="bottom">
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
// import TabelaFilas from "../components/DataTables/TabelaFilas.vue";
import PagesSubHeader from "../components/subheader/PagesSubHeader.vue";

export default {
  components: {
    // TabelaFilas,
    PagesSubHeader,
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
      msg: '',
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
  width: 100%;
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
  margin: 50px 0px 40px;
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
</style> 