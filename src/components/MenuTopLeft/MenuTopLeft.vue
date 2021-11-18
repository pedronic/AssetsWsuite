<template>
  <div class="mr-auto d-flex w-app-icon-primary">
    <!-- <admin-menu id="admin-menu" @click.native.prevent="adminClicked" :class="{'show': adminClass}" :expanded="adminClass"/>
    <action-menu id="action-menu" @click.native.prevent="actionClicked" :class="{'show': actionClass}" :expanded="actionClass"/>
    <relatorios-menu id="relatorios-menu" @click.native.prevent="relatoriosClicked" :class="{'show': relatoriosClass}" :expanded="relatoriosClass"/>
    <dash-menu id="dash-menu" @click.native.prevent="dashClicked" :class="{'show': dashClass}" :expanded="dashClass"/> -->
    <admin-menu id="admin-menu" :class="{'show': adminClass}" :expanded="adminClass"/>
    <action-menu id="action-menu" :class="{'show': actionClass}" :expanded="actionClass"/>
    <relatorios-menu id="relatorios-menu" :class="{'show': relatoriosClass}" :expanded="relatoriosClass"/>
    <dash-menu id="dash-menu" :class="{'show': dashClass}" :expanded="dashClass"/>
  </div>
</template>

<script>
import ActionMenu from "./ActionMenu.vue";
import AdminMenu from "./AdminMenu.vue";
import DashMenu from "./DashMenu.vue";
import RelatoriosMenu from "./RelatoriosMenu.vue";
export default {
  components: { AdminMenu, RelatoriosMenu, DashMenu, ActionMenu },
  nome: "MenuTopLeft",
  methods: {
    adminClicked(){
      console.log("\tactionClicked!!!\n")
      this.adminClass = !this.adminClass;
    },
    actionClicked(){
      console.log("\tactionClicked!!!\n")
      this.actionClass = !this.actionClass;
    },
    relatoriosClicked(){
      console.log("\tactionClicked!!!\n")
      this.relatoriosClass = !this.relatoriosClass;
    },
    dashClicked(){
      console.log("\tactionClicked!!!\n")
      this.dashClass = !this.dashClass;
    },

  },
  watch: {
    $route(){
      this.actionClass=false;
      this.adminClass=false;
      this.relatoriosClass=false;
      this.dashClass=false;
    }
  },
  mounted: {

  },
  data(){
    return {
      actionClass:null,
      adminClass:null,
      relatoriosClass:null,
      dashClass:null
    }
  }
};
</script>

<style>
.w-app-icon-primary {
  margin-left: 15px;
}
</style>