<template>
  <div class="row">
    <div class="col-sm-12 faturamento">
      <b-table striped hover :items="items" :fields="fields" class="table-sm able-bordered table-hover table-striped w-100 dt-responsive dtr-inline">
    <template #cell(acao)>
        <router-link :to="{ name: 'BlacklistPhone' }">
          <i class="fal fa-download d-inline"></i>
        </router-link>
        <i class="fal fa-trash-alt d-inline ml-2"></i>
    </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableBlacklist",
  data(){
    return{
      fields: [
        {
          key: 'arquivo',
          label: 'Arquivo',
          sortable: true
        },
        {
          key: 'data_importacao',
          label: 'Data Importação',
          sortable: false
        },
        {
          key: 'usuario',
          label: 'Usuário',
          sortable: false
        },
        {
          key: 'acao',
          label: 'Ação',
          sortable: false,
          thStyle: 'width: 4%;'
        },

      ],
      items: [
        {
          arquivo: 'exemplo.csv',
          data_importacao: '',
          usuario: '',
          acao: '',
        },
        {
          arquivo: 'outro_exemplo.txt',
          data_importacao: '',
          usuario: '',
          acao: '',
        },
      ]
    }
  }

}
</script>

<style>

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