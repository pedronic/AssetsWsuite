<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Mailing">

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="filtro-grupo-pausa">
            <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'Nome')"></b-form-input>
            <div class="card">
              <div class="card-body"/>
            </div>
            <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="setFilter(busca,'Nome')"/>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="status-filter">
            <b-form-checkbox v-model="status_filter" id="status-filter-button" switch @change="setFilter(status_filter,'status')"/>
          </div>
        </div>
      </div>

    </PagesSubHeader>
    <!--    <h2 class="title"> {{ msg }}</h2>      -->

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
  /* height: 50px; */
  /* width: 0;
  border: 0px;
  color: #ffffff transparent; */
}
.card > .card-body > .d-flex > button#pesquisa_faturamento{
  margin-right: 0.3rem !important;
}
.card > .card-body > .d-flex > button,input{
  height: 38px !important;
}
.d-flex#filtro-grupo-pausa{
  height: 38px !important;
}

.card {
  box-shadow: none;
  border: none;
}
.dow-color{
  background-color: #1a7f37 !important;
}
</style>