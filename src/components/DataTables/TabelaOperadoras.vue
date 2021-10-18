<template>
  <div>
    <b-table
        striped
        hover
        :items="operadoras"
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
      <template #cell(classes)>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled id="inlineCheckbox1" value="option1">
          <label class="form-check-label" for="inlineCheckbox1">Local</label>
        </div>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled id="inlineCheckbox2" value="option2">
          <label class="form-check-label" for="inlineCheckbox2">LDN</label>
        </div>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled id="inlineCheckbox1" value="option1">
          <label class="form-check-label" for="inlineCheckbox1">VC1</label>
        </div>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled checked id="inlineCheckbox2" value="option2">
          <label class="form-check-label" for="inlineCheckbox2">VC2</label>
        </div>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled checked id="inlineCheckbox1" value="option1">
          <label class="form-check-label" for="inlineCheckbox1">VC3</label>
        </div>
        <div class="form-check form-check-inline mr-3">
          <input class="form-check-input" type="checkbox" disabled checked id="inlineCheckbox2" value="option2">
          <label class="form-check-label" for="inlineCheckbox2">LDI</label>
        </div>
      </template>
      <template #cell(Nome)="slot">
        <span :id="slot.item.Nome+'_Nome'">{{slot.value}}</span>
      </template>
      <template #cell(status)="slot">
        <b-form-checkbox v-model="slot.item.status" name="check-button" class="ml-1" switch disabled>
        </b-form-checkbox>
      </template>
      <template #head(acao)>
        <b-button class="head-add-button btn-success ml-4" v-b-modal="'new_line'" variant="outline-dark">
          <span class="fal fa-plus fa-1x head-add-button"/>
        </b-button>
      </template>
      <template #cell(acao)>
        <button type="button" class="btn edit-btn btn-outline d-inline">
          <span class="fal fa-pencil">
          </span>
        </button>
        <button type="button" class="btn edit-btn btn-outline d-inline">
          <span class="fal fa-trash-alt">
          </span>
        </button>
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
          key: 'IP',
          label: 'IP',
          sortable: false
        },
        {
          key: 'Porta',
          label: 'Porta',
          sortable: false
        },
        {
          key: 'Contexto',
          label: 'Contexto',
          sortable: false
        },
        {
          key: 'Classes',
          label: 'Classes',
          sortable: false,
        },
        {
          key: "status",
          label: "Status",
          sortable: false,
          thStyle: 'width: 5%;',
        },
        {
          key: 'acao',
          label: 'Ação',
          sortable: false,
          thStyle: 'width: 8%;'
        },
      ],
      operadoras: this.items,
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