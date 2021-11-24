<template>
  <div class="pausas">
    <b-table
      id="tabela-de-pausas"
      :ref="'tabela-de-pausas'"
      class="
        tabela-pausas
        table-sm table-hover table-striped
        w-100
        dt-responsive
        dtr-inline
      "
      :items="filas"
      :responsive="true"
      :fields="fields"
      :filter="filter"
      filter-debounce="50"
      :filter-included-fields="filter_fields"
      sticky-header
      :per-page="10"
      :busy="busy"
    >
      <!--editando os headers das tabelas-->

      <template v-slot:head(name)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(type)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(ip)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(flag)="data">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:head(add)="data">
        <!-- <b-button class="head-add-button btn-success"  v-b-modal="'new_line'" variant="outline-dark">
          <span v-html="data.label" class="head-add-button"/>
        </b-button> -->
        <router-link
          :to="{ name: 'RegistroServidores', params: { serverID: newID } }"
        >
          <b-button class="head-add-button btn-success" variant="outline-dark">
            <span class="head-add-button" v-html="data.label" />
          </b-button>
        </router-link>
      </template>
      <!--Editando cada célula da tebela-->

      <template v-slot:cell(name)="slot">
        <span :id="slot.item.name + '_pausa'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(type)="slot">
        <span :id="slot.item.name + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(ip)="slot">
        <span :id="slot.item.name + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(perfil)="slot">
        <span :id="slot.item.name + '_alerta'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(limite)="slot">
        <span :id="slot.item.name + '_limite'">{{ slot.value }}</span>
      </template>
      <template v-slot:cell(icone)="slot">
        <span :id="slot.item.name + '_icone'" v-html="slot.value" />
      </template>
      <template v-slot:cell(flag)="slot">
        <b-form-checkbox
          v-model="slot.value"
          :id="slot.item.name + '_ativa'"
          :value="true"
          :unchecked-value="false"
          switch
          disabled
        />
      </template>
      <!--célula de adição é personalizada dessa maneira para recebeer os dois botões-->

      <template v-slot:cell(add)="slot">
        <router-link
          :to="{
            name: 'RegistroServidores',
            params: {
              id: slot.item.id,
              type: slot.item.type,
              ip: slot.item.ip,
              name: slot.item.name,
              flag: slot.item.flag,
              gateway_ext: slot.item.gateway_ext,
              gateway_sip_user: slot.item.gateway_sip_user,
              gateway_domain: slot.item.gateway_domain,
            },
          }"
        >
          <b-button
            :id="slot.item.name + '_edit'"
            class="edit-btn"
            variant="outline"
            v-html="editIcon"
          />
        </router-link>
        <b-btn
          :id="slot.item.name + '_add'"
          v-html="deleteIcon"
          class="add-btn"
          variant="outline"
          v-b-modal="slot.item.name + '_delete'"
        />
      </template>
    </b-table>
    <!-- ----------------------------------------------------A ser implementado futuramente -->
    <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
    <div v-for="(i, index) in filas" :key="i.name + '_edit'">
      <!-- Faz o mapeamento de cada linha (item-objeto) da tabela -->
      <b-modal
        :id="i.name + '_edit_modal'"
        :ref="i.name + '_edit_modal'"
        title="Editar Servidor"
        size="xl"
        :hide-header-close="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        :lazy="true"
        ok-title="SALVAR"
        ok-variant="info"
        cancel-title="CANCELAR"
        cancel-variant="danger"
        @ok="updateRow(index)"
        @cancel="cancelEdit(index)"
        @show="populateEditLine(index)"
      >
        <b-container fluid>
          <b-col cols="14">
            <b-row>
              <b-col cols="4" class="name-head-container">
                <span class="name-head">Nome</span>
              </b-col>
              <b-col cols="2" class="nome-head-container">
                <span class="nome-head">Tipo</span>
              </b-col>
              <b-col cols="2" class="email-head-container">
                <span class="email-head">ip</span>
              </b-col>
              <b-col cols="1" class="status-head-container">
                <span class="status-head">Status</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4" class="name-body-container">
                <b-form-input
                  v-model="editRowInput.name"
                  :presentState="i"
                  :id="i.name + '_edit_row_pausa'"
                  :ref="i.name + '_edit_row_pausa'"
                  type="text"
                />
              </b-col>
              <b-col cols="2" class="nome-body-container">
                <b-form-input
                  v-model="editRowInput.tipo"
                  :presentState="i"
                  :id="i.name + '_edit_row_produtiva'"
                  type="text"
                />
              </b-col>
              <b-col cols="2" class="email-body-container">
                <b-form-input
                  v-model="editRowInput.ip"
                  :presentState="i"
                  :id="i.name + '_edit_row_obrigatoria'"
                  type="text"
                />
              </b-col>
              <b-col cols="1" class="status-body-container">
                <b-form-checkbox
                  v-model="editRowInput.status"
                  :presentState="i"
                  :id="i.name + '_edit_row_ativa'"
                  :value="true"
                  :unchecked-value="false"
                  switch
                />
              </b-col>
            </b-row>
          </b-col>
        </b-container>
      </b-modal>
      <!-- MODAL PARA Edição DE LINHA (FIM) -->
      <!-- ---------------------------------------------------- -->
      <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
      <b-modal
        :id="i.name + '_delete'"
        title="ATENÇÃO!!!"
        :hide-header-close="false"
        :no-close-on-backdrop="false"
        :no-close-on-esc="false"
        :lazy="true"
        ok-title="EXCLUIR"
        ok-variant="danger"
        cancel-title="MANTER"
        cancel-variant="success"
        @ok="deleteRow(i.name, i.id)"
        @cancel="cancelDelete(i.name)"
      >
        Tem certeza que deseja excluir o servidor <b>{{ i.name }}</b
        >?
      </b-modal>
    </div>
    <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
    <!-- ---------------------------------------------------- A ser implementado futuramente -->
    <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
    <b-modal
      id="new_line"
      refs="new_line"
      title="Adicionar Novo Servidor"
      size="xl"
      :hide-header-close="false"
      :no-close-on-backdrop="false"
      :no-close-on-esc="false"
      ok-title="ADICIONAR"
      ok-variant="success"
      cancel-title="CANCELAR"
      cancel-variant="danger"
      @ok="okayAdd()"
      @cancel="cancelAdd()"
      @show="populateNewLine()"
    >
      <b-container fluid>
        <b-col cols="12">
          <b-row>
            <b-col cols="2" class="nome-head-container">
              <span class="nome-head">Nome</span>
            </b-col>
            <b-col cols="2" class="email-head-container">
              <span class="email-head">Tipo</span>
            </b-col>
            <b-col cols="1" class="perfil-head-container">
              <span class="perfil-head">ip</span>
            </b-col>
            <b-col cols="1" class="status-head-container">
              <span class="status-head">Ação</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" class="name-body-container">
              <b-form-input
                v-model="newRowInput.name"
                :id="'new_row_pausa'"
                type="text"
              ></b-form-input>
            </b-col>
            <b-col cols="2" class="nome-body-container">
              <b-form-input
                v-model="newRowInput.tipo"
                :id="'new_row_produtiva'"
                type="text"
              />
            </b-col>
            <b-col cols="1" class="email-body-container">
              <b-form-input
                v-model="newRowInput.ip"
                :id="'new_row_obrigatoria'"
                type="text"
              />
            </b-col>

            <b-col cols="1" class="status-body-container">
              <b-form-checkbox
                v-model="newRowInput.status"
                :id="'new_row_ativa'"
                :value="true"
                :unchecked-value="false"
                switch
              />
            </b-col>
          </b-row>
        </b-col>
      </b-container>
    </b-modal>
    <!-- MODAL PARA CRIAR NOVA LINHA (FIM) -->
    <!-- ---------------------------------------------------- -->
  </div>
