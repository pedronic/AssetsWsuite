<template>
    <div class="relatorios">
        <pages-sub-header titulo="Dashboard Analítico" icon="fal fa-list" >
            
            <div class="card">
                <div class="card-body">
                    <form>
                      <select class="form-control" id="example-select" v-model="selected">
                        
                        <option v-for="reportType in reportTypes" :key="reportType.codigo" :value="reportType.codigo" >{{reportType.valor}} </option>           
                        
                        
                      </select>
                    </form>
                </div>
         </div>
        </pages-sub-header>
        <div class="panel ">
            <div class="panel-container show">
                <div class="panel-content">
                    <tabela-dashboard :atualizar="selected"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from "axios";
// import {baseApiUrl} from "@/config/global";
import TabelaDashboard from '../components/DataTables/TabelaDashboard.vue'
import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
export default {
    name: "DashAnalitico",
  components: { 
    TabelaDashboard, 
    PagesSubHeader  
  },
  data: function () {
    return{
      selected:'acumulado',
      reportTypes:[
        {codigo:"acumulado", valor:"Acumulado do dia"},
        {codigo:"online", valor:"Online"}
      ],
      data: []
    }
  },
  
  computed: {
      iniciando(){
        return this.setdash()
      }
    //  return this.setdash()
  },
  methods:{
    //   intervaloDados: function (){
    //       setInterval(async () => {
    //           const dados = await axios.get(`${baseApiUrl}/dashboardAnalytics`)
    //           this.data = dados.data;
    //       },60000);
    //   },
    //   dados: async function (){
    //        const dados = await axios.get(`${baseApiUrl}/dashboardAnalytics`)
    //         this.data = dados.data;
    //   }
    setdash(){
      if(this.selected == 'online'){
        console.log("selecionado ", this.selected)
        this.$store.commit('setDashboard', true);
      }else{
        this.$store.commit('setDashboard', false);
        console.log("selecionado ", this.selected)
      }
    }
  }

}
</script>

<style>
.panel-content{
    overflow: auto;
}
.panel .panel-container .panel-content {
    padding: 0;
}
.card-body{
    padding: 5px;
}
</style>