<template>
  <div>
    <a href="#" data-toggle="dropdown" title="Mailing" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
      <i class="fal fa-list-alt"></i>
    </a>

    <dropdown-action-menu @ddActionClicked="actionClicked" :expandedAct="isExpanded"/>
  </div>
</template>

<script>
import DropdownActionMenu from "./DropdownActionMenu.vue";
export default {
  components: { DropdownActionMenu },
  name: "ActionMenu",
  props: {
    expanded:{type: Boolean, default: false}
  },
  watch:{
    expanded(newValue, oldValue){
      console.log("WATCHING PROP 'expanded'...\n",oldValue)
      this.isExpanded = newValue;
    }
  },
  methods: {
    actionClicked(){
      this.$emit('collapseDDAction');
    }
  },
  data(){
    return{
      isExpanded:this.expanded,
    }
  }
};
</script>

<style>
</style>