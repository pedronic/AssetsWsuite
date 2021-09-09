<template>
  <div>
    <a href="#" data-toggle="dropdown" title="Mailing" class="header-icon d-flex align-items-center justify-content-center ml-2" >
      <i class="fal fa-list-alt"></i>
    </a>

    <dropdown-action-menu />
  </div>
</template>

<script>
import DropdownActionMenu from "./DropdownActionMenu.vue";
export default {
  components: { DropdownActionMenu },
  name: "ActionMenu",
};
</script>

<style>
</style>