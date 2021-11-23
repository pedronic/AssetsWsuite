<template>
<div>
  <a href="#" data-toggle="dropdown" title="Relatorios" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
    <i class="fal fa-ballot"></i>
  </a>
  <dropdown-relatorios :expandedRel="isExpanded"/>
</div>
  
</template>

<script>
import DropdownRelatorios from './DropdownRelatorios.vue'

export default {
  components: { DropdownRelatorios },
    name: "RelatoriosMenu",
    props: {
      expanded:{type: Boolean, default: false}
    },
    watch:{
      expanded(newValue, oldValue){
        console.log("WATCHING PROP 'expanded'...\n",oldValue)
        this.isExpanded = newValue;
      }
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