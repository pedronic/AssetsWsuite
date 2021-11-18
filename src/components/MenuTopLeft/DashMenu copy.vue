<template>
<div>
        <a href="#" data-toggle="dropdown" title="Dash" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
          <i class="fal fa-tachometer-alt-fast"></i>
        </a>
        <dropdown-dash :expandedDash="isExpanded"/>
</div>
  
</template>

<script>
import DropdownDash from './DropdownDash.vue'
export default {
  components: { DropdownDash },
    name: "DashMenu",
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