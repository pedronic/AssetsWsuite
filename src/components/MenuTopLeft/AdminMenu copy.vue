<template>
  <div>
        <a href="#" data-toggle="dropdown" title="Administração" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
          <i class="fal fa-cogs"></i>
        </a>
        
        <dropdown-admin-menu :expandedAdm="isExpanded"/>
  </div>
      
</template>

<script>
import DropdownAdminMenu from './DropdownAdminMenu.vue'
export default {
  components: { DropdownAdminMenu },
  name: "AdminMenu",
  props: {
    expanded:{type: Boolean, default: false}
  },
  watch:{
    expanded(newValue, oldValue){
      console.log("WATCHING PROP 'expanded'...\n",oldValue,"\tnewValue:\t",newValue);
      this.isExpanded = newValue;
    }
  },
  methods:{
    
  },
  data(){
    return{
      isExpanded:this.expanded,
    }
  }

}
</script>

<style>

</style>