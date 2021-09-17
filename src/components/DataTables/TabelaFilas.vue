<template>
  <div>
    <b-table
        sticky-header
        head-variant="blue"
        striped
      hover
      :items="items"
      :fields="fields"
      class="
        table-sm
        table-hover table-striped
        w-100
        dt-responsive
        dtr-inline
      "
      :select-mode="selectMode"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
    
    <template #head(selected)>
        <i class="fal fa-road"></i>
    </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>

      <template #cell(0)>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="0"></b-form-radio>
      </template>
            <template #cell(1)>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="1"></b-form-radio>
            </template>
            <template #cell(2)>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="2"></b-form-radio>
            </template>

    </b-table>
  </div>
</template>

<script>
export default {
    props: {
        fila: {
            required: true
        }
    },
  data() {
    return {
      fields: [
        "selected",
        "filas",
        "0",
        "1",
        "2",
      ],
      items: [
        { isChecked: true, filas: 'Fila 1000' },
        { isChecked: false, filas: 'Fila 2000' },
      ],
        selected: '',
    };
  },
};
</script>

<style >
/* .faturamento{
    overflow:auto;
} */
.table thead {
  background-color: #0d6d9d;
  color: #fff;
}

.table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
.table.b-table.table-sm
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.table.b-table > thead > tr > [aria-sort="none"],
.table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
.table.b-table > thead > tr > [aria-sort="ascending"],
.table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.table.b-table > thead > tr > [aria-sort="descending"],
.table.b-table > tfoot > tr > [aria-sort="descending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.btn-info {
  color: #fff;
  background-color: #0d6d9d;
  border-color: #3787ff;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
}
</style>

