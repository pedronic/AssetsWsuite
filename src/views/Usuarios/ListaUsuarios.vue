<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-list" titulo="Lista de usuários do sistema">
      <div class="card">
        <div class="card-body"/>
      </div>
      <form class="container">
        <div class="form-group">
          <div class="row">
            <div class="col-7 col-inputs">
              <div class="input-group d-flex">

                <input
                    aria-describedby="basic-addon1"
                    aria-label="Username"
                    class="form-control"
                    placeholder=""
                    type="text"
                    v-on:input="filter = $event.target.value"
                />
              </div>
            </div>

            <div class="col-2 col-botoes">
              <button class="btn btn-info waves-effect waves-themed dow-color2"><i
                  class="fal fa-search"></i></button>
            </div>
            <div class="col-1 col-inputs mr-4">
              <div
                  class="

                                      custom-control custom-switch
                                      border border-0
                                      mt-1
                                    "
              >
                <input
                    id="customSwitch1"
                    class="custom-control-input bg-dark"
                    type="checkbox"

                />
                <label
                    class="custom-control-label"
                    for="customSwitch1"
                ></label>
              </div>

            </div>
            <div class="col-1 col-botoes">
              <router-link :to="{ name: 'RegistroUsuarios' }">
                <button class="btn btn-success waves-effect waves-themed dow-color" name="pesquisa-faturamento"
                        type="submit"><i class="fal fa-plus"></i></button>
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </PagesSubHeader>

    <div class="panel ">
      <div class="panel-container show">
        <div class="panel-content">
           <b-table striped hover :items="items" :fields="fields" class="table-sm table-hover table-striped w-100 dt-responsive dtr-inline">
            <template #cell(anable)>
              <b-form-checkbox v-model="checked" name="check-button" class="ml-1" switch disabled>
              </b-form-checkbox>
            </template>
            <template #cell(ação)>
              <router-link :to="{ name: 'RegistroUsuarios' }">
                <i class="fal fa-pencil d-inline"></i>
              </router-link>
              <i class="fal fa-trash-alt d-inline ml-2"></i>
            </template>
          </b-table>
          
              <div class="panel-footer ml-3 mt-3">
                  <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"  />
              </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

//import TabelaUsuariosCadastrados from '@/components/DataTables/TabelaUsuariosCadastrados.vue'
import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue'
import { mapState } from "vuex";
import axios from "axios";
import {baseApiUrl, showError} from "@/config/global";
//import PagesSubHeader from '../components/subheader/PagesSubHeader.vue'
//import subHeaderCommun from '../components/subheader/PagesSubHeader.vue'
//import SubHeaderCommun from '../components/subheader/subHeaderCommun.vue';
//import app from '@/assets/js/app';

export default {
  components: {
    PagesSubHeader,
    //TabelaUsuariosCadastrados,
  },
  data() {
    return {
      filter: "",
      msg: "",
      page: 1,
      count:0,
      limit:0,
      checked:1,
      fields: [
          {
            key: 'username',
            label: 'Usuário',
            sortable: true
          },
          {
            key: 'name',
            label: 'Nome',
            sortable: true
          },
          {
            key: 'email',
            label: 'Email',
            sortable: true
          },
          {
            key: 'perfilName',
            label: 'Perfil',
            sortable: true
          },
          {
            key: 'anable',
            label: 'Status',
            sortable: false,
            thStyle: 'width: 5%;'
          },
          {
            key: 'Ação',
            label: 'Ação',
            sortable: false,
            thStyle: 'width: 4%;'
          },
      ],
      items: [ { 
              Uusuario: 'Exemplo', 
              name: '',
              email: '',
              perfil: '',
        },
        { 
              Usuário: 'Outro Exemplo', 
              Nome: '',
              Email: '',
              Perfil: '',
        },
      ],
    };
  },
  methods: {
    
      loadDados(){
        
        let urlString = `${baseApiUrl}/users?page=${this.page}` 
         axios.get(urlString)
          .then(rt =>{ 
            this.items = rt.data.data
            this.count = rt.data.count;
            this.limit = rt.data.limit;
            }).catch(showError)
            console.log ('load dados' , urlString)
        
      },
  },
  created() {
    this.loadDados();
  },
  mounted() {
    this.loadDados();
  },
  computed: mapState(["user"]),
  watch: {
        page() {
            this.loadDados()
            console.log(this.page);
        }
    },
};
</script>

<style>
.dow-color2 {
background-color: rgb(13, 109, 157) !important;
}

.col-botoes {
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.col-inputs {
  padding-left: 3px !important;
  padding-right: 10px !important;
}

.panel-content {
  overflow: auto;
}

.panel .panel-container .panel-content {
  padding: 0;
}

.card-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.card {
  box-shadow: none;
  border: none;
}

.dow-color {
  background-color: #1a7f37 !important;
}
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