</template>

<script>
import ValidateToaster from "../../plugins/validateToaster.js"; //importando "mixin" (no caso está na pasta plugin)
import axios from "axios";
import { baseApiUrl } from "@/config/global";

const defaultRow = {
  //linha para se exibir alguma coisa na tela caso ocorra alguma falha na requisição de dados
  name: "",
  nome: false,
  email: false,
  perfil: "",
  limite: "",
  icone: "",
  status: true,
  add: '<span class="fal fa-trash-alt"/>',
};

export default {
  name: "TabelaServidores",
  mixins: [ValidateToaster],
  props: {
    //recebe os itens, o parâmetro de filtragem e os campos a serem filtrados
    items: Array,
    filter: String,
    filter_fields: Array,
  },
  data() {
    return {
      filas: this.items.slice(1, this.items.length), //o primeiro item se refere aos nomes de cada
      newRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha criada
      editRowInput: Object.assign({}, this.newRowDefault), //cria um novo objeto com a nova linha editada
      editIcon: '<span class="fal fa-pencil"/>',
      deleteIcon: '<span class="fal fa-trash-alt"/>',
      busy: this.isLoading,
      names: this.items[0].names, //usado em métodos de filtragem
      fields: [
        //todas as colunas que receberam chave e valores
        {
          key: "name",
          label: "Nome",
          sortable: true,
        },
        {
          key: "type",
          label: "Tipo",
          sortable: true,
        },
        {
          key: "ip",
          label: "IP",
          sortable: true,
        },

        {
          key: "flag",
          label: "Status",
          // Boolean
        },
        {
          key: "add",
          label: '<span class="fal fa-plus fa-1x head-add-button"/>',
        },
      ],
    };
  },

  methods: {
    async deleteServer(id) {
      //metódo de deleção de servidor (na base de dados)
      let s = await axios.delete(`${baseApiUrl}/servers/${id}`);
      console.clear();
      console.log("Delete status:\n", s);
    },
    deleteRow(ev, id) {
      const p = this.names.indexOf(ev); //metódo de deleção de servidor
      this.filas.splice(p, 1);
      this.names.splice(p, 1);
      let toast = {
        isValidated: true,
        title: "SERVIDOR EXCLUÍDO",
        message: "Servidor " + ev.toUpperCase() + " excluído com sucesso!",
      };
      this.deleteServer(id);

      this.validateAndToast(toast);
    },
    cancelDelete(p) {
      //efeito que ocorre quando o usuário desiste da seleção
      let toast = {
        isValidated: false,
        title: "SERVIDOR MANTIDO",
        message:
          "Servidor " +
          p.toUpperCase() +
          " foi mantido. A exclusão foi cancelada.",
      };
      this.validateAndToast(toast);
    },
    okayAdd() {
      //adição visual de novo usuário
      let newPausa = this.newRowInput.name.trim();
      if (newPausa.length > 0) {
        console.log("Filas ok:");
        console.log(this.filas);
        console.log("New Row Input:");
        console.log(this.newRowInput);
        this.filas.push(Object.assign({}, this.newRowInput));
        this.pausas.push(newPausa);
        let toast = {
          isValidated: true,
          title: "NOVO SERVIDOR ADICIONADO",
          message:
            "Novo servidor " +
            newPausa.toUpperCase() +
            " adicionado com sucesso!",
        };
        this.validateAndToast(toast);
      } else {
        //em caso de o nome inserido for vazio
        let toast = {
          isValidated: false,
          title: "NOVO SERVIDOR VAZIO NÃO ADICIONADA",
          message:
            "Nova Servidor " +
            newPausa.toUpperCase() +
            " não foi adicionado. Não é possível adicionar Servidores sem nome ou com o nome em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelAdd() {
      //cancelamento do método de adição
      let newPausa = this.newRowInput.name.trim();
      let toast = {
        isValidated: false,
        title: "NOVO SERVIDOR NÃO ADICIONADO",
        message:
          "Novo Servidor " +
          newPausa.toUpperCase() +
          " não foi adicionado. A operação de adicionar foi cancelada pelo usuário.",
      };
      this.validateAndToast(toast);
    },
    populateEditLine(i) {
      this.editRowInput = { ...this.filas[i] };
    },
    populateNewLine() {
      this.newRowInput = { ...this.newRowDefault };
    },
    updateRow(row) {
      let p = this.editRowInput.name.trim();

      if (p.length > 0) {
        // checando se o nome não está em branco
        /* Atualizando Fila e Pausas com dados editados */
        this.filas.splice(row, 1, { ...this.editRowInput });
        this.pausas.splice(row, 1, p);
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: true,
          title: "Servidor EDITADO",
          message: "Servidor " + p.toUpperCase() + " editado com sucesso!",
        };
        this.validateAndToast(toast);
      } else {
        this.editRowInput = { ...this.newRowDefault };

        let toast = {
          isValidated: false,
          title: "SERVIDOR NÃO EDITADO",
          message:
            "Servidor " +
            p.toUpperCase() +
            " não foi modificado. Não é possível atualizar um Servidor apagando seu nome ou deixando apenas espaços em branco. A operação foi cancelada.",
        };
        this.validateAndToast(toast);
      }
    },
    cancelEdit(row) {
      this.editRowInput = { ...this.newRowDefault };
      let p = this.filas[row].name;
      let toast = {
        isValidated: false,
        title: "SERVIDOR NÃO EDITADO",
        message:
          "Servidor " +
          p.toUpperCase() +
          " não foi modificado. A edição foi cancelada pelo usuário.",
      };
      this.validateAndToast(toast);
    },
  },
  created() {
    //insere a nova linha no cache do navegador (em tempo de desenvolvimento)
    this.newRowDefault = { ...defaultRow };
    // this.newRowInput = Object.assign({},this.newRowDefault);
    // this.editRowInput = Object.assign({},this.newRowDefault);
    localStorage.setItem(
      "__pedro-dev",
      JSON.stringify(this.items.slice(1, this.items.length))
    );
    // this.editRowInput = this.filas;
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
  watch: { //a ser implementado
    // filas(newValue){
    //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
    // }
    isLoading(newValue, oldValue) {
      console.log(
        "WATCHING PROP 'isLoading'...\n",
        "\tisLoading OLD:\t",
        oldValue,
        "\n\tisLoading NEW:\t",
        newValue
      );
      this.busy = newValue;
      console.log("Items PROP:\n", this.items);
    },
    items(newValue, oldValue) {
      console.log(
        "WATCHING PROP 'items'...\n",
        "\titems OLD:\t",
        oldValue,
        "\n\titems NEW:\t",
        newValue
      );
      this.filas = newValue.slice(1, newValue.length);
      this.names = newValue[0].names;
    },
  },
  mounted() {
    // this.filas = JSON.parse(localStorage.getItem('__pedro-dev'));
  },
};
</script>

<style>
span.fal {
  pointer-events: none;
}

.add-btn > i,
.edit-btn > i {
  padding: 0px !important;
  border-width: 0px 1px !important;
  display: flex;
  align-content: center;
  justify-content: center;
}

.add-btn,
.edit-btn {
  display: table-cell;
  align-items: center !important;
  border-width: 1px 1px !important;
  border-color: #adadad;
  width: 42px;
  height: 42px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#new_row_limite,
#new_row_alerta {
  /*implementado no futuro modal*/
  width: 100%;
  padding: 0.2ch;
  text-align: center;
}

.name-head-container,
.nome-head-container,
.email-head-container,
.perfil-head-container,
.limite-head-container,
.icone-head-container,
.status-head-container {
  /*estilização de todas as colunas*/
  display: flex;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.name-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 2ch;
  text-align: left;
  vertical-align: middle !important;
}

.nome-head,
.email-head,
.perfil-head,
.limite-head,
.icone-head,
.status-head {
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  width: 100%;
  padding-left: 0px;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center !important;
}

.name-body-container,
.nome-body-container,
.email-body-container,
.perfil-body-container,
.limite-body-container,
.icone-body-container,
.status-body-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.b-table-sticky-header > .table.b-table > thead > tr > th {
  /*estilização padrão dos headers*/
  position: sticky I !important;
  top: -1px !important;
  z-index: 2 !important;
}
/* estilização do íconezinho de sort */
/*--------------------------![COMEÇO]!------------------------------------------------------*/

.tabela-pausas
  > .table.b-table.table-sm
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
.tabela-pausas
  > .table.b-table.table-sm
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="none"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="ascending"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-pausas > .table.b-table > thead > tr > [aria-sort="descending"],
.tabela-pausas > .table.b-table > tfoot > tr > [aria-sort="descending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
/*--------------------------![FIM]!------------------------------------------------------*/

.tabela-pausas > .table.b-table > thead > tr > .table-b-table-default {
  /*Header*/
  background-color: #0d6d9d !important;
  color: #fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}
/*------------------------------Edição individual de cada coluna por sequência em que aparecem------------------------------------*/

.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  width: 3.5%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],
[aria-colindex="6"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="7"],
[aria-colindex="6"] {
  width: 3%;
  text-align: center;
  justify-content: center;
  display: table-cell;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],
[aria-colindex="4"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="5"],
[aria-colindex="4"] {
  width: 6%;
  text-align: center;
  min-width: 100px;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="3"],
[aria-colindex="2"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="3"],
[aria-colindex="2"] {
  width: 6%;
  text-align: center;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"] {
  width: 10%;
}
.tabela-pausas > .table.b-table > tbody > tr > [aria-colindex="1"],
.tabela-pausas > .table.b-table > thead > tr > [aria-colindex="1"] {
  text-align: left !important;
}

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"],
#editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
  display: none !important;
}
</style>
