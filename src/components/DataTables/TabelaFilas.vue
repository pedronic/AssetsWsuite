<template>
  <div class="frame-wrap p-0 border-0 m-0">
    <table class="table m-0 table-sm table-light table-hover table-striped w-100" id="table-example">
      <thead>
      <tr>
        <th scope="col" id="principal"><i class="fal fa-road mr-2"></i
        >Filas {{ nome }}</th>
        <th scope="col" class="secundaria">0</th>
        <th scope="col" class="secundaria">1</th>
        <th scope="col" class="secundaria">2</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" @change="visible = !visible" value="opcao1">
          <label class="form-check-label ml-1" for="inlineCheckbox1">{{ filas[0] }}</label>
        </div>
        </th>
        <td><input v-show="visible" class="form-check-input mt-1" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="opcao1"></td>
        <td><input v-show="visible" class="form-check-input mt-1" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="opcao1"></td>
        <td><input v-show="visible" class="form-check-input mt-1" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="opcao1"></td>
      </tr>
      <tr>
        <th>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" @change="visible2 = !visible2" id="inlineCheckbox2" value="opcao1">
          <label class="form-check-label ml-1" for="inlineCheckbox2">{{ filas[1] }}</label>
        </div>
        </th>
        <td><input class="form-check-input mt-1" v-show="visible2" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
        <td><input class="form-check-input mt-1" v-show="visible2" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
        <td><input class="form-check-input mt-1" v-show="visible2" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
      </tr>
      </tbody>
    </table>
  </div>
<!--  <div>-->
<!--    <b-table-->
<!--      sticky-header-->
<!--      head-variant="blue"-->
<!--      striped-->
<!--      hover-->
<!--      :items="items"-->
<!--      :fields="fields"-->
<!--      class="table-sm table-hover table-striped w-100 dt-responsive dtr-inline"-->
<!--      :select-mode="selectMode"-->
<!--      ref="selectableTable"-->
<!--      selectable-->
<!--      @row-selected="onRowSelected"-->
<!--    >-->
<!--      <template #head(selected)>-->
<!--        <i class="fal fa-road"></i>-->
<!--      </template>-->
<!--      <template #cell(selected)="{ rowSelected }">-->
<!--        <template v-if="rowSelected">-->
<!--          <span aria-hidden="true">&nbsp;</span>-->
<!--          <span class="sr-only">Selected</span>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <span aria-hidden="true">&nbsp;</span>-->
<!--          <span class="sr-only">Not selected</span>-->
<!--        </template>-->
<!--      </template>-->

<!--      <template #cell(0)="{ rowSelect }">-->
<!--        <template v-if="{ rowSelect }">-->
<!--        <b-form-radio-->
<!--          v-model="selected"-->
<!--          :aria-describedby="ariaDescribedby"-->
<!--          name="some-radios"-->
<!--          value="0"-->
<!--          :disabled="disabled"-->
<!--        />-->
<!--          </template>-->

<!--      </template>-->
<!--      <template #cell(1)>-->
<!--        <b-form-radio-->
<!--          v-model="selected"-->
<!--          :aria-describedby="ariaDescribedby"-->
<!--          name="some-radios"-->
<!--          value="1"-->
<!--          :disabled="disabled"-->
<!--        ></b-form-radio>-->
<!--      </template>-->
<!--      <template #cell(2)>-->
<!--        <b-form-radio-->
<!--          v-model="selected"-->
<!--          :aria-describedby="ariaDescribedby"-->
<!--          name="some-radios"-->
<!--          value="2"-->
<!--          :disabled="disabled"-->
<!--        ></b-form-radio>-->
<!--      </template>-->
<!--    </b-table>-->
<!--  </div>-->
</template>

<script>
export default {
  props: {
    nome: {
      required: false,
    },
  },
  // filas
  methods: {
    selecionado() {

    }
  },
  data() {
    return {
      filas: ['Fila 1000', 'Fila 2000'],
      filasSelecionadas: [],
      selected: "",
      visible: false,
      visible2: false,
    };
  },
  mounted() {
    // $('input:checkbox').change(function()
    // {
    //   if ($(this).is(":checked"))
    //   {
    //     $('#table-example').addClass($(this).attr("data-class"));
    //   }
    //   else
    //   {
    //     $('#table-example').removeClass($(this).attr("data-class"));
    //   }
    // });
  }
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
#principal {
  width: 91%;
}

.secundaria {
  width: 3%;
}
.form-check-input {
  margin-left: -0.1rem !important;
}
</style>

