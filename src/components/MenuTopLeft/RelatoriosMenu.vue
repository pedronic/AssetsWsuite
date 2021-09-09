<template>
<div>
  <a href="#" data-toggle="dropdown" title="Relatorios" class="header-icon d-flex align-items-center justify-content-center ml-2">
    <i class="fal fa-ballot"></i>
  </a>
  <dropdown-relatorios />
</div>
  
</template>

<script>
import DropdownRelatorios from './DropdownRelatorios.vue'

export default {
  components: { DropdownRelatorios },
    name: "RelatoriosMenu"
}
</script>

<style>

</style>