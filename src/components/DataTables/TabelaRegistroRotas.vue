<template>
    <div class="mt-2">
          <b-container fluid>
            <b-col cols="12">
              <!-- THEAD -->
              <b-row class="tab-top-section-row2">
                <b-col class="empty-head-container">
                  <span class="blank-space" />
                </b-col>
                <b-col cols="1" class="dia-head-container">
                  <span class="dia-head">Local</span>
                </b-col>
                <b-col cols="1" class="time-head-container">
                  <span class="time-head">LDN</span>
                </b-col>
                <b-col cols="1" class="time-head-container">
                  <span class="time-head2">VC1</span>
                </b-col>
                <b-col cols="1" class="time-head-container">
                  <span class="time-head2">VC2</span>
                </b-col>
                <b-col cols="1" class="time-head-container">
                  <span class="time-head2">VC3</span>
                </b-col>
                <b-col cols="1" class="time-head-container">
                  <span class="time-head2">LDI</span>
                </b-col>
              </b-row>
              <!-- THEAD: FIM -->

              <!-- TBODY -->
              <div v-for="i of rows" :key="i">
                <b-row :class="d.index % 2 == 0 ? 'grey-bg' : ''">
                  <!-- índice -->
                  <b-col cols="1" class="dia-body-container">
                    <span class="dia-body">{{ i }}</span>
                  </b-col>
                  <!-- índice: FIM -->
                  <!-- Local -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- Local FIM -->
                  <!-- col LDN -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                 
                  <!-- col LDN FIM -->
                  <!-- col VC1 -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- col VC1 FIM -->
                   
                   <!-- col VC2 -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- col VC2 FIM -->
                   <!-- col VC3 -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- col VC3 FIM -->
                  <!-- col LDI -->
                  <b-col cols="5" class="time-body-container">
                    <div id="multiselect-input">
                      <multiselect
                        v-model="d.operadora_selecionada"
                        :options="operadoras_local"
                        :multiple="false"
                      />
                    </div>
                  </b-col>
                  <!-- col LDI FIM -->
                </b-row>
              </div>
            </b-col>
          </b-container>
          <!-- TBODY FIM -->
        </div>
</template>
<script>
export default {
    props: {
    operadoras:Array,
//     string: {
//       required: true,
//       brand: String,
//     },
//     confirm: Boolean,
//     model: String,
  }, 
  data() {
      return{
          rows: 5,
          operadoras_local: this.operadoras,
          operadoras_LDN: this.operadoras,
          operadoras_VC1: this.operadoras,
          operadoras_VC2: this.operadoras,
          operadoras_VC3: this.operadoras,
          operadoras_LDI: this.operadoras,
      }
  }
}
</script>
<style scoped>
.tab-pane.active {
  border-width: 2px !important;
  border-color: black !important;
}
div.tabs > div > ul.nav.nav-tabs.nav-justified > li.nav-item > a.nav-link {
  background-color: whitesmoke !important;
  text-decoration: none !important;
}

div#timepicker-append > div > button {
  border: none;
}

.grey-bg {
  border-bottom-width: 2px;
  background-color: rgba(13, 109, 165, 0.08);
}

div.container-fluid > div.col-6 > div.container-fluid,
div.container-fluid > div.col-6 > div.row,
div.tab-pane.active > div.container-fluid > div.col-6 {
  padding-left: 0;
  padding-right: 0;
}

.dia-head-container,
.produtiva-head-container,
.obrigatoria-head-container,
.alerta-head-container,
.limite-head-container,
.icone-head-container,
.ativa-head-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding: 5px;
  padding-left: 0px;
}

.dia-head-container {
  padding-right: 5px;
  margin-left: -15px;
}

.time-body-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  /*   */
  margin-left: -8px;
  margin-right: -4px;
}
.time-body-container2 {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 5px;
  margin-right: -5px;
}

.time-head-container {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
  margin-left: 20px;
}
.time-head-container2 {
  display: flex;
  align-items: center;
  /* ajuste de margens da tabela */
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
  margin-right: -7px;
}

.dia-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.dia-body-container[data-v-a13cb5f8] {
  display: flex;
  align-items: left;
  padding: 0px;
  padding-left: 4ch;
  /* padding-right: 0px; */
}

.blank-space {
  background-color: white !important;
  width: 100%;
}

/* .dia-body {
    margin-left: 2ch;
} */

.empty-head-container.col {
  min-width: 20px;
}
.empty-head-container2.col {
  max-width: 7px;
}
.empty-body-container.col {
  min-width: 5px;
  background-color: white;
  margin-left: -14px;
  margin-right: -10px;
}

.time-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  margin-left: -35px;
  margin-right: -6px;
}

.time-head2 {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0ch;
  text-align: center;
  vertical-align: middle !important;
  margin-left: -9px;
  margin-right: -6px;
}

.salvar-container {
  margin-top: 5px;
  bottom: 0;
}
.filas-top-section-row {
  margin-bottom: 1ch;
}
.filas-top-section-row2 {
  margin-bottom: 3ch;
}
.tab-top-section-row {
  margin-top: 2.5ch;
  margin-bottom: 1ch;
}

.tab-top-section-row2 {
  margin-top: 2.5ch;
  /* margin-bottom: 1ch; */
  margin-left: 0px;
  margin-right: -9px;
}

.head-items {
  align-content: center;
  align-items: center;
}
/* .profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
} */
.botao-salvar {
  background-color: #0d6d9dad;
}
.botao-salvar:hover {
  background-color: #0d6d9d;
}
.card-body.spacer {
  padding: 5px;
  height: 50px;
  width: 0;
  border: none;
  border-color: #ffffff transparent;
  color: #ffffff transparent;
}
.card.spacer {
  box-shadow: none;
  border: none;
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
  width: 100%;
  margin-left: 13px;
  margin-right: -13px;
  border-left-color: black;
  border-radius: 0px;
}

#profile-name-input3 {
  width: 100%;
  margin-left: 33px;
  margin-right: -33px;
  border-left-color: black;
  border-radius: 0px;
}

#multiselect-input {
  display: flex;
  width: 100%;
  /* margin-left: 6px; */
}
.input-group-sm > .form-control {
  font-size: 13px !important;
}
/* #profile-name-input>.multiselect>.multiselect__tags{
    border-radius: 0px !important;
    border-left-width: 1px !important;
    border-left-color: black;
    width: 100%;
} */

i.fal.fa-2x {
  width: 26px;
  height: 26px;
}

.tab-content {
  border-left: 1px solid green;
  border-right: 1px solid green;
  padding: 10px;
}

.nav-tabs {
  margin-bottom: 0;
}
</style>