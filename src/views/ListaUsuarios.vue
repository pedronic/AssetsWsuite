<template>
   <div class="relatorios">
        <PagesSubHeader titulo="Usuários do sistema" icon="fal fa-list" />
    <h2 class="title"> {{ msg }}</h2>      
      <form class="register-form">
        <div class="d-inline">
              <div class="input-group mb-3 bar">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="fal fa-search"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  v-on:input="filter = $event.target.value"
                />
                <div
                  class="
                    input-group-append
                    custom-control custom-switch
                    border border-0
                    pl-1
                    pt-1
                  "
                >
                  <input
                    type="checkbox"
                    class="custom-control-input bg-dark"
                    id="customSwitch1"
                    
                  />
                  <label
                    class="custom-control-label"
                    for="customSwitch1"
                  ></label>
                </div>
              </div>
        </div>

        </form>
        <!-- <div class="socorro ajuda"> -->

      <router-link :to="{ name: 'Registro' }">
              <i class="fal fa-plus"></i>
              <h9 class="ml-2">Novo Usuário</h9>
          </router-link>
        <div class="panel ">
            <div class="panel-container show">
                <div class="panel-content">
                    <TabelaUsuariosCadastrados/>
                </div>
            </div>
        </div>
        <!-- <table class="table table-hover">
          <thead>
            <tr class="thead-dark">
              <th scope="col">Usuário</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Perfil</th>
              <th scope="col">Status</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Exemplo</th>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitch3"
                    disabled
                  />
                  <label
                    class="custom-control-label"
                    for="customSwitch3"
                  ></label>
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'Registro' }">
                <i class="fal fa-pencil d-inline"></i>
                </router-link>
                <i class="fal fa-trash-alt d-inline ml-2"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">Outro Exemplo</th>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitch2"
                    disabled
                  />
                  <label
                    class="custom-control-label"
                    for="customSwitch2"
                  ></label>
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'Registro' }">
                <i class="fal fa-pencil d-inline"></i>
                </router-link>
                <i class="fal fa-trash-alt d-inline ml-2"></i>
              </td>
            </tr>
          </tbody>
        </table> -->
    </div>
</template>

<script>
import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from '../components/DataTables/TabelaUsuariosCadastrados.vue'
import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
export default {
  components: {
    PagesSubHeader,
    TabelaUsuariosCadastrados,
  },
  data() {
    return {
      filter: "",
      usuarios: [],
      msg: "",
    };
  },
  methods: {},
  created() {
    this.service = new UsuarioMetodos(this.$resource);
    this.service.list().then(
      (usuarios) => (this.usuarios = usuarios),
      (err) => {
        console.log(err);
        this.msg = err.message;
      }
    );
  },
  computed: {
    UsuarioFiltrado() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), "i");
        return this.usuarios.filter((usuario) => exp.test(usuario.user));
      } else {
        return this.usuarios;
      }
    },
  },
};
</script>

<style>
.socorro {
  display: flex;
  justify-content: end;
}
.ajuda {
  align-items: flex-end;
}
.bar {
  width: 955.5px !important;
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
.panel-content{
    overflow: auto;
}
.panel .panel-container .panel-content {
    padding: 0;
}
.card-body{
    padding: 5px;
}
</style> 