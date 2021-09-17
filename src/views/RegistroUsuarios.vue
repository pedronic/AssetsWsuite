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
              <div class="input-group mb-3">
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
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span id="inputGroupFileAddon01" class="input-group-text form-icon"
                    ><i class="fal fa-image"></i
                    ></span>
                  </div>
                  <div class="custom-file">
                    <input
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        class="custom-file-input"
                        type="file"
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
<!--          <select id="multiple-basic" aria-hidden="true" class="select2 form-control select2-hidden-accessible"-->
<!--                  data-select2-id="multiple-basic" multiple="multiple" tabindex="-1">-->
<!--            <optgroup label="Alaskan/Hawaiian Time Zone">-->
<!--              <option value="AK">Alaska</option>-->
<!--              <option value="HI">Hawaii</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Pacific Time Zone">-->
<!--              <option selected="" value="CA">California</option>-->
<!--              <option value="NV">Nevada</option>-->
<!--              <option value="OR">Oregon</option>-->
<!--              <option value="WA">Washington</option>-->
<!--            </optgroup>-->
<!--            <optgroup label="Mountain Time Zone">-->
<!--              <option value="AZ">Arizona</option>-->
<!--              <option selected="" value="CO">Colorado</option>-->
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
<!--          <span class="select2 select2-container select2-container&#45;&#45;default select2-container&#45;&#45;below" data-select2-id="9"-->
<!--                dir="ltr">-->
<!--            <span class="selection">-->
<!--              <span aria-disabled="false" aria-expanded="false" aria-haspopup="true"-->
<!--                    class="select2-selection select2-selection&#45;&#45;multiple" role="combobox" tabindex="-1">-->
<!--                <ul class="select2-selection__rendered">-->
<!--                  <li class="select2-selection__choice" data-select2-id="103" title="California">-->
<!--                    <span class="select2-selection__choice__remove" role="presentation">×</span>-->
<!--                    "California"-->
<!--                  </li>-->
<!--                  <li class="select2-selection__choice" data-select2-id="13" title="Colorado">-->
<!--                    <span class="select2-selection__choice__remove" role="presentation">×</span>-->
<!--                    "Colorado"-->
<!--                  </li>-->
<!--                  <li class="select2-search select2-search&#45;&#45;inline">-->
<!--<input aria-autocomplete="list" autocapitalize="none" autocomplete="off" autocorrect="off" class="select2-search__field"-->
<!--       placeholder role="searchbox" spellcheck="false" style="width: 9em;" tabindex="0"-->
<!--       type="search">-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </span>-->
<!--            </span>-->
<!--            <span class="dropdown-wrapper" aria-hidden="true"></span>-->
<!--          </span>-->
<!--        </div>-->
        <!--        <b-select class="select2-selection__rendered " :multiple="multiple">
                  <option selected disabled>Filas</option>
                  <option value="1000">fila 1000</option>
                  <option value="2000">fila 2000</option>
                </b-select> -->

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
            <label class="custom-control-label" id="kkk" for="customSwitch1"
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

export default {
  components: {

    PagesSubHeader,
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
label#kkk {
  padding-top: 2.7px;
}
.botao-salvar{
  background-color: #0d6d9d;
}
.botao-salvar:hover{
  background-color: #0d6d9dad;
}
.form-icon, .form-icon:hover {
  width: 42px;
}
.centralize {
  margin-left: 450px;
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
.form-label {
  font-weight: 500;
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