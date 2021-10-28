<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      class="table-sm table-hover table-striped w-100 dt-responsive dtr-inline"
      :per-page="10"
    >
    <template #cell(descricao)>
      <div class="col-7 col-inputs">
              <div class="input-group d-flex">
                <input
                id="cell-form"
                  aria-describedby="basic-addon1"
                  aria-label="Username"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
    </template>
      <template #cell(CPC)>
        <div class="form-check ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      <template #cell(CPCA)>
        <div class="form-check ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
       <template #cell(alega_pgto)>
        <div class="form-check ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      <template #cell(promessav)>
        <div class="form-check ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TabelaRegistroFinalizacoes",
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "descricao",
          label: "Descrição",
          sortable: true,
        },
        {
          key: "CPC",
          label: "CPC",
          sortable: false,
        },
        {
          key: "CPCA",
          label: "CPCA",
          sortable: false,
        },
        {
          key: "alega_pgto",
          label: "Alega pagamento",
          sortable: false,
        },
        {
          key: "promessav",
          label: "Promessa/venda",
          sortable: false,
        },
       
      ],
      items: [
        {
          id: "1",
        },
        {
          id: "2",
        },
      ],
    };
  },
};
</script>

<style>
.form-control {
  background-color: #fff0;
  border: 1px solid #fff0;
}
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
</style> 