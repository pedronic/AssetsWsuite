<template>
<div class="relatorios">
   
      <pages-sub-header titulo="Relatório de Faturamento" icon="fal fa-file-invoice-dollar" :msgSmall="msg">
         
        <form class="container">
            <div class="form-group">
                <div class="row">
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
                        <button class="btn btn-success waves-effect waves-themed dow-color" disabled><i class="fal fa-file-download"></i></button>
                        
                    </div>
                </div>
            </div>
        </form>
                
      </pages-sub-header>
      <div class="panel ">
          <div class="panel-container show">
              <div class="panel-content">
                <tabela />
                
              </div>
              <div class="panel-footer ml-3 mt-3">
                  
              </div>
          </div>
      </div>
  </div>
  
</template>

<script>

// import DataTable from "@andresouzaabreu/vue-data-table";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
// Vue.component("tabela", DataTable);
export default {
    

}
</script>

<style>

</style>