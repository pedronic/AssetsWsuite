<template>
    <div class="row">
        <div class="col-sm-12 faturamento">
           <b-table striped hover :items="items" :fields="fields" class="table-sm able-bordered table-hover table-striped w-100 dt-responsive dtr-inline"></b-table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios";
import {baseApiUrl, showError} from "@/config/global";
export default {
    name: "TabelaDashboard",
    props:{
      atualizar:{
        type: String,
        default: ""
      }
    },
    data(){
      return{
        fields: [
          {
            key: 'id',
            label: 'ID',
            sortable: true
          },
          {
            key: 'queue_name',
            label: 'Campanha',
            sortable: true
          },
          {
            key: 'agent',
            label: 'Agentes',
            sortable: true
          },
          {
            key: 'agent_incoming',
            label: 'Falando',
            sortable: true
          },
          {
            key: 'tme',
            label: 'TME',
            sortable: true
          },
          {
            key: 'tma',
            label: 'TMA',
            sortable: true
          },
          {
            key: 'channel_use_percent',
            label: '% Ocupação Canais',
            sortable: true
          },
          {
            key: 'agents_incoming_percent',
            label: '% Ocupação Agentes',
            sortable: true
          },
          {
            key: 'mailing_import',
            label: 'Mailing Importado',
            sortable: true
          },
          {
            key: 'mailing_processed',
            label: 'Mailing Trabalhado',
            sortable: true
          },
          {
            key: 'penetration',
            label: '% Penetração',
            sortable: true
          },
          {
            key: 'spin',
            label: 'Spin',
            sortable: true
          },
          {
            key: 'time_all_logged',
            label: 'Tempo Total Logado',
            sortable: true
          },
          {
            key: 'time_all_spoken',
            label: 'Tempo Total Falado',
            sortable: true
          },
          {
            key: 'time_all_free',
            label: 'Tempo Total Ocioso',
            sortable: true
          },
          {
            key: 'dial',
            label: 'Chamadas',
            sortable: true
          },
          {
            key: 'anwsered',
            label: 'Atendidas',
            sortable: true
          },
          {
            key: 'cpc_percent',
            label: '% CPC',
            sortable: true
          },
          {
            key: 'cpca_percent',
            label: '% CPCA',
            sortable: true
          },
          {
            key: 'claim_percent',
            label: '% Alega Pagamento',
            sortable: true
          },
          {
            key: 'promise_percent',
            label: '% Promessa',
            sortable: true
          },
          {
            key: 'cpc',
            label: 'CPC',
            sortable: true
          },
          {
            key: 'cpca',
            label: 'CPCA',
            sortable: true
          },
          {
            key: 'claim_payment',
            label: 'Alega Pagamento',
            sortable: true
          },
          {
            key: 'promise',
            label: 'Promessa',
            sortable: true
          },
         
        ],
        items: [],
        //loadPage: '',
        intervalo: ''
      }
    },
    methods:{
      getDadosDash(){
        
         
            axios.get(`${baseApiUrl}/dashboardAnalytics?userid=${this.user.id}`)
            .then(rt => this.items = rt.data.data).catch(showError)
            console.log ('reload acumulado', this.user)
            this.getDadosInterval('pausa')
          
         
       
      },
      getDadosInterval(pausa){
        
        if(!pausa){
           setInterval(function() {
            axios.get(`${baseApiUrl}/dashboardAnalytics?userid=${this.user.id}`)
            .then(rt => this.items = rt.data.data).catch(showError)
            console.log('intervalo' )
            
          }, 15000);
        }else{
          clearInterval(this.intervalo)
          clearInterval(this.intervalo)
          console.log(" limpo")
        }
      },
      
    },
    // updated(){
    //   if(this.loadPage == 'online'){
    //     this.getDadosInterval()
    //   }
    // },
    computed:mapState(['user']),
       
    
    mounted(){
        if(this.atualizar ==='acumulado'){
          this.getDadosDash()
          this. getDadosInterval('pausa')
        }
      console.log("mounted",this.atualizar)
      this.loadPage = this.atualizar
    },
    watch:{
      loadPage(newValue){
        let pausa = 0
        let interval =''
        if(newValue == "acumulado" && pausa == 1){
          console.log('wath: ',newValue)
          this.getDadosDash()
          this. getDadosInterval('pausa')
          clearInterval(interval)
          clearInterval(interval)
          console.log(" limpo")
        }
        if(newValue == "online"){
           console.log('wath: ',newValue)
           interval = setInterval(function(){
             this.getDadosDash()
             console.log('intervalo' )
           }, 15000)
           
           
        }
      },
      
      
    },
    
   
}

</script>

<style>
    /* .faturamento{
        overflow:auto;
    } */
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
</style>