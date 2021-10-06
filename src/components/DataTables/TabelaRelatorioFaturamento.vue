  <template>
    <div class="row">
        <div class="col-sm-12 ">
        <b-table striped hover :items="items" :fields="fields" class="table-sm" id="tabela" :no-sort-reset="true" :sort-compare-options="{ numeric: true, sensitivity: 'base' }"></b-table>
        </div>
    </div>
</template>

<script>

 
export default {
    name: "TabelaDefault",
    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'agentes',
            label: 'Agentes',
            sortable: true
          },
           {
            key: 'nome',
            label: 'Nome',
            sortable: true
          },
           {
            key: 'data_login',
            label: 'Data Login',
            sortable: true
          },
           {
            key: 'hora_login',
            label: 'Hora Login',
            sortable: true
          },
           {
            key: 'data_logoff',
            label: 'Data Logoff',
            sortable: true
          },
           {
            key: 'hora_logoff',
            label: 'Hora Logoff',
            sortable: true
          },
           {
            key: 'tempo_total_logado',
            label: 'Tempo Total Logado',
            sortable: true
          },
           {
            key: 'tempo_total_deslogado',
            label: 'Tempo Total Deslogado',
            sortable: true
          },
           {
            key: 'p_aderencia',
            label: '% Aderência',
            sortable: true
          },
           {
            key: 'pausas_oficiais',
            label: 'Pausas Oficiais',
            sortable: true
          },
           {
            key: 'pausas_excedido',
            label: 'Pausas Excedido',
            sortable: true
          },
           {
            key: 'pausas_produtivas',
            label: 'Pausas Produtivas',
            sortable: true
          },
           {
            key: 'outras_pausas',
            label: 'Outras Pausas',
            sortable: true
          },
           {
            key: 'tempo_total_pausas',
            label: 'Tempo Total Pausas',
            sortable: true
          },
        {
            key: 'filas',
            label: 'Filas',
            sortable: true
          },
          {
            key: 'tempo_operacao',
            label: 'Tempo em Operação',
            sortable: true
          },
          {
            key: 'tempo_total_disponivel',
            label: 'Tempo Total Disponível',
            sortable: true
          },
          {
            key: 'tme',
            label: 'TME',
            sortable: true
          },
          {
            key: 'tempo_atendimento',
            label: 'Tempo em Atendimento',
            sortable: true
          },
          {
            key: 'tma',
            label: 'TMA',
            sortable: true
          },
          {
            key: 'entrantes',
            label: 'Entrantes',
            sortable: true
          },
          {
            key: 'tempo_entrantes',
            label: 'Tempo Entrantes',
            sortable: true
          },
          {
            key: 'saintes',
            label: 'Saintes',
            sortable: true
          },
          {
            key: 'tempo_falado',
            label: 'Tempo Falado',
            sortable: true
          },
          {
            key: 'tempo_pos_atendimento',
            label: 'Tempo Pós-Atendimento',
            sortable: false
          },
          {
            key: 'campanha',
            label: 'Campanha',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            //variant: 'danger'
          }
        ],
        items: [
          { 
              isActive: true, 
              agentes: '3019' ,
              nome:'BugerKings',
              data_login:'17/08/2021',
              hora_login:'08:00:07',
              data_logoff:'18/08/2021',
              hora_logoff: '12:00:00',
              tempo_total_logado:'00:04:01',
              tempo_total_deslogado: '01:01:00',
              p_aderencia: '87%',
              pausas_oficiais:'02:00:43',
              pausas_excedido:'02:00:43',
              pausas_produtivas:'02:00:43',
              outras_pausas:'02:00:43',
              tempo_total_pausas:'02:00:43',
              filas:'1000',
              tempo_operacao:'01:00:59',
              tempo_total_disponivel:'99:59:59',
              tme:'',
              tempo_atendimento: '',
              tma:'00:00:05',
              entrantes:'',
              tempo_entrantes:'',
              saintes:'00:00:00',
              tempo_falado: '00:00:00',
              tempo_pos_atendimento: '00:00:00',
              campanha: 40, 
              
              
        },
         { 
              isActive: false, 
              agentes: '3019' ,
              nome:'Macdonald',
              data_login:'17/08/2021',
              hora_login:'08:00:03',
              data_logoff:'17/08/2021',
              hora_logoff: '12:00:00',
              tempo_total_logado:'00:04:01',
              tempo_total_deslogado: '01:01:00',
              p_aderencia: '87%',
              pausas_oficiais:'02:00:43',
              pausas_excedido:'02:00:43',
              pausas_produtivas:'02:00:43',
              outras_pausas:'02:00:43',
              tempo_total_pausas:'02:00:43',
              filas:'1000',
              tempo_operacao:'01:00:59',
              tempo_total_disponivel:'99:59:59',
              tme:'',
              tempo_atendimento: '',
              tma:'00:00:05',
              entrantes:'',
              tempo_entrantes:'',
              saintes:'00:00:00',
              tempo_falado: '00:00:00',
              tempo_pos_atendimento: '00:00:00',
              campanha: 40, 
              
              
        },
          
        ],
        
      }
    },
      methods:{

        
        
      },
    mounted(){
     
    }

}
</script>

<style >
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
    .btn-info {
    color: #fff;
    background-color: #0d6d9d;
    border-color: #3787ff;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
    }
</style>

