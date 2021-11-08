<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-align-slash" titulo="Cadastro blacklist">
      <div class="cart">
        <div class="cart-body" />
      </div>
    </PagesSubHeader>
    <div class="card tab-card">
      <div class="card-header tab-card-header">
        <ul id="myTab" class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a
              id="one-tab"
              aria-controls="One"
              aria-selected="true"
              class="nav-link active"
              data-toggle="tab"
              href="#subir"
              role="tab"
              >Subir</a
            >
          </li>
          <li class="nav-item">
            <a
              id="two-tab"
              aria-controls="Two"
              aria-selected="false"
              class="nav-link"
              data-toggle="tab"
              href="#cadastrar"
              role="tab"
              >Cadastrar</a
            >
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div class="justify-content-left">
          <div class="col-12 mt-2">
            <div class="profile-content user-name-line d-flex">
              <i class="fal fa-road fa-2x" style="margin-left: 5px" />
              <div id="multiselect-input">
                <multiselect
                  v-model="filas_finish"
                  :placeholder="'Filas'"
                  :label="'name'"
                  :track-by="'code'"
                  :options="finish_filas"
                  :multiple="true"
                  v-if="dataOK"
                  @select="setSelectedQueue"
                  @remove="removeDeselectedQueue"
                />
              </div>
            </div>
          </div>
        </div>
      <!-- TAB 1 -->
        <div
          id="subir"
          aria-labelledby="one-tab"
          class="tab-pane fade show active p-3"
          role="tabpanel"
        >
          <div class="row justify-content-left">
            <div class="col-4">
              <div class="profile-content user-name-line d-flex">
                <div class="input-group image-preview">
                    <span class="input-group">
                      <!-- image-preview-clear button -->
                      <button
                          type="button"
                          class="btn btn-default image-preview-clear"
                          style="display: none"
                      >
                        <span class="glyphicon glyphicon-remove">Limpar</span> 
                      </button>
                      <!-- image-preview-input -->
                      <div class="btn btn-default image-preview-input" id="butao">
                          <i id="pic" class="fal fa-at fa-2x"></i
                          >
                        <span class="image-preview-input-title "> </span>
                        <input
                            type="file"
                            accept="txt, csv"
                            name="input-file-preview"
                        />
                        <!-- rename it -->
                      </div>
                      <input
                          type="text"
                          placeholder="Arquivo"
                          class="form-control image-preview-filename"
                          id="input-pic"
                          disabled="disabled"
                      />
                      <!-- don't give a name === doesn't send on POST/GET -->
                    </span>
                </div>
              </div>
            </div>
          </div>
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                <i class="fal fa-upload mr-2"></i>Importar
              </button>
            </b-col>
            <b-col class="p-3" cols="auto"> </b-col>
          </b-row>
        </div>
      <!-- TAB 1: FIM -->

      <!-- TAB 2 -->
        <div
          id="cadastrar"
          aria-labelledby="two-tab"
          class="tab-pane fade p-3"
          role="tabpanel"
        >
          <div class="card mb-g border shadow-0" id="interativo">
            <div class="card-header">
              <div class="row no-gutters align-items-center">
                <div class="col">
                  <span class="h6 font-weight-bold text-uppercase">Número</span>
                </div>
                <div class="col d-flex">
                  <a
                    href="#"
                    class="
                      btn btn-outline-success btn-sm
                      ml-auto
                      mr-2
                      flex-shrink-0
                    "
                    @click="addPhoneLine"
                    ><i class="fal fa-plus"></i
                  ></a>
                  <a
                    href="#"
                    class="btn btn-outline-danger btn-sm flex-shrink-0"
                    @click="removePhoneLine"
                    ><i class="fal fa-minus"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="mt-2">
                    <div v-for="i of putins" :key="i">
                      <div class="pl-3">
                        <div
                          class="
                            row
                            mb-2
                            no-gutters
                            row-grid
                            align-items-stretch
                          "
                        >
                          <div class="col-1 mr-2">
                            <div class="profile-content user-name-line d-flex">
                              <i
                                class="fal fa-ad fa-2x"
                                style="margin-left: 5px"
                              />
                              <b-form-input
                                id="profile-name-input"
                                type="number"
                                min="11"
                                max="99"
                                placeholder="DDD"
                                :disabled='phones[i].disabled'
                                :style="phones[i].disabled?disabled_enforcement:enabled_enforcement"
                                v-model="phones[i].ddd"
                              />
                            </div>
                          </div>
                          <div class="col-3">
                            <div class="d-inline">
                              <div
                                class="profile-content user-name-line d-flex"
                              >
                                <i
                                  class="fal fa-at fa-2x"
                                  style="margin-left: 5px"
                                />
                                <b-form-input
                                  id="profile-name-input"
                                  type="number"
                                  min="11111111"
                                  max="999999999"
                                  :no-wheel='true'
                                  placeholder="Número"
                                  :disabled='phones[i].disabled'
                                  :style="phones[i].disabled?disabled_enforcement:enabled_enforcement"
                                  v-model="phones[i].number"
                                  @keydown.up.prevent
                                  @keydown.down.prevent
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
            
          </div>
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <b-button class="btn btn-dark botao-salvar" @click="importManual(total_phones,total_queues)">
                <i class="fal fa-upload mr-2"></i>Importar
              </b-button>
            </b-col>
            <b-col class="p-3" cols="auto"> </b-col>
          </b-row>
        </div>
      <!-- TAB 2: FIM -->
      </div>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";
