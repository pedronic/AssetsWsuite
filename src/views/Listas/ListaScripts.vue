<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de scripts">
      <div class="card">
        <div class="card-body"/>
      </div>

    </PagesSubHeader>
    <div class="row mb-2 justify-content-center">
      <div class="col-12">
        <div class="profile-content user-name-line d-flex">
          <i class="fal fa-code fa-2x" style="margin-left: 5px" />
          <b-form-input
              id="profile-name-input"
              type="text"
              placeholder="Scripts"
          />
        </div>
      </div>
    </div>
    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <TabelaScripts/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabelaScripts from '../../components/DataTables/TabelaScripts.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    PagesSubHeader,
    TabelaScripts,
  },
  name: "ListaScripts",
  data() {
    return {
      filter: "",
      usuarios: [],
      msg: "",
    };
  },
  methods: {},
  created() {
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
.col-botoes{
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.col-inputs{
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
.dow-color{
    background-color: #1a7f37 !important;
}
.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
.user-name-line2 {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  height: 42px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
#profile-name-input{
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}
#profile-name-input2{
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
</style> 