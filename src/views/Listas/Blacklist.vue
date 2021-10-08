<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Blacklist">
      <div class="cart">
        <div class="cart-body"/>
      </div>
      <form class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-8 col-inputs">
              <div class="input-group d-flex">

                <input
                    aria-describedby="basic-addon1"
                    id="filtro"
                    aria-label="Username"
                    class="form-control"
                    :placeholder=searchf
                    type="text"
                    v-on:input="filter = $event.target.value"
                />
              </div>
            </div>

            <div class="col-2 col-botoes">
              <button class="btn btn-info waves-effect waves-themed dow-color2"><i
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
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item" @click="searchf='Arquivos subidos'">
            <a id="one-tab" aria-controls="One" aria-selected="true" class="nav-link active" data-toggle="tab" href="#subir"
               role="tab">Subir Arquivo</a>
          </li>
          <li class="nav-item" @click="searchf='Cadastrados manualmente'">
            <a id="two-tab" aria-controls="Two" aria-selected="false" class="nav-link" data-toggle="tab" href="#cadastrar"
               role="tab">Cadastro Manual</a>
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div id="subir" aria-labelledby="one-tab" class="tab-pane fade show active p-3" role="tabpanel">
          <TabelaBlacklist/>
        </div>
        <div id="cadastrar" aria-labelledby="two-tab" class="tab-pane fade p-3" role="tabpanel">
          <TabelaBlacklist2/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";
import TabelaBlacklist from "../../components/DataTables/TabelaBlacklist";
import TabelaBlacklist2 from "../../components/DataTables/TabelaBlacklist2";

export default {
  components: {
    PagesSubHeader,
    TabelaBlacklist,
    TabelaBlacklist2
  },
  data() {
    return {
      searchf: "Arquivos subidos",
    };
  },
  mounted() {

  },
  name: "BlacklistMailing"
}


</script>

<style scoped>
#filtro{
 width: 216.8px;;
}

.dow-color2 {
  background-color: rgb(13, 109, 157) !important;
}

.image-preview-input input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}

.image-preview-input-title {
  margin-left: 2px;
}

.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.cart-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.cart {
  box-shadow: none;
  border: none;
}

.dow-color{
  background-color: #1a7f37 !important;
}

.image-preview-input input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}

.image-preview-input-title {
  margin-left: 2px;
}

.form-control:disabled, .form-control[readonly] {
  background-color: #ffffff;
  opacity: 1;
}

.cart-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.cart {
  box-shadow: none;
  border: none;
}
.col-botoes{
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.col-inputs{
  padding-left: 3px !important;
  padding-right: 10px !important;
}
</style>