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
              <input class="form-check-input" type="checkbox" @change="visible2 = !visible2"    id="inlineCheckbox2" value="opcao1">
              <label class="form-check-label ml-1" for="inlineCheckbox2">{{ filas[1] }}</label>
            </div>
          </th>
          <td><input class="form-check-input mt-1" v-show="visible2" type="radio"   name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
          <td><input class="form-check-input mt-1" v-show="visible2" type="radio"   name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
          <td><input class="form-check-input mt-1" v-show="visible2" type="radio"   name="inlineRadioOptions2" id="inlineRadio2" value="opcao1"> </td>
        </tr>
      </tbody>
    </table>
  </div>

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

  }
};
</script>

<style >

.table thead {
  background-color: #0d6d9d;
  color: #fff;
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

