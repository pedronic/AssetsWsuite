<template>
  <div class="relatorios">
    <PagesSubHeader titulo="Lista de mailing" icon="fal fa-list" >
      <div class="card">
        <div class="card-body"/>
      </div>
      <form class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-8 col-inputs">
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
              <button class="btn btn-info waves-effect waves-themed dow-color2"  type="submit"><i
                  class="fal fa-search"></i></button>

            </div>
            <div class="col-2 col-inputs">
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
            

          </div>
        </div>
      </form>
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