<template>
  <div class="relatorios">
  <!-- Cabeçalho -->
     <subHeaderCommun icon="fal fa-user-headset" titulo="Lista de agentes" class="listAgents">
     <!-- <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-5">
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
          </div>
          <div class="col-2">
            <div class="card">
              <div class="card-body d-flex">
                  <div class="d-flex" id="status-filter">
                      <b-form-checkbox v-model="status_filter" id="status-filter-button" switch @change="setFilter(status_filter,'status')"/>
                  </div>
              </div>
            </div>
          </div>
          <div class="col-1">
            <div class="card">
              <div class="card-body d-flex">
                  <router-link class="d-flex" id="add-grupo-pausa" :to="{path:'/registro-agentes',params:{nome:''}}">
                      <b-btn variant="success" class="fal fa-plus"/>
                  </router-link>
              </div>
            </div>
          </div>
        </div>
      </div> -->
       <form class="container-fluid">
            <div class="form-group ">
                <div class="row">
                   <div class="col-2 col-inputs">
                        
                    </div>
                    <div class="col-3 col-inputs">
                        
                    </div>
                     <div class="col-3 col-inputs">
                        
                    </div>
                    <div class="col-3 col-inputs d-flex">
                        
                          <b-form-input v-model="busca" @keydown.enter.native="setFilter(busca,'Login')"></b-form-input>
                          <b-btn type="submit" id="pesquisa_faturamento" class="btn btn-info waves-effect waves-themed fal fa-search ml-2" @click="setFilter(busca,'Login')"/>
                        
                    </div>
                    
                    
                   
                    <div class="col-1 col-botoes searchtReportBilling d-flex">
                        
                          
                              <div class="d-flex " id="status-filter">
                                  <b-form-checkbox v-model="status_filter" id="status-filter-button" switch @change="setFilter(status_filter,'flag')"/>
                              </div>
                         
                        
                        
                          <router-link class="d-flex" id="add-grupo-pausa" :to="{path:'/registro-agentes',params:{nome:''}}">
                              <b-btn variant="success" class="fal fa-plus"/>
                          </router-link>
                        
                                
                    </div>
                    
                </div>
            </div>
         </form>

    </subHeaderCommun>
  <!-- Cabeçalho: FIM -->
 <div class="panel ">
          <div class="panel-container show">
              <b-table id="tabelaAgents" ref="tabelaAgents" striped hover :items="items" :fields="fields" :filter="filter"  filter-debounce="50" :filter-included-fields="filter_fields" class="table-sm table-hover table-striped w-100 dt-responsive dtr-inline " >
                <template #cell(agent)="slot">
                  <span :id="slot.item.id + '_Login'">{{slot.value}}</span>
                </template>
                <template #cell(flag)="slot">
                  <b-form-checkbox v-model="slot.item.flag" name="check-button" class="ml-1" switch disabled>
                  </b-form-checkbox>
                </template>

                <template #cell(acao)='slot'>
                  <router-link :to="{ name: 'RegistroAgentes' }">
                    <!-- <i class="fal fa-pencil d-inline"></i> -->
                    <b-button :id="(slot.item.id)+'_edit'" class="edit-btn" variant="outline"   v-html="editIcon"/>
                  </router-link>
                  <!-- <i class="fal fa-trash-alt d-inline ml-2"></i> -->
                  <b-button :id="(slot.item.id)+'_delete'" class="edit-btn" variant="outline"   v-html="deleteIcon"/>
                </template>

              </b-table>
              <div class="panel-footer ml-3 mt-3">
                  <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"  />
              </div>
          </div>
      </div>
   
  </div>
</template>

<script>
// import TabelaAgentes from '@/components/DataTables/TabelaAgentes.vue'
import subHeaderCommun from '@/components/subheader/subHeaderCommun.vue'
import { mapState } from "vuex";
import axios from "axios";
import {baseApiUrl, showError} from "@/config/global";

export default {
  components: {
    subHeaderCommun,
    // TabelaAgentes,
  },
  data() {
    return {
      usuarios: [],
      msg: "",
      items: [],
      filter:'',
      filter_fields:[''],
      fields:[
        { 
          key: 'agent',
          label: 'Ramal do agente',
          sortable: true
        },
        { 
          key: 'name',
          label: 'Nome',
          sortable: true
        },
        {
          key:'queue_default',
          label: 'Fila Principal',
          sortable: true
        },
        {
          key:'flag',
          label: 'status',
          sortable: true
        },
        {
          key: "acao",
          label: "Ação",
          sortable: false,
          thStyle: 'width: 8%;'
        },
      ],
      busca:'',
      status_filter: true,
      count: 1,
      limit: 10,
      page: 1,
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
    };
  },
  methods: {
    setFilter(filter,field){
      this.filter = filter.toString();
      this.filter_fields.splice(0,1,field);
      this.items=[];
      console.log ('litro ', this.filter)
      
    },
    getDados(){
      let flag = '';
      if(this.status_filter){
        flag = 1
      }else{
        flag = 0
      }
      flag = `&flag=${flag}`
       let urlString = `${baseApiUrl}/agents?page=${this.page}${flag}`
       
        axios.get(urlString)
          .then(rt => {
            
              this.items = rt.data.data;
              this.count = rt.data.count;
              this.limit = rt.data.limit;
              
            }).catch(showError)
            console.log ('GET dados' , this.items)
              
    },
    
  },
  watch:{
    page() {
      this.getDados()
      //console.log(this.page);
    },
    UsuarioFiltrado() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), "i");
        return this.usuarios.filter((usuario) => exp.test(usuario.user));
      } else {
        return this.usuarios;
      }
    },
    
    status_filter: function() {
      this.getDados()
      this.$refs.tabelaAgents.refresh()
      this.$root.$emit('bv::refresh::table', 'tabelaAgents')
      
    }
  },
  mounted(){
    this.getDados();
  },
  
 computed: mapState(["user"]),
 
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


.listAgents{
  padding-bottom: 10px;
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
.conteiner{
    padding: 0;
}
.col-botoes{
    padding-left: 3px !important;
    padding-right: 3px !important;
}
.col-inputs{
    padding-left: 3px !important;
    padding-right: 10px !important;
}
.dow-color{
    background-color: #1a7f37 !important;
}
.btn:not(:disabled):not(.disabled) {
    cursor: pointer;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
.add-btn>i, .edit-btn>i{
    padding: 0px !important;
    border-width: 0px 1px !important;
    display: flex;
    align-content: center;
    justify-content: center;
}

.add-btn, .edit-btn{
    display: table-cell;
    align-items: center !important;
    border-width: 1px 1px !important;
    border-color: #adadad;
    width: 42px;
    height: 42px;
}

.table thead {
  background-color: #0d6d9d;
  color: #fff;
}
.table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
.table.b-table.table-sm
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.table.b-table > thead > tr > [aria-sort="none"],
.table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
.table.b-table > thead > tr > [aria-sort="ascending"],
.table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.table.b-table > thead > tr > [aria-sort="descending"],
.table.b-table > tfoot > tr > [aria-sort="descending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.btn-info {
  color: #fff;
  background-color: #0d6d9d;
  border-color: #3787ff;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
}
</style> 