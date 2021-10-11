<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de agentes">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>

    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
          <div class="row mb-2 justify-content-center">
            <div class="col-12">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-user-headset fa-2x" style="margin-left: 5px" />
                <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Agentes"
                />
              </div>
            </div>
          </div>
          <TabelaAgentes/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UsuarioMetodos from "../domain/User/UsuarioMetodos";
import TabelaAgentes from '../../components/DataTables/TabelaAgentes.vue'
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'

export default {
  components: {
    PagesSubHeader,
    TabelaAgentes,
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
    // this.service = new UsuarioMetodos(this.$resource);
    // this.service.list().then(
    //   (usuarios) => (this.usuarios = usuarios),
    //   (err) => {
    //     console.log(err);
    //     this.msg = err.message;
    //   }
    // );
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
  /* border-top-width: 2px;
    border-bottom-width: 2px; */
  height: 42px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}
#profile-name-input2 {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
</style> 