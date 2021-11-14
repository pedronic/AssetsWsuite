<template>
  <div>
        <a href="#" data-toggle="dropdown" title="Administração" class="header-icon d-flex align-items-center justify-content-center ml-2">
          <i class="fal fa-cogs"></i>
        </a>
        
        <dropdown-admin-menu />
  </div>
      
</template>

<script>
import DropdownAdminMenu from './DropdownAdminMenu.vue'
export default {
  components: { DropdownAdminMenu },
  name: "AdminMenu",
  methods:{
    
  },
  data(){
    return{
    }
  }

}
</script>

<style>

</style>