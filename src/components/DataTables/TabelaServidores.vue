<template>
  <div>
    <b-table
        striped
        hover
        :items="servidores"
        :fields="fields"
        :filter="filter"
        filter-debounce="50" 
        :filter-included-fields="filter_fields"
        class="
        table-sm
        table-hover table-striped
        w-100
        dt-responsive
        dtr-inline
      "
    >
      <template #cell(status)="slot">
        <b-form-checkbox class="ml-1" v-model="slot.item.status" name="check-button" switch disabled/>
      </template>
      <template #cell(acao)>
        <router-link :to="{ name: 'RegistroServidores' }">
          <i class="fal fa-pencil d-inline"></i>
        </router-link>
        <i class="fal fa-trash-alt d-inline ml-2"></i>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items:Array,
    filter:String,
    filter_fields:Array,
  },
  name: "TableDashboard",
  data(){
    return{
      fields: [
        {
          key: 'Nome',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'tipo',
          label: 'Tipo',
          sortable: false
        },
        {
          key: 'ip',
          label: 'IP',
          sortable: false
        },
        {
          key: 'Status',
          label: 'Status',
          sortable: false,
        },
        {
          key: 'acao',
          label: 'Ação',
          sortable: false
        },
      ],
      servidores: this.items,
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
.table.b-table > thead > tr > [aria-colindex="4"] {
  width: 5% !important;
}
.table.b-table > thead > tr > [aria-colindex="5"] {
  width: 4% !important;
}
.table.b-table > thead > tr > [aria-sort=ascending], .table.b-table > tfoot > tr > [aria-sort=ascending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.table.b-table > thead > tr > [aria-sort=descending], .table.b-table > tfoot > tr > [aria-sort=descending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
</style>