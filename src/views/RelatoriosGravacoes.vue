<template>
  <div class="relatorios-rec">
   
      <!-- <pages-sub-header titulo="Relatório de Faturamento" icon="fal fa-file-invoice-dollar" :msgSmall="msg">
         
        <form class="container"> -->
            <!-- <div class="form-group"> -->
                <!-- <div class="row">
                    <div class="col-4 col-inputs">
                        <div class="dropdown d-flex">
                            <button class="btn dropdown-toggle ml-auto" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Selecione as filas 
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <div class="dropdown-item" v-for="queue in queues" :key="queue.id" >
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" :name="queue.queue_number" :id="queue.queue_number" :value="queue.queue_number" v-model="queueSelect">
                                        <label class="custom-control-label" :id="queue.queue_number" :for="queue.queue_number">{{queue.queue_name}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date" v-model="dtinicio"  value="dtinicio" :max="dtinicio" :maxlength="dtinicio" >
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date" v-model="dtfim" value="dtfim" :max="dtfim" :maxlength="dtfim" >
                    </div>
                    <div class="col-1 col-botoes">
                        <button class="btn btn-info waves-effect waves-themed" @click.prevent="getDados" ><i class="fal fa-search"></i></button>
                        
                    </div>
                    <div class="col-1 col-botoes">
                        <button-export class="btn btn-success waves-effect waves-themed dow-color" 
                        :data="dataForExcel"
                        worksheet="My Worksheet"
                        type="xls"
                        name="Wsuite-ReportBilling.xls"><i class="fal fa-file-download"></i></button-export>
                        
                    </div>
                </div> -->
            <!-- </div> -->
        <!-- </form>
                
      </pages-sub-header> -->
      <sub-header-commun titulo="Relatório de Gravações" icon="fal fa-file-invoice-dollar" :msgSmall="msg" class="reportBilling">
        <form class="container-fluid">
            <div class="form-group ">
                <div class="row">
                    <div class="col-3 col-inputs">
                        <div class="dropdown d-flex">
                            <button class="btn dropdown-toggle ml-auto" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Selecione as filas 
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <div class="dropdown-item" v-for="queue in queues" :key="queue.id" >
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" :name="queue.queue_number" :id="queue.queue_number" :value="queue.queue_number" v-model="queueSelect">
                                        <label class="custom-control-label" :id="queue.queue_number" :for="queue.queue_number">{{queue.queue_name}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="col-2 col-inputs">
                        <input class="form-control" id="example-date" type="text" name="doc" v-model="document" :max="dtinitModel" :maxlength="dtinitModel" placeholder="CPF/CNPJ" >
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date-in" v-model="dtinicio"  value="dtinicio" :max="dtinitModel" :maxlength="dtinitModel" >
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date-out" v-model="dtfim" value="dtfim" :max="dtendModel" :maxlength="dtendModel" >
                    </div>
                    <div class="col-1 col-botoes searchtReportBilling d-flex">
                        <button class="btn btn-sm btn-info waves-effect waves-themed d-flex align-items-center" @click.prevent="getDados" ><i class="fal fa-search"></i></button>
                        <button-export class="btn btn-sm btn-success waves-effect waves-themed dow-color d-flex align-items-center" 
                        :fields="json_fields"
                        :data="dataForExcel"
                        worksheet="W Suite Rec Report"
                        type="xls"
                        name="Wsuite-RecReport.xls"><i class="fal fa-file-download"></i></button-export>
                        
                    </div>
                    <!-- <div class="col-1 col-botoes exportReportBilling">
                        
                        
                    </div> -->
                </div>
            </div>
         </form>
      </sub-header-commun>
      <div class="panel ">
          <div class="panel-container show">
              <div class="panel-content">
                <b-table striped hover :items="items" :fields="fields" class="table-sm" id="tabela" :no-sort-reset="true" :sort-compare-options="{ numeric: true, sensitivity: 'base' }">
                     <template #cell(call_rec)="data">
                       <audio controls preload="metadata"><source :src="data.value" type="audio/x-wav"></audio>
                       
                    </template>
                </b-table>
                
              </div>
              <div class="panel-footer ml-3 mt-3">
                  <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"  />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//import TabelaRelatorioFaturamento from '../components/DataTables/TabelaRelatorioFaturamento.vue'
import { mapState } from "vuex";
import axios from "axios";
import {baseApiUrl, showError} from "@/config/global";
//import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
//import subHeaderCommun from '../components/subheader/PagesSubHeader.vue'
import SubHeaderCommun from '../components/subheader/subHeaderCommun.vue';
import app from '@/assets/js/app';
export default {
    name: "RelatoriosGravacoes",
    components: { 
      //PagesSubHeader, 
      //TabelaRelatorioFaturamento
      // subHeaderCommun,
        SubHeaderCommun
    },
     data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [{
                key: 'client_id',
                label: 'ID do Cliente',
                sortable: true
            },
            {
                key: 'calldate',
                label: 'Data',
                sortable: true,
                formatter: value=> this.dateFormatter(value)
            },
            {
                key: 'time',
                label: 'Hora',
                sortable: true,
                formatter: value=> app.TimeFormatter(value)
            },
            {
                key: 'client_name',
                label: 'Nome',
                sortable: true
            },
            {
                key: 'client_doc',
                label: 'Documento',
                sortable: true, 
                
            },
            {
                key: 'queue_name',
                label: 'Fila',
                sortable: true
            },
            {
                key: 'cdr_disposition',
                label: 'status Chamada',
                sortable: true,
            },
                
            {
                key: 'phone_ddd',
                label: 'phone_ddd',
                sortable: true
            },
            {
                key: 'phone_number',
                label: 'Telefone',
                sortable: true
            },
            {
                key: 'call_rec',
                label: 'Gravação',
                sortable: true,
                formatter: value=> this.audio(value)
            }
           
        ],
        json_fields:{
          ID:'client_id',
          data:{
            field:'calldate',
            callback: (value) => {
              return this.dateFormatter(value);
            },
          },
          Hora:{
            field:'time',
            callback: (value) => {
              return app.TimeFormatter(value);
            },
          },
          Nome:'client_name',
          Documento:'client_doc',
          Fila:'queue_name',
          status_chamada:'cdr_disposition',
          ddd:'phone_ddd',
          telefone:'phone_number',
          rec:{
            field:'call_rec',
            callback: (value) => {
              return this.audio(value);
            },
          }

      },
        items: [
        //  {
        //     id: 179,
        //     agent_id: 3085,
        //     agent_name: "3085",
        //     login_date: "2021-08-25",
        //     login_hour: "07:57:44",
        //     logout_date: "2021-08-14",
        //     logout_hour: "14:18:32",
        //     logged_time_total: "367:47:11",
        //     unlogged_time_total: "00:00:00",
        //     adherence: 0.00,
        //     break_official: "00:00:00",
        //     break_exceeded: "00:00:00",
        //     break_productive: "00:00:00",
        //     break_others: "00:00:00",
        //     break_total: "00:00:00",
        //     queue_id: 5,
        //     queue_number: 6020,
        //     company_id: 2,
        //     operation_time: "367:47:11",
        //     tme: "00:44:07",
        //     attendance_time: "00:09:27",
        //     tma: "00:01:53",
        //     available_time: "03:40:34",
        //     incoming_qty: 5,
        //     incoming_time: "00:00:00",
        //     outgoing_qty: 0,
        //     outgoing_time: "00:00:00",
        //     pos_attendance_time: "00:00:00",
        //     queue_name: "SEM PARAR",
        //     report_date: "2021-09-09 15:57:08",
        //   },
        //   {
        //     id: 179,
        //     agent_id: 3085,
        //     agent_name: "3085",
        //     login_date: "2021-08-25",
        //     login_hour: "07:57:44",
        //     logout_date: "2021-08-14",
        //     logout_hour: "14:18:32",
        //     logged_time_total: "367:47:11",
        //     unlogged_time_total: "00:00:00",
        //     adherence: 0.00,
        //     break_official: "00:00:00",
        //     break_exceeded: "00:00:00",
        //     break_productive: "00:00:00",
        //     break_others: "00:00:00",
        //     break_total: "00:00:00",
        //     queue_id: 5,
        //     queue_number: 6020,
        //     company_id: 2,
        //     operation_time: "367:47:11",
        //     tme: "00:44:07",
        //     attendance_time: "00:09:27",
        //     tma: "00:01:53",
        //     available_time: "03:40:34",
        //     incoming_qty: 5,
        //     incoming_time: "00:00:00",
        //     outgoing_qty: 0,
        //     outgoing_time: "00:00:00",
        //     pos_attendance_time: "00:00:00",
        //     queue_name: "SEM PARAR",
        //     report_date: "2021-09-09 15:57:08",
        //   },
          
        ],
        count: 0,
        page: 1,
        limit: 0,
        maxData:'',
        queryString:{},
        queues:[],
        queueSelect: [],
        msg:'',
        dtinicio:'',
        dtfim:'',
        json_data:[],
        dataForExcel: [
          {
            id: 179,
            agent_id: 3085,
            agent_name: "3085",
            login_date: "2021-08-25",
            login_hour: "07:57:44",
            logout_date: "2021-08-14",
            logout_hour: "14:18:32",
            logged_time_total: "367:47:11",
            unlogged_time_total: "00:00:00",
            adherence: 0.00,
            break_official: "00:00:00",
            break_exceeded: "00:00:00",
            break_productive: "00:00:00",
            break_others: "00:00:00",
            break_total: "00:00:00",
            queue_id: 5,
            queue_number: 6020,
            company_id: 2,
            operation_time: "367:47:11",
            tme: "00:44:07",
            attendance_time: "00:09:27",
            tma: "00:01:53",
            available_time: "03:40:34",
            incoming_qty: 5,
            incoming_time: "00:00:00",
            outgoing_qty: 0,
            outgoing_time: "00:00:00",
            pos_attendance_time: "00:00:00",
            queue_name: "SEM PARAR",
            report_date: "2021-09-09 15:57:08",
          },
        ],
        dtinitModel: new Date(),
        dtendModel:new Date(),
        document:''
      }
    },
    methods:{
      getDados(){
        let msg = this.queueSelect.toString();
        let dtinicio = this.dateFormatter(this.dtinicio +'T00:00:01');
        let dtfim = this.dateFormatter(this.dtfim +'T23:00:01');
        if(this.queueSelect.length > 0){
          this.msg = `Filas selecionadas ${msg} data inico selecionada: ${dtinicio} data fim selecionada: ${dtfim}`;
          let queues = `&queueSelect=${this.queueSelect}`;
          let doc = this.document != '' ? `&doc=${this.document}`: '';
          let urlString = `${baseApiUrl}/recReport?page=${this.page}&dtinicio=${this.dtinicio}&dtfim=${this.dtfim}&userid=${this.user.id}${queues}${doc}` 
        axios.get(urlString)
          .then(rt => {
              this.items = rt.data.data;
              this.dataForExcel = rt.data.data;
              this.count = rt.data.count;
              this.limit = rt.data.limit;
              
            }).catch(showError)
            console.log ('GET dados' , urlString)
            
           
        }else{
          this.msg = 'selecione as filas para pesquisa';
        }
        
          
      },
      audio(purl){
          return `http://gravacao.fulltimenegociasp.com.br/audios/${purl}`
      },
      dateFormatter(params){
        const dt = new Date(params);
        let dia = dt.getDate().toString();
        let mes = (dt.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
        
        let diaF = (dia.length == 1) ? '0'+dia : dia;
        
        let mesF = (mes.length == 1) ? '0'+mes : mes;
        let anoF = dt.getFullYear();

        const rt =  `${diaF}/${mesF}/${anoF}`;
        //console.log(rt)

        return rt
      },
      today(){
        const dt = new Date();
        let dia = dt.getDate().toString();
        let mes = (dt.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
        
        let diaF = (dia.length == 1) ? '0'+dia : dia;
        
        let mesF = (mes.length == 1) ? '0'+mes : mes;
        let anoF = dt.getFullYear();

        const rt =  `${anoF}-${mesF}-${diaF}`;
        //console.log(rt)

        return rt
      },
      aderencia(params){
        let ad = parseFloat(params);
        if(ad >= 99.5){
          return "100%"
        }else{
          return ad + '%'
        }

      },
    

      loadDados(){
        
        let urlString = `${baseApiUrl}/recReport?page=${this.page}&dtinicio=${this.dtinicio}&dtfim=${this.dtfim}&userid=${this.user.id}` 
         axios.get(urlString)
          .then(rt =>{ 
            this.items = rt.data.data
            this.dataForExcel = rt.data.data;
            this.count = rt.data.count;
            this.limit = rt.data.limit;
            }).catch(showError)
            console.log ('load dados' , urlString)
        
      },
      loadsQueues(){
        const user = typeof this.user != 'undefined' ? '/'+this.user.id : ''
        axios.get(`${baseApiUrl}/users/queues${user}`)
          .then(rt => {
            this.queues = rt.data
            }).catch(showError)
            console.log ('GET dados queues' )
           
      }
    },
    mounted(){
      this.dtfim= this.today();
      this.dtinicio= this.today();
      this.loadDados();
      this.loadsQueues();
      
      this.dtinitModel = this.today();
      this.dtendModel = this.today();
      // console.log (this.yesterday());
    },
     watch: {
        page() {
            this.loadDados()
            console.log(this.page);
        }
    },
    computed: mapState(["user"]),

}
</script>

<style>
.reportBilling{
  padding-bottom: 10px;
}

.exportReportBilling{
  text-align:right;
}
.searchtReportBilling{
  text-align:right;
}
.panel-content{
    overflow: auto;
}
.panel .panel-container .panel-content {
    padding: 0;
}
.card-body{
  padding: 5px;
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
.table thead{
        background-color: #0d6d9d;
        color:#fff;
    }
    .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right calc(0.3rem / 2) bottom 10px;
    padding-right: calc(0.3rem + 0.65em);
    
    }
    .table.b-table > thead > tr > [aria-sort=none], .table.b-table > tfoot > tr > [aria-sort=none] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
    
    }
    .table.b-table > thead > tr > [aria-sort=ascending], .table.b-table > tfoot > tr > [aria-sort=ascending] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
    }
    .table.b-table > thead > tr > [aria-sort=descending], .table.b-table > tfoot > tr > [aria-sort=descending] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
    }
    .btn-info {
    color: #fff;
    background-color: #0d6d9d;
    border-color: #3787ff;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
    }
    @media (min-width: 1250px){
      .reportBilling form{
        padding-left: 220px;
      }

    }
</style>