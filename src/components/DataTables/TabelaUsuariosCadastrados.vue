<template>
  <div>
    <div class="row mb-2 justify-content-center">
              <div class="col-12">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-user fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Usuário"
                    />
                  </div>
              </div>
            </div>
    <b-table
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
    >
      <template #cell(status)>
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
  </div>
</template>

<script>
export default {
    name: "TableDashboard",
    data(){
        return{
            fields: [
          {
            key: 'Usuário',
            label: 'Usuário',
            sortable: true
          },
          {
            key: 'Nome',
            label: 'Nome',
            sortable: true
          },
          {
            key: 'Email',
            label: 'Email',
            sortable: true
          },
          {
            key: 'Perfil',
            label: 'Perfil',
            sortable: true
          },
          {
            key: 'Status',
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
        items: [
          { 
              Usuário: 'Exemplo', 
              Nome: '',
              Email: '',
              Perfil: '',
        },
        { 
              Usuário: 'Outro Exemplo', 
              Nome: '',
              Email: '',
              Perfil: '',
        },
        ]
        }
    }
}
</script>

<style>
.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
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