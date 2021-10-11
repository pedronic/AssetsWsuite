<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Blacklist">
      <div class="cart">
        <div class="cart-body"/>
      </div>

    </PagesSubHeader>
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a id="one-tab" aria-controls="One" aria-selected="true" class="nav-link active" data-toggle="tab" href="#subir"
               role="tab">Subir Arquivo</a>
          </li>
          <li class="nav-item">
            <a id="two-tab" aria-controls="Two" aria-selected="false" class="nav-link" data-toggle="tab" href="#cadastrar"
               role="tab">Cadastro Manual</a>
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div id="subir" aria-labelledby="one-tab" class="tab-pane fade show active p-3" role="tabpanel">
          <div class="row mb-2 justify-content-center">
            <div class="col-12">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-align-slash fa-2x" style="margin-left: 5px" />
                <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Arquivos subidos"
                />
              </div>
            </div>
          </div>

          <TabelaBlacklist/>
        </div>
        <div id="cadastrar" aria-labelledby="two-tab" class="tab-pane fade p-3" role="tabpanel">
          <div class="row mb-2 justify-content-center">
            <div class="col-12">
              <div class="profile-content user-name-line d-flex">
                <i class="fal fa-align-slash fa-2x" style="margin-left: 5px" />
                <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Cadastrados manualmente"
                />
              </div>
            </div>
          </div>
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