import Multiselect from "vue-multiselect";
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl} from '../../config/global';
// import Vuex from 'vuex'

const perpage = 10;

export default {
  name: "RegistroBlacklist",
  mixins: [ValidateToaster],
  components: {
    PagesSubHeader,
    Multiselect,
  },
  props: {
    bID:{
      type: Number,
      default:-1
    }
  },
  methods: {
    importManual(phone,queue){
      if(phone>0){
        this.currentPhone = phone;
        this.currentQueue = queue;
        let blankDDD = !(this.phones[phone].ddd.length > 0) ? true:false;
        let shortDDD = !(this.phones[phone].ddd.length == 2) ? true:false;
        let blankNumber = !(this.phones[phone].number.length > 0) ? true:false;
        let shortNumber = (this.phones[phone].number[0] == 9) ? false: (this.phones[phone].number.length < 8) ? true: (this.phones[phone].number.length > 8) ? true:false;
        let shortCellPhone = !(this.phones[phone].number[0] == 9) ? false: (this.phones[phone].number.length < 9) ? true: (this.phones[phone].number.length > 9) ? true:false ;
        if(blankNumber || blankDDD){
          console.log("blankNumber = ",blankNumber,"blankDDD = ",blankDDD);
          let toast = {
              isValidated:false,
              title: "NÃO FOI POSSÍVEL IMPORTAR OS NÚMEROS",
              message: "Um ou mais números de telefone não puderam ser importados. Não é permitido adicionar à lista de Blacklists um número vazio ou apenas com espaços em branco tanto no DDD quanto no Número.",
          };
          this.validateAndToast(toast);
          return;
        }
        else if(shortDDD || shortNumber || shortCellPhone){
          console.log("shortNumber = ",shortNumber,"shortDDD = ",shortDDD,"shortCellPhone = ",shortCellPhone);
          let toast = {
              isValidated:false,
              title: "NÃO FOI POSSÍVEL IMPORTAR OS NÚMEROS",
              message: "Um ou mais números de telefone não puderam ser importados. Não é permitido adicionar à lista de Blacklists um número de DDD com menos ou mais de 2 dígitos, nem um Número com menos ou mais de 8 dígitos ou um celular com menos ou mais de 9 dígitos.",
          };
          this.validateAndToast(toast);
          return;
        }
        else{
          let body = {};
          body.user_id = this.getUser();
          body.queue_id = this.filas_finish[queue].code;
          console.log("Filas:\n",this.filas_finish,"Queue:\t",queue);
          body.ddd = this.cleanNumber(this.phones[phone].ddd);
          // body.name = this.cleanNumber(this.phones[phone].ddd);
          body.number = this.cleanNumber(this.phones[phone].number);
          // body.phone = this.cleanNumber(this.phones[phone].number);
          this.postManual(body);
        }
      }
      else{
        let toast = {
              isValidated:false,
              title: "NÃO HÁ NÚMEROS PARA SEREM IMPORTADOS",
              message: "Para realizar a importação manual é necessário que haja números preenchidos.",
          };
          this.validateAndToast(toast);
          return;        
      }
    },
    postManual(body){
      axios.post(baseApiUrl+'/blacklistFones',body)
      .then(res => {
        console.log("Status:\t",res.status," - ",res.statusText)
        if(this.currentQueue > 0){
          let toast = {
            isValidated:true,
            title:'NÚMERO ADICIONADO MANUALMENTE COM SUCESSO',
            message:'Número ('+body.ddd+') '+body.number +' Cadastrado Manualmente adicionado com sucesso à Fila: '+body.queue_id+' !',
          }
          this.validateAndToast(toast);
          this.currentQueue--;
          this.importManual(this.currentPhone, this.currentQueue);
        }
        else if(this.currentPhone > 1){
          let toast = {
            isValidated:true,
            title:'NÚMERO ADICIONADO MANUALMENTE COM SUCESSO',
            message:'Número ('+body.ddd+') '+body.number +' Cadastrado Manualmente adicionado com sucesso à Fila: '+body.queue_id+' !',
          }
          this.validateAndToast(toast);
          this.phones[this.currentPhone].disabled = true;
          // console.log("Desabilitado por último:\n",this.phones[this.currentPhone])
          this.currentQueue = this.total_queues;
          this.currentPhone--;
          this.importManual(this.currentPhone, this.currentQueue);
        }
        else if(this.currentPhone == 1){
          let toast = {
            isValidated:true,
            title:'NÚMERO ADICIONADO MANUALMENTE COM SUCESSO',
            message:'Número ('+body.ddd+') '+body.number +' Cadastrado Manualmente adicionado com sucesso à Fila: '+body.queue_id+' !',
          }
          this.validateAndToast(toast);
          this.phones[this.currentPhone].disabled = true;
          // console.log("Desabilitado por último:\n",this.phones[this.currentPhone])
          this.currentQueue = this.total_queues;
          // this.currentPhone--;
          // this.importManual(this.currentPhone, this.currentQueue);
        }
        else{
          let toast = {
            isValidated:true,
            title:'NÚMEROS ADICIONADOS MANUALMENTE COM SUCESSO',
            message:'Números Cadastrados Manualmente adicionados com sucesso!',
          }
          this.validateAndToast(toast);
        }
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
        let eBody = JSON.parse(error.response.config.data);
        console.log("eBody:\n",eBody)
        let toast = {
          isValidated:false,
          title:'NÚMERO NÃO IMPORTADO',
          message:'Número ('+eBody.name+') '+eBody.phone +' Cadastrado Manualmente não pôde ser importado. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
      })
    },
    cleanNumber(value){
      let cleanValue = value.replace(/-|\+|\./g,'');
      return cleanValue;
    },
    addPhoneLine(){
      let phone = {ddd:'new', number:null, disabled:false};
      this.phones.push({...phone});
      this.putins++;
      this.total_phones++;
    },
    removePhoneLine(){
      //  this.putins;
      if(this.putins > 0){
        this.phones.pop();
        this.putins--;
        this.total_phones--;
      }
    },
    setSelectedQueue(){
      // console.log("Selected Queue:\n" + value.code)
      this.total_queues++;
    },
    removeDeselectedQueue(){
      this.total_queues--;
    },
    getFilasData(){
      axios.get(baseApiUrl+'/queues')
      .then(res => {
        console.log("Status:\t",res.status," - ",res.statusText)
        this.total_items = res.data.count;
        this.total_pages = Math.ceil(res.data.count / res.data.limit);
        this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
        console.log("Total Items:\t",this.total_items,"\nTotal Pages:\t",this.total_pages,"\nPer Pages:\t",this.perPage)
        this.getFilas(this.currentPage);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
        let toast = {
          isValidated:false,
          title:'FILAS NÃO RETORNARAM',
          message:'Não foi possível completar a lista de filas a partir do endpoint. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
      })
    },
    getFilas(page){
      let pag = page.toString();
      let t_items = this.total_items>0?true:false;
      let t_pages = this.total_pages>0?true:false;
      console.log("Total Items:\t",t_items,"\tTotal Pages:\t",t_pages)
      
      axios.get(baseApiUrl+'/queues'+'?page='+pag)
      .then(res => {
        console.log("Status @getFilas():\t",res.status," - ",res.statusText)
        let q = res.data.data;
        let finish_filas = [];
        for(let i in q){
          let fila = {}
          fila.name = (q[i].name + ' - ' + q[i].name_queue);
          fila.code = q[i].queue_id;
          finish_filas.push(fila);
        }
        if(page===1){
          this.finish_filas = [...finish_filas];
          this.currentPage++;
          this.getFilas(this.currentPage);
        }
        else if (page<this.total_pages){
          for(let j in finish_filas){
            this.finish_filas.push({...finish_filas[j]})
          }
          this.currentPage++;
          this.getFilas(this.currentPage);
        }
        else if (page==this.total_pages){
          for(let j in finish_filas){
            this.finish_filas.push({...finish_filas[j]})
            this.dataOK = true;
          }
        }
      })
    },
    getUser(){
      let ud = this.$store.state.user.id;
      console.log("user:\n",ud);
      return ud;
    }
  },
  created() {
    this.getFilasData();
    this.getUser();
  },
  mounted() {
    $(document).on("click", "#close-preview", function () {
      $(".image-preview").popover("hide");
    });

    $(function () {
      // Clear event
      $(".image-preview-clear").click(function () {
        $(".image-preview").attr("data-content", "").popover("hide");
        $(".image-preview-filename").val("");
        $(".image-preview-clear").hide();
        $(".image-preview-input input:file").val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function () {
        var img = $("<img/>", {
          id: "dynamic",
          width: 50,
          height: 100,
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
          $(".image-preview-input-title").text(".   Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr("src", e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
  },
  watch:{

  },
  data() {
    return {
      user:null,
      disabled_enforcement:'background-color: #f3f3f3 !important; color: #495057 !important;',
      enabled_enforcement:'',
      total_items:0,
      total_pages:0,
      currentPage:1,
      perPage:perpage,
      dataOK:false,
      putins: 0,
      total_phones: 0,
      total_queues: -1,
      currentQueue: 0,
      currentPhone: 0,
      phones:[
        // {ddd:{type: String, default:'00'}, number:{type: String, default:'00000000'}},
        {ddd:null, number:null, disabled:false}
      ],
      filas_finish: [],
      finish_filas: null,
      // [
      //   { name: "Fila 1000", code: "1000" },
      //   { name: "Fila 2000", code: "2000" },
      // ],
    };
  }
};
</script>

<style scoped>
.btn#butao {
  padding: 2px 4px 0px 2px !important;
}
#input-pic {
  border-left: 1px solid rgb(0, 0, 0) !important;
}

.btn-default {
  background-image: linear-gradient(to top, #ffffff, #ffffff);
}
.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.image-preview-input input[type="file"] {
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
.form-control:disabled,
.form-control[readonly] {
  background-color: #ffffff;
  opacity: 1;
}

label#kkk {
  padding-top: 2.7px;
}

.form-icon,
.form-icon:hover {
  width: 42px;
}

.centralize {
  margin-left: 450px;
}

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
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
#multiselect-input {
  display: flex;
  width: 100%;
  margin-left: 6px;
}

i.fal.fa-2x {
  width: 26px;
  height: 26px;
}

.bottom {
  margin-top: 20px;
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
</style>