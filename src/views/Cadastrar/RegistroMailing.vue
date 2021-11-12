<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list-ol" titulo="Mailing">
      <div class="card">
        <div class="card-body"/>
      </div>
    </PagesSubHeader>
  <!-- <div> -->
      <b-container fluid >
        <div fluid class="container col-12" v-if="dataOK">
          <div class="form-group">
            <!-- LINHA 1 -->
            <div class="d-inline">
              <div class="row mb-2 justify-content-center ">
                <!-- Nome -->
                <div class="col-4">
                  <div class="d-inline">
                    <div class="profile-content user-name-line d-flex">
                      <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                      <b-form-input
                        id="profile-name-input"
                        type="text"
                        placeholder="Nome"
                        v-model="mailing_name"
                      />
                    </div>
                  </div>
                </div>
                <!-- Nome - FIM -->

                <!-- Data de Agendamento | v-model="scheduling_date"-->
                <b-col cols="4">
                  <div class="d-inline">
                    <div class="profile-content user-name-line d-flex">
                      <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                      <!-- <b-form-input
                        id="profile-name-input"
                        type="text"
                        placeholder="Data do mailing"
                      /> -->
                      <b-input-group class="input-group">
                        <b-form-input disabled id="profile-name-input" v-model="scheduling_date"  max='5'  placeholder="__/__/____"/>
                        <b-input-group-append id="timepicker-append">
                            <b-form-datepicker button-only right style="border-width: 0px !important;" size="sm" id="_scheduling_picker" v-model="mailing_date" :min="today" :reset-button="true"/>
                             <!-- @shown="mailing_date = d.mailing_date" @hidden="d.mailing_date = mailing_date"/> -->
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                </b-col>
                <!-- Data de Agendamento - FIM -->

                <!-- Filas -->
                <div class="col-4">
                  <div class="d-inline">
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
                          @select="total_queues++"
                          @remove="total_queues--"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Filas - FIM -->
              </div>
            </div>
            <!-- LINHA 1 - FIM -->
            
            <!-- LINHA 2: File Upload -->
            <!-- <b-form id="file-upload"> -->
              <div class="d-inline">
                <div class="row mb-2 justify-content-left">
                  <div class="col-4">
                    <div class="profile-content user-name-line d-flex" style="height:38px;">
                      <!-- <div class="input-group image-preview"> -->
                        <!-- <span class="input-group">
                          <button
                              type="button"
                              class="btn btn-default image-preview-clear"
                              style="display: none"
                          >
                            <span class="glyphicon glyphicon-remove"></span> Limpar
                          </button>
                          <div class="btn btn-default image-preview-input" id="butao">
                              <i id="pic" class="fal fa-at fa-2x"></i
                              >
                            <span class="image-preview-input-title "> </span> -->
                            <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                            <b-form-file
                                id="profile-name-input2"
                                accept=".csv"
                                name="input-file-preview"
                                placeholder="Arquivo"
                                form="file-upload"
                                @input="checkInputFile"
                                v-model="files"
                            />
                            <!-- rename it -->
                          <!-- </div> -->
                          <!-- <input
                              type="text"
                              placeholder="Arquivo"
                              class="form-control image-preview-filename"
                              id="input-pic"
                              disabled="disabled"
                          /> -->
                          <!-- don't give a name === doesn't send on POST/GET -->
                        <!-- </span> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            <!-- </b-form> -->
            <!-- LINHA 2: File Upload - FIM-->
          </div>
        </div>
      </b-container>

      <b-container fluid class="salvar-container">
        <b-col cols='12'>
          <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <b-button class="btn btn-dark botao-salvar" @click="importMailing(total_queues)" ><i class="fal fa-upload mr-2"></i>Importar</b-button>
            </b-col>

            <b-col class="mr-auto p-3" cols="auto">
              <b-button class="btn " variant="success" @click="downloadTemplate" ><i class="fal fa-download mr-2"></i>Baixar Template</b-button>
            </b-col>

            <b-col class="p-3" cols="auto">
              <b-form-checkbox switch :checked="true" id="status-button"><span>Status</span></b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-container>
          
    <!-- </div> -->
  </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue'
import Multiselect from "vue-multiselect";
import ValidateToaster from '../../plugins/validateToaster.js';
import axios from 'axios';
import {baseApiUrl, mailingApiUrl, mailingTestToken} from '../../config/global';
import csv from 'csv';


const perpage = 10;

