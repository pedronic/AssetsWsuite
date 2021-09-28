<template>
  <div class="row">
    <div class="col-sm-12 faturamento">
      <b-table striped hover :items="items" :fields="fields" class="table-sm able-bordered table-hover table-striped w-100 dt-responsive dtr-inline"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableBlacklistMailing",
  data(){
    return{
      fields: [
        {
          key: 'ID',
          label: 'ID',
          sortable: true
        },
        {
          key: 'Campanha',
          label: 'Campanha',
          sortable: true
        },
        {
          key: 'Agentes',
          label: 'Agentes',
          sortable: true
        },
        {
          key: 'Falando',
          label: 'Falando',
          sortable: true
        },
        {
          key: 'TME',
          label: 'TME',
          sortable: true
        },
        {
          key: 'TMA',
          label: 'TMA',
          sortable: true
        },
        {
          key: 'p_Ocupação_Canais',
          label: '% Ocupação Canais',
          sortable: true
        },
        {
          key: 'p_Ocupação_Agentes',
          label: '% Ocupação Agentes',
          sortable: true
        },
        {
          key: 'Mailing_Importado',
          label: 'Mailing Importado',
          sortable: true
        },
        {
          key: 'Mailing_Trabalhado',
          label: 'Mailing Trabalhado',
          sortable: true
        },
        {
          key: 'p_Penetração',
          label: '% Penetração',
          sortable: true
        },
        {
          key: 'Spin',
          label: 'Spin',
          sortable: true
        },
        {
          key: 'Tempo_Total_Logado',
          label: 'Tempo Total Logado',
          sortable: true
        },
        {
          key: 'Tempo_Total_Falado',
          label: 'Tempo Total Falado',
          sortable: true
        },
        {
          key: 'Tempo_Total_Ocioso',
          label: 'Tempo Total Ocioso',
          sortable: true
        },
        {
          key: 'Chamadas',
          label: 'Chamadas',
          sortable: true
        },
        {
          key: 'Atendidas',
          label: 'Atendidas',
          sortable: true
        },
        {
          key: 'p_CPC',
          label: '% CPC',
          sortable: true
        },
        {
          key: 'p_CPCA',
          label: '% CPCA',
          sortable: true
        },
        {
          key: 'p_Alega_Pagamento',
          label: '% Alega Pagamento',
          sortable: true
        },
        {
          key: 'p_Promessa',
          label: '% Promessa',
          sortable: true
        },
        {
          key: 'CPC',
          label: 'CPC',
          sortable: true
        },
        {
          key: 'CPCA',
          label: 'CPCA',
          sortable: true
        },
        {
          key: 'Alega_Pagamento',
          label: 'Alega Pagamento',
          sortable: true
        },
        {
          key: 'Promessa',
          label: 'Promessa',
          sortable: true
        },
        {
          key: 'Valor_Promessa',
          label: 'Valor Promessa',
          sortable: true
        },
      ],
      items: [
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },
        {
          isActive: true,
          ID: '2078',
          Campanha: 'PRE_CHURN_MOVEL_M1_PJ_D',
          Agentes: '12',
          Falando: '9',
          TME: '00:00:01',
          TMA: '00:00:23',
          p_Ocupação_Canais: '94%',
          p_Ocupação_Agentes: '75%',
          Mailing_Importado: '48391',
          Mailing_Trabalhado: '64912',
          p_Penetração: '46%',
          Spin: '0,37',
          Tempo_Total_Logado: '127:01:00',
          Tempo_Total_Falado: '122:19:15',
          Tempo_Total_Ocioso: '04:41:45',
          Chamadas: '70037',
          Atendidas: '27661',
          p_CPC: '2%',
          p_CPCA: '2%',
          p_Alega_Pagamento: '3%',
          p_Promessa: '56%',
          CPC: '753',
          CPCA: '728',
          Alega_Pagamento: '25',
          Promessa: '374',
          Valor_Promessa: '37049',
        },

      ]
    }
  }

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