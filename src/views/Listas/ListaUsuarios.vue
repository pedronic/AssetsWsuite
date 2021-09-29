<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de usuários do sistema">
      <div class="card">
        <div class="card-body"/>
      </div>
      <form class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-7 col-inputs">
              <div class="input-group d-flex">

                <input
                    aria-describedby="basic-addon1"
                    aria-label="Username"
                    class="form-control"
                    placeholder=""
                    type="text"
                    v-on:input="filter = $event.target.value"
                />
              </div>
            </div>

            <div class="col-2 col-botoes">
              <button class="btn btn-info waves-effect waves-themed dow-color2"><i
                  class="fal fa-search"></i></button>
            </div>
            <div class="col-1 col-inputs mr-4">
              <div
                  class="

                                      custom-control custom-switch
                                      border border-0
                                      mt-1
                                    "
              >
                <input
                    id="customSwitch1"
                    class="custom-control-input bg-dark"
                    type="checkbox"

                />
                <label
                    class="custom-control-label"
                    for="customSwitch1"
                ></label>
              </div>

            </div>
            <div class="col-1 col-botoes">
              <router-link :to="{ name: 'RegistroUsuarios' }">
                <button class="btn btn-success waves-effect waves-themed dow-color" name="pesquisa-faturamento"
                        type="submit"><i class="fal fa-plus"></i></button>
              </router-link>
            </div>

          </div>
        </div>
      </form>
    </PagesSubHeader>

    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaUsuariosCadastrados/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from '../../components/DataTables/TabelaUsuariosCadastrados.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

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
.dow-color2 {
background-color: rgb(13, 109, 157) !important;
}

.col-botoes {
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.col-inputs {
  padding-left: 3px !important;
  padding-right: 10px !important;
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

.dow-color {
  background-color: #1a7f37 !important;
}
</style> 