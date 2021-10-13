<template>
  <div class="relatorios">
    <PagesSubHeader titulo="Lista de mailing" icon="fal fa-list" >
      <div class="card">
        <div class="card-body"/>
      </div>

    </PagesSubHeader>
    <!--    <h2 class="title"> {{ msg }}</h2>      -->
    <div class="row mb-2 justify-content-center">
      <div class="col-12">
        <div class="profile-content user-name-line d-flex">
          <i class="fal fa-list-ol fa-2x" style="margin-left: 5px" />
          <b-form-input
              id="profile-name-input"
              type="text"
              placeholder="Mailing"
          />
        </div>
      </div>
    </div>
    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaMailing/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaMailing from '../../components/DataTables/TabelaMailing.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'
export default {
  components: {
    PagesSubHeader,
    TabelaMailing,
  },
  name: 'ListaMailing',
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

<style scoped>
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