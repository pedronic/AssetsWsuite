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
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="defaultUnchecked" @change="visible = !visible" value="fila1000">
          <label class="custom-control-label" for="defaultUnchecked">{{ filas[0] }}</label>
        </div>
        </th>
        <td><div v-show="visible" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="defaultUncheckedRadio" name="defaultExampleRadios">
                                                        <label class="custom-control-label" for="defaultUncheckedRadio"></label>
                                                    </div></td>
        <td><div v-show="visible" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="defaultUncheckedRadio2" name="defaultExampleRadios">
                                                        <label class="custom-control-label" for="defaultUncheckedRadio2"></label>
                                                    </div></td>
        <td><div v-show="visible" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="defaultUncheckedRadio3" name="defaultExampleRadios">
                                                        <label class="custom-control-label" for="defaultUncheckedRadio3"></label>
                                                    </div></td>
      </tr>
      <tr>
        <th>
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" @change="visible2 = !visible2" id="defaultUnchecked2" value="fila2000">
          <label class="custom-control-label" for="defaultUnchecked2">{{ filas[1] }}</label>
        </div>
        </th>
        <td><div v-show="visible2" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="4" name="defaultExampleRadios2">
                                                        <label class="custom-control-label" for="4"></label>
                                                    </div></td>
        <td><div v-show="visible2" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="ppe" name="defaultExampleRadios2">
                                                        <label class="custom-control-label" for="ppe"></label>
                                                    </div></td>
        <td><div v-show="visible2" class="custom-control custom-radio-rounded">
                                                        <input type="radio" class="custom-control-input" id="ios" name="defaultExampleRadios2">
                                                        <label class="custom-control-label" for="ios"></label>
                                                    </div></td>
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

