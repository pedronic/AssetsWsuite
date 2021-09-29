<template>
  <div
    class="
      dropdown-menu dropdown-menu-animated dropdown-lg
      w-app-drop-relatorios
    "
  >
    <div class="dropdown-divider m-0"></div>
    <div class="dropdown-item d-flex itens">
      <router-link :to="{ name: 'ListaMailing' }">
          <i class="fal fa-list-ol"></i>
          <span data-i18n="drpdwn.settings"> Mailing</span>
      </router-link>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroMailing' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
    <div class="dropdown-item d-flex itens">
      <router-link  :to="{ name: 'Blacklist' }">
        <i class="fal fa-align-slash"></i>
        <span data-i18n="drpdwn.settings">Blacklist</span>
      </router-link>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroBlacklist' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "DropdownActionMenu",
};
</script>

<style>
.itens i{
     margin-right: 10px;
 }
</style>