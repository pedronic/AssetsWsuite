<template>
  <!-- <div> -->
    <b-dropdown class="header-icon d-flex align-items-center justify-content-center ml-2" :html="icon" no-caret variant="link">
    <!-- <a href="#" data-toggle="dropdown" title="Mailing" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded"> -->
      <!-- <i class="fal fa-list-alt"/> -->
    <!-- </a> -->
      <b-dd-divider/>
      <b-dd-item-btn class="dropdown-item d-flex itens" :to="{ name: 'ListaMailing' }" html='<i class="fal fa-list-ol iconDAM"/>'>
        <!-- <router-link  :to="{ name: 'ListaMailing' }" @click.native.prevent="tellToColapse"> -->
          <div class="dropdown-item d-flex itens">
            
            <span class="fal fa-list-ol iconDAM" data-i18n="drpdwn.settings"> Mailing</span>
            <a class="ml-auto">
              <router-link  :to="{ name: 'RegistroMailing' }" @click.native.prevent="tellToColapse">
                <i class="fal fa-plus-circle"/>
              </router-link>
            </a>
          </div>
        <!-- </router-link> -->
      </b-dd-item-btn>

      <!-- <dropdown-action-menu @ddActionClicked="actionClicked" :expandedAct="isExpanded"/> -->
    </b-dropdown>
  <!-- </div> -->
</template>

<script>
// import DropdownActionMenu from "./DropdownActionMenu.vue";
export default {
  // components: { DropdownActionMenu },
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
      icon:'<i class="fal fa-list-alt"/>'
    }
  }
};
</script>

<style>
</style>