<template>
  <div class="frame-wrap p-0 border-0 m-0 d-inline" inline>
    <table class="table m-0 table-sm table-light table-hover table-striped w-50 d-inline" id="table-example">
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
import axios from "axios";
import { baseApiUrl } from "@/config/global";

export default {
    name: "TabelaMCDU",
  
  // filas
  data() {
    return {
      MCDUs: ['1000', '2000'],
      filasSelecionadas: [],
      selected: "",
      
    };
  },
  methods: {
    async getFields() {
      let res = await axios.get(
        baseApiUrl + `/monitorarFilas?queue_number=${this.id}`
      );
      let res2 = await axios.get(
        baseApiUrl + `/dashboardAnalytics/?queue_number=${this.id}`
      );
      let param = res.data.data;
      let param2 = res2.data.data[0];
      let agents = [];
      var first = {};
      let item = {};
      let items = [];

      this.items.splice(0, this.items.length);

      // CRIANDO O PRIMEIRO ARRAY (O DE CHAVES) PARA QUE O B-TABLE POSSO RECONHECER CADA ITEM
      for (let i in param) {
        agents.push(param[i].agent);
      }
      first.agents = [...agents];
      this.agents.push({ ...first });

      // AGORA AQUI É ADICIONADO CADA ITEM DE CADA REQUISIÇÃO

      for (let u in param) {
        item.status = param[u].status;
        item.duration = param[u].duration;
        item.agent = param[u].agent;
        item.queue_number = param[u].queue_number;
        item.answered_count = param[u].answered_count;
        item.answered_receptive_count = param[u].answered_receptive_count;
        item.bina = param[u].bina;
        items.push({ ...item });
      }

      // Fazendo request e inserindo da outra API
        Object.keys(param2).map(function(key, value) {
            item.iten = key;
            item.quantity = value;
            items.push({ ...item });
        });

      this.setBrowserData(items);
    },

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

