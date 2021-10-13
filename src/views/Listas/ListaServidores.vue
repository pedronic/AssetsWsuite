<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-list" titulo="Lista de Servidores">

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

      <div class="card">
        <div class="card-body d-flex">
          <router-link class="d-flex" id="add-grupo-pausa" :to="{path:'/registro-servidores',params:{nome:''}}" >
            <b-btn variant="success" class="fal fa-plus"/>
          </router-link>
        </div>
      </div>

    </PagesSubHeader>
  <!-- Cabeçalho: FIM -->
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
    <TabelaServidores :items="items" :filter="filter" :filter_fields="filter_fields"/>
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
      items: [
        {
          Nome: 'Exemplo',
          tipo: '',
          ip: '',
          perfil: '',
          status:true
        },
        {
          Nome: 'Outro Exemplo',
          tipo: '',
          ip: '',
          perfil: '',
          status:true
        },
      ],
      usuarios: [],
      msg: "",
      filter:'',
      filter_fields:[''],
      busca:'',
      status_filter: true,
    };
  },
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    }
  },
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