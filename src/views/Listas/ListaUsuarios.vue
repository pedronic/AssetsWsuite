<template>
  <div class="relatorios">
    <!-- Cabeçalho -->
    <PagesSubHeader icon="fal fa-user-friends" titulo="Lista de Usuários do Sistema">

      <div class="card">
        <div class="card-body d-flex">
            <div class="d-flex" id="filtro-grupo-pausa">
                <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'Login')"></b-form-input>
                <div class="card">
                  <div class="card-body"/>
                </div>
                <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search" @click="setFilter(busca,'Login')"/>
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
          <router-link class="d-flex" id="add-grupo-pausa" :to="{path:'/registro-usuarios',params:{nome:''}}" >
            <b-btn variant="success" class="fal fa-plus"/>
          </router-link>
        </div>
      </div>

    </PagesSubHeader>
  <!-- Cabeçalho: FIM -->

    <TabelaUsuariosCadastrados :items="items" :filter="filter" :filter_fields="filter_fields"/>
  </div>
</template>

<script>
import UsuarioMetodos from "../../domain/User/UsuarioMetodos";
import TabelaUsuariosCadastrados from "../../components/DataTables/TabelaUsuariosCadastrados.vue";
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";

export default {
  components: {
    PagesSubHeader,
    TabelaUsuariosCadastrados,
  },
  data() {
    return {
      items: [
        { 
            usuario: 'Exemplo',
            Nome: 'Ex',
            Email: 'ex@dom.com.br',
            Perfil: 'lado',
            status:true
        },
        { 
            usuario: 'Outro Exemplo',
            Nome: 'Ox',
            Email: 'ox@dom.com.br',
            Perfil: 'azimutal',
            status:false
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

.dow-color {
  background-color: #1a7f37 !important;
}
</style> 