<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Blacklist">
      <div class="card">
        <div class="card-body d-flex">
          <div class="d-flex" id="status-filter"></div>
        </div>
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
              >Subidos em Arquivos</a
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
              >Cadastros Manuais</a
            >
          </li>
        </ul>
      </div>

      <div id="myTabContent" class="tab-content">
        <div
          id="subir"
          aria-labelledby="one-tab"
          class="tab-pane fade show active p-3"
          role="tabpanel"
        >
          <div class="card">
            <div class="card-body d-flex">
              <div class="d-flex" id="filtro-grupo-pausa">
                <b-form-input
                  v-model="busca"
                  @keydown.enter.native="setFilter(busca, 'subido')"
                ></b-form-input>
                <div class="card">
                  <div class="card-body" />
                </div>
                <b-btn
                  type="submit"
                  id="pesquisa_faturamento"
                  class="btn btn-info waves-effect waves-themed fal fa-search"
                  @click="setFilter(busca, 'subido')"
                />
               
              </div>
            </div>
          </div>

          <TabelaBlacklist :items="items" :filter="filter" :filter_fields="filter_fields" v-if="dataOK" />
          <b-container fluid class="salvar-container">
            <b-pagination
              v-model="currentPage"
              :total-rows="total_items"
              :per-page="perPage"

              prev-class="single-arrow-button"
              next-class="single-arrow-button"
              ellipsis-text="···"
              @change="showSelectedPage"
            />
          </b-container>
        </div>
        <div
          id="cadastrar"
          aria-labelledby="two-tab"
          class="tab-pane fade p-3"
          role="tabpanel"
        >
         <div class="card">
            <div class="card-body d-flex">
              <div class="d-flex" id="filtro-grupo-pausa">
                <b-form-input
                  v-model="busca2"
                  @keydown.enter.native="setFilter2(busca2, 'cadastrado')"
                ></b-form-input>
                <div class="card">
                  <div class="card-body" />
                </div>
                <b-btn
                  type="submit"
                  id="pesquisa_faturamento"
                  class="btn btn-info waves-effect waves-themed fal fa-search"
                  @click="setFilter2(busca2, 'cadastrado')"
                />
                 <b-form-checkbox
                class="ml-2 mt-2"
                  v-model="status_filter2"
                  id="status-filter-button"
                  switch
                  @change="setFilter2(status_filter2, 'status')"
                />
              </div>
            </div>
          </div>
          <TabelaBlacklist2 :items="items2" :filter="filter2" :filter_fields="filter_fields2" v-if="dataOK2" :isLoading="loadingPage"/>
          <b-container fluid class="salvar-container">
            <b-pagination
              v-model="currentPage2"
              :total-rows="total_items2"
              :per-page="perPage"

              prev-class="single-arrow-button"
              next-class="single-arrow-button"
              ellipsis-text="···"
              @change="showSelectedPage2"
            />
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader";
import TabelaBlacklist from "../../components/DataTables/TabelaBlacklist";
import TabelaBlacklist2 from "../../components/DataTables/TabelaBlacklist2";
import { baseApiUrl} from "../../config/global.js"
import axios from 'axios'

const perpage = 10;

