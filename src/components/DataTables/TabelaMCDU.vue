<template>
  <div class="frame-wrap p-0 border-0 m-0">
    <table class="table m-0 table-sm table-light table-hover table-striped w-100" id="table-example">
      <thead>
      <tr>
        <th scope="col" id="principal"><i class="fal fa-road mr-2"></i
        >MCDU</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="defaultUnchecked" value="opcao1">
          <label class="custom-control-label" for="defaultUnchecked">{{ MCDUs[0] }}</label>
        </div>
        </th>
      </tr>
      <tr>
        <th>
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="defaultUnchecked2" value="opcao1">
          <label class="custom-control-label" for="defaultUnchecked2">{{ MCDUs[1] }}</label>
        </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
    name: "TabelaMCDU",
  
  // filas
  methods: {
    selecionado() {

    }
  },
  data() {
    return {
      MCDUs: ['1000', '2000'],
      filasSelecionadas: [],
      selected: "",
      
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

