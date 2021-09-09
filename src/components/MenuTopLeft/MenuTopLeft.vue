<template>
  <div class="mr-auto d-flex w-app-icon-primary">
    <admin-menu />
    <action-menu />
    <relatorios-menu />
    <dash-menu />
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
};
</script>

<style>
.w-app-icon-primary {
  margin-left: 15px;
}
</style>