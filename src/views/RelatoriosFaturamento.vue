<template>
  <div class="relatorios">
   
      <pages-sub-header titulo="Relatório de Faturamento" icon="fal fa-file-invoice-dollar" msgSmall="teste de pesquisa teste de pesquisa teste de pesquisa teste de pesquisa teste de pesquisa">
         
        <form class="container">
            <div class="form-group">
                <div class="row">
                    <div class="col-4 col-inputs">
                        <div class="dropdown d-flex">
                            <button class="btn dropdown-toggle ml-auto" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Selecione as filas 
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-1000">
                                        <label class="custom-control-label" for="fila-1000">fila 1000</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-4000">
                                        <label class="custom-control-label" for="fila-4000">fila 4000</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-3001">
                                        <label class="custom-control-label" for="fila-3001">fila 3001</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-3000">
                                        <label class="custom-control-label" for="fila-3000">fila 3000</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-1999">
                                        <label class="custom-control-label" for="fila-1999">Fila 1999</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-2000">
                                        <label class="custom-control-label" for="fila-2000">fila 2000</label>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="fila-2001">
                                        <label class="custom-control-label" for="fila-2001">fila Sem Parar Digital</label>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date" value="2023-07-23">
                    </div>
                    <div class="col-3 col-inputs">
                        <input class="form-control" id="example-date" type="date" name="date" value="2023-07-23">
                    </div>
                    <div class="col-1 col-botoes">
                        <button type="submit" name="pesquisa-faturamento" class="btn btn-info waves-effect waves-themed"><i class="fal fa-search"></i></button>
                        
                    </div>
                    <div class="col-1 col-botoes">
                        <button type="submit" name="pesquisa-faturamento" class="btn btn-success waves-effect waves-themed dow-color"><i class="fal fa-file-download"></i></button>
                        
                    </div>
                </div>
            </div>
        </form>
                
      </pages-sub-header>
      <div class="panel ">
          <div class="panel-container show">
              <div class="panel-content">
                <tabela-relatorio-faturamento />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import TabelaRelatorioFaturamento from '../components/DataTables/TabelaRelatorioFaturamento.vue'
import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
export default {
    components: { 
      PagesSubHeader, 
      TabelaRelatorioFaturamento
    },
    name:"RelatoriosFaturamento",
    props: {

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
</style>