<template>
    <div class="relatorios">
        <pages-sub-header titulo="Dashboard Analítico" icon="fal fa-list" >
            
            <div class="card">
                <div class="card-body">
                    <form>
                      <select class="form-control" id="example-select">
                        
                        <option>Acumulado do dia </option>           
                        <option>Online</option>
                        <option>5 minutos</option>
                        <option>10 minutos</option>
                        <option>15 minutos</option>
                        <option>30 minutos</option>
                        <option>1 Hora</option>
                        <option>2 Horas</option>
                        <option>4 Horas</option>
                        <option>8 Horas</option>
                      </select>
                    </form>
                </div>
         </div>
        </pages-sub-header>
        <div class="panel ">
            <div class="panel-container show">
                <div class="panel-content">
                    <tabela-dashboard/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabelaDashboard from '../components/DataTables/TabelaDashboard.vue'
import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
export default {
    name: "DashAnalitico",
  components: { 
    TabelaDashboard, 
    PagesSubHeader  
  },

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