export default {
  components: {
    PagesSubHeader,
    Multiselect,
  },
  name: 'RegistroMailing',
  mixins: [ValidateToaster],
  methods: {
    downloadTemplate(){
      let filename = 'mailing_template.csv';
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(this.layout_template));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
    checkInputFile(file){
      if(this.files){
        console.log("Input File:\n",file.name,file);
        console.log("Files:\n",this.files)

        const reader = new FileReader();
        reader.onloadend = (res) => {
          let result = res.target.result;
          let rows = res.target.result.split("\n");
          this.total_rows = rows.length;
          this.empty_rows = 0;
          for(let i = 0; i < rows.length; i++){
            let line = rows[i].replace(/,|;/g,"");
            if(!line.length) this.empty_rows++;
            else continue;
          }
          // console.log("Total Rows:\t",this.total_rows,"\tEmpty Rows:\t",this.empty_rows);
          // console.log('@reader.onload(). Res:\n',res, "Result:\n",result,"\nRows:\n",rows);
          const parser = csv.parse(result,{
                          delimiter: [',',';'],
                          trim:true,
                          from_line:1,
                          to_line:2
          });
          this.read = [...parser.read(res.total)];
          // console.log("this.read @checkInputFile():\n",this.read,"\nthis.layout @checkInputFile():\n",this.layout);
          if(JSON.stringify(this.read)===JSON.stringify(this.layout)) this.mailing_ok = true;
          else this.mailing_ok = false;
          // console.log("Mailing OK?\t",this.mailing_ok);
        };
        reader.onerror = (err) => {
          console.log("Erro:\n",err)
        };
        reader.readAsText(file);
        console.log("res after::@checkInputFile():\n",this.read)
      }
      else{
        this.mailing_ok = false;
        console.log("No File:\n",this.files)
      }
    },
    importMailing(queue){
      let name = this.mailing_name.trim();
      let blankName = !(name.length > 0)?true:false;
      let data = this.mailing_date.split("-");
      let blankDate = !(data.length > 1)?true:false;
      let noQ = !(this.filas_finish.length > 0)?true:false;
      let noMailing = !(this.files)?true:false;
      let errorMailing = !this.mailing_ok;

      // console.log("Form Data @importMailing():\n",formData);
      // console.log("Name:\t",name,"\tblankName:\t",blankName,"\tData:\t",data,"\tblankDate:\t",blankDate,"\tfilas_finish:\t",this.filas_finish,"\tfilas_finish.length:\t",this.filas_finish.length,"\tnoQ:\t",noQ,"\terrorMailing:\t",errorMailing,"\tnoMailing:\t",noMailing);
      // console.log("\n\tthis.filas_finish[queue]:\n",this.filas_finish[queue])
      
      if(noMailing){
        let toast = {
            isValidated:false,
            title: "NÃO HÁ ARQUIVO PARA SER IMPORTADO",
            message: "Para importar uma Lista de Mailing é necessário primeiro carregar um arquivo no campo 'Arquivo'. SUGESTÃO: Baixe o Template Padrão e preencha o arquivo com os dados da sua lista.",
        };
        this.validateAndToast(toast);
        return;
      }
      else if(errorMailing){
        let toast = {
            isValidated:false,
            title: "NÃO FOI POSSÍVEL IMPORTAR O MAILING",
            message: "O arquivo de mailing não está de acordo com o template padrão. Não é permitido adicionar uma Lista de Mailing com cabeçalhos não idênticos ao padrão do sistema. Favor clicar no botão 'BAIXAR TEMPLATE' e preencher o arquivo baixado para subir.",
            
        };
        this.validateAndToast(toast);
        return;
      }
      else if(blankName && blankDate && noQ){
        let toast = {
            isValidated:false,
            title: "NÃO FOI POSSÍVEL IMPORTAR O MAILING",
            message: "O arquivo de mailing não pôde ser importado. Não é permitido adicionar uma Lista de Mailing sem preencher todos os campos do formulário abaixo.",
        };
        this.validateAndToast(toast);
        return;
      }
      else if(blankName){
        let toast = {
            isValidated:false,
            title: "NÃO FOI POSSÍVEL IMPORTAR O MAILING",
            message: "O arquivo de mailing não pôde ser importado. Não é permitido adicionar uma Lista de Mailing sem dar um Nome para ela ou deixando apenas espaços em branco no campo Nome.",
        };
        this.validateAndToast(toast);
      }
      else if(blankDate){
        let toast = {
            isValidated:false,
            title: "NÃO FOI POSSÍVEL IMPORTAR O MAILING",
            message: "O arquivo de mailing não pôde ser importado. Não é permitido adicionar uma Lista de Mailing sem selecionar/agendar uma Data para ser consumido pela(s) fila(s) selecionada(s).",
        };
        this.validateAndToast(toast);
        return;
      }
      else if(noQ){
        let toast = {
            isValidated:false,
            title: "NÃO FOI POSSÍVEL IMPORTAR O MAILING",
            message: "O arquivo de mailing não pôde ser importado. Não é permitido adicionar uma Lista de Mailing sem selecionar uma ou mais filas para ser os dados serem consumidos.",
        };
        this.validateAndToast(toast);
        return;
      }
      else{
        this.currentQueue = queue;
        let body = {};
        body.name = name;
        body.mailing_date = this.mailing_date;
        body.user_id = this.getUser();
        body.queue_id = this.filas_finish[queue].code;
        body.filename = this.files.name;
        this.currentQName = this.filas_finish[queue].name;
        this.postMailing(body);
      }
    },
    postMailing(body){
      let formData = new FormData();
      formData.append('file',this.files);
      formData.append('body',body);
      if(this.currentQueue>0){
        // console.log("Body @postMailing():\n",body,"\nForm Data @postMailing():\n",formData);
        axios.post(mailingApiUrl,formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${mailingTestToken}`
          }
        })
        .then(res => {
          console.log("Status:\t",res.status," - ",res.statusText);
          let toast = {
              isValidated:true,
              title: "MAILING IMPORTADO COM SUCESSO",
              message: "O arquivo de mailing foi importado com sucesso para a fila "+this.currentQName+"!",
          };
          this.validateAndToast(toast);
          this.currentQueue--;
          this.importMailing(this.currentQueue)
        })
        .catch(error => {
          console.log("\n\tERROR RESPONSE:\n",error.response)
          let toast = {
              isValidated:false,
              title:'MAILING NÃO IMPORTADO',
              message:'O Arquivo de Mailing não pôde ser adicionado à fila '+this.currentQName+'Motivo: '+error.message,
            }
          this.validateAndToast(toast);
          return;
        });
      }
      else{
        // console.log("Body @postMailing():\n",body,"\nForm Data @postMailing():\n",formData);
        axios.post(mailingApiUrl,formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${mailingTestToken}`
          }
        })
        .then(res => {
          console.log("Status:\t",res.status," - ",res.statusText);
          let toast = {
              isValidated:true,
              title: "MAILING IMPORTADO COM SUCESSO",
              message: "O arquivo de mailing foi importado com sucesso para a fila "+this.currentQName+"!",
          };
          this.validateAndToast(toast);
          // this.currentQueue--;
          // this.importMailing(this.currentQueue)
          let toast2 = {
              isValidated:true,
              title: "MAILING IMPORTADO COM SUCESSO",
              message: "O arquivo de mailing foi importado com sucesso para o sistema!",
          };
          this.validateAndToast(toast2);
        })
        .catch(error => {
          console.log("\n\tERROR RESPONSE:\n",error.response)
          let toast = {
              isValidated:false,
              title:'MAILING NÃO IMPORTADO',
              message:'O Arquivo de Mailing não pôde ser adicionado à fila '+this.currentQName+'Motivo: '+error.message,
            }
          this.validateAndToast(toast);
          return;
        });
      }
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
            this.layout = Object.keys(JSON.parse(q[0].layout));
            this.layout_template = this.layout.join(';');
            console.log("Layout:\n",this.layout,"Layout Template:\n",this.layout_template)
            this.dataOK = true;
          }
        }
      })
    },
    getUser(){
      let ud = this.$store.state.user.id;
      // console.log("user:\n",ud);
      return ud;
    }
  },
  created() {
    this.getFilasData();
  },
  watch:{
    mailing_date(newValue){
      let data = newValue.split("-");
      console.log("Data:\n",data.length);
      if (data.length > 1) this.scheduling_date = data[2] + '/' + data[1] + '/' + data[0];
      else this.scheduling_date = '__/__/____';
      
    }
  },
  data() {
    return {
      total_rows:0,
      empty_rows:0,
      mailing_ok:false,
      read:[],
      files:null,
      mailing_name:'',
      today: new Date(),
      mailing_date:'',
      scheduling_date:'',
      total_items:0,
      total_pages:0,
      currentPage:1,
      perPage:perpage,
      dataOK:false,
      total_queues:-1,
      currentQueue:0,
      currentQName:'',
      layout:null,
      layout_template:null,
      filas_finish: [],
        finish_filas: [
          { name: "Fila 1000", code: "1000" },
          { name: "Fila 2000", code: "2000" },
        ],
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    };
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
  margin-left: 8px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}

div.custom-file.b-form-file{
  margin-left: 5px;
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

.salvar-container{
    margin-top: 5px;
    bottom: 0;
}
</style>