export default {
  name: "BlacklistMailing",
  components: {
    PagesSubHeader,
    TabelaBlacklist,
    TabelaBlacklist2,
  },
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
    },
    setFilter2(filter,field){
      this.filter2 = filter.toString();
      this.filter_fields2.splice(0,1,field);
    },
    showSelectedPage2(page) {
      console.log('Selected page:\t',page,'\nCurrent page:\t',this.currentPage);
      this.loadingPage = true;
      this.getNumerosBlacklists(page);
      this.loadingPage = false;
    },
    getArquivosBlacklists(page){
      let pag = page.toString();
      axios.get(baseApiUrl+'/blacklists'+'?page='+pag)
      .then(res => {
        console.log("Status:\t",res.status," - ",res.statusText)
        let a = res.data.data;
        let subidos = [];
        let first = {};
        let items = [];
        let subido = {};

        for(let i in a){
          subidos.push(a[i].name)
        }
        first.subidos = [...subidos];
        items.push({...first});

        for(let i in a){
          let fn = a[i].filename.split('/');
          subido.subido = fn.at(-1);
          let d = new Date(a[i].created_at);
          subido.data_importacao = d.toLocaleString('pt-BR');
          if (a[i].queue_id > 0) subido.fila = this.getQNameByID(a[i].queue_id);
          else subido.fila = 'sem fila associada';
          if (a[i].user_id > 0) subido.usuario = this.getUserNameByID(a[i].user_id);
          else subido.usuario = 'sem usuário associado';
          subido.id = a[i].id;
          items.push({...subido});
        }
        // console.log("Items @getNames():\n",items);
        this.items = [...items]; 
        this.dataOK = true;
        this.total_items = res.data.count;
        this.total_pages = Math.ceil(res.data.count / res.data.limit);
        this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
      })
    },
    getNumerosBlacklists(page){
      let pag = page.toString();
      axios.get(baseApiUrl+'/blacklistFones'+'?page='+pag)
      .then(res => {
        console.log("Status:\t",res.status," - ",res.statusText)
        let a = res.data.data;
        let subidos = [];
        let first = {};
        let items = [];
        let subido = {};

        for(let i in a){
          subidos.push(a[i].name)
        }
        first.cadastrados = [...subidos];
        items.push({...first});

        for(let i in a){
          subido.DDD = a[i].ddd;
          subido.cadastrado = a[i].number;
          let d = new Date(a[i].created_at);
          subido.data_inclusao = d.toLocaleString('pt-BR');
          subido.fila = this.getQNameByID(a[i].queue_id);
          
          if (a[i].user_id > 0) subido.usuario = this.getUserNameByID(a[i].user_id);
          else subido.usuario = 'sem usuário associado';
          subido.id = a[i].id;
          subido.status = true;
          items.push({...subido});
        }
        console.log("Blacklist Numbers @getNumerosBlacklists():\n",items);
        this.items2 = [...items]; 
        this.dataOK2 = true;
        this.total_items2 = res.data.count;
        this.total_pages2 = Math.ceil(res.data.count / res.data.limit);
        this.perPage = (res.data.limit>perpage)?res.data.limit:perpage;
      })
    },
    async getQNameByID(id){
      if (id > 0){
        let qID = id.toString();
        await axios.get(baseApiUrl+'/queues/'+qID)
        .then(res => {
          let qn = res.data.data;
          return (qn.name+' - '+qn.name_queue);
        })
      }
      else return 'sem fila associada';
    },
    getUserNameByID(id){
      let uID = id.toString();
      axios.get(baseApiUrl+'/users/'+uID)
      .then(res => {
        let un = res.data.data;
        return un.name;
      })
    }
  },
  created() {
    this.getArquivosBlacklists(this.currentPage);
    this.getNumerosBlacklists(this.currentPage);
  },  
  data() {
      return {
        dataOK:false,
        total_items:0,
        total_pages:0,
        currentPage:1,
        dataOK2:false,
        total_items2:0,
        total_pages2:0,
        currentPage2:1,
        perPage:perpage,
        items: [
        {
            subidos: ["Exemplo","Outro Exemplo"],
        },
        { 
            subido: 'exemplo.csv',
            fila:'',
            data_importacao: '',
            usuario: '',
            
        },
        { 
            subido: 'outro_exemplo.txt',
            fila: '',
            data_importacao: '',
            usuario: '',
        },
      ],
      subidos: [],
      msg: "",
      filter:'',
      filter_fields:[''],
      busca:'',
      status_filter: true,
      items2: [
        {
          cadastrados: ["Exemplo","Outro Exemplo"],
        },
        { 
            DDD: '11',
            cadastrado: '90543-4401',
            usuario: '',
            status: true
            
        },
        { 
            DDD: '21',
            cadastrado: '98642-2854',
            usuario: '',
            status: false
        },
      ],
      cadastrados: [],
      filter2:'',
      filter_fields2:[''],
      busca2:'',
      status_filter2: true,
      }
  }
}
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
.card-body {
  padding: 0px 5px 10px 5px;
  /* height: 50px; */
  /* width: 0;
  border: 0px;
  color: #ffffff transparent; */
}
.card > .card-body > .d-flex > button#pesquisa_faturamento {
  margin-right: 0.3rem !important;
}
.card > .card-body > .d-flex > button,
input {
  height: 38px !important;
}
.d-flex#filtro-grupo-pausa {
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