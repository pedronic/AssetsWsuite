<template>
<div>
        <a href="#" data-toggle="dropdown" title="Dash" class="header-icon d-flex align-items-center justify-content-center ml-2">
          <i class="fal fa-tachometer-alt-fast"></i>
        </a>
        <dropdown-dash />
</div>
  
</template>

<script>
import DropdownDash from './DropdownDash.vue'
export default {
  components: { DropdownDash },
    name: "DashMenu"
}
</script>

<style>

</style>