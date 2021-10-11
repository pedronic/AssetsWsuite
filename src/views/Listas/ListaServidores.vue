<template>
  <div class="relatorios">
    <PagesSubHeader titulo="Lista de servidores" icon="fal fa-list" >
      <div class="card">
        <div class="card-body"/>
      </div>

    </PagesSubHeader>
    <div class="row mb-2 justify-content-center">
      <div class="col-12">
        <div class="profile-content user-name-line d-flex">
          <i class="fal fa-server fa-2x" style="margin-left: 5px" />
          <b-form-input
              id="profile-name-input"
              type="text"
              placeholder="Servidores"
          />
        </div>
      </div>
    </div>
    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaServidores/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaServidores from '../../components/DataTables/TabelaServidores.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'
export default {
  components: {
    PagesSubHeader,
    TabelaServidores,
  },
  name: 'ListaServidores',
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

<style >
.dow-color2 {
  background-color: rgb(13, 109, 157) !important;
}

.col-botoes{
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.col-inputs{
  padding-left: 3px !important;
  padding-right: 10px !important;
}

.panel-content{
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
.dow-color{
  background-color: #1a7f37 !important;
}
</style>