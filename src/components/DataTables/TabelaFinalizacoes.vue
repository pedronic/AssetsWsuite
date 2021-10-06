<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      class="table-sm table-hover table-striped w-100 dt-responsive dtr-inline"
    >
      <template #cell(CPC)>
        <div class="form-check form-check-inline ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            disabled
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      <template #cell(CPCA)>
        <div class="form-check form-check-inline ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            disabled
            checked
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
       <template #cell(alega_pgto)>
        <div class="form-check form-check-inline ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            disabled
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      <template #cell(promessav)>
        <div class="form-check form-check-inline ml-3">
          <input
            class="form-check-input"
            type="checkbox"
            disabled
            checked
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
      </template>
      <template #cell(status)>
        <b-form-checkbox
          v-model="checked"
          name="check-button"
          class="ml-1"
          switch
          disabled
        >
        </b-form-checkbox>
      </template>
      <template #cell(ação)>
        <router-link :to="{ name: 'RegistroUsuarios' }">
          <i class="fal fa-pencil d-inline"></i>
        </router-link>
        <i class="fal fa-trash-alt d-inline ml-2"></i>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TabelaFinalizacoes",
  data() {
    return {
      fields: [
        {
          key: "nome",
          label: "Nome",
          sortable: true,
        },
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
        {
          key: "Status",
          label: "Status",
          sortable: false,
          thStyle: "width: 5%;",
        },
        {
          key: "Ação",
          label: "Ação",
          sortable: false,
          thStyle: "width: 4%;",
        },
      ],
      items: [
        {
          nome: "Exemplo",
          id: "1",
          descricao: "Teste",
        },
        {
          nome: "Outro Exemplo",
          id: "2",
          descricao: "",
        },
      ],
    };
  },
};
</script>

<style>
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