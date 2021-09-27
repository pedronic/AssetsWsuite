<template>
  <div
    class="
      dropdown-menu dropdown-menu-animated dropdown-lg
      w-app-drop-relatorios
    "
  >
    <!-- <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
        <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
              <span class="mr-2">
                <img src="img/demo/avatars/avatar-admin.png" class="rounded-circle profile-image" alt="Dr. Codex Lantern">
            </span>
            <div class="info-card-text">
                <div class="fs-lg text-truncate text-truncate-lg">Dr. Codex Lantern</div>
                <span class="text-truncate text-truncate-md opacity-80">drlantern@gotbootstrap.com</span>
            </div> 
            <h3>Edição Rapida</h3>
        </div>
        
    </div> -->
    <div class="dropdown-divider m-0"></div>
    <div class="dropdown-item d-flex itens">
      <router-link :to="{ name: 'ListaMailing' }">
        <a class="mr-auto" href="#">
          <i class="fal fa-list-ol"></i>
          <span data-i18n="drpdwn.settings"> Mailing</span>
        </a>
      </router-link>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroMailing' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
    <div class="dropdown-item d-flex itens">
      <router-link  to="#" class="mr-auto" >
      <i class="fal fa-phone-slash"></i>
      <span data-i18n="drpdwn.settings">Blacklist Phone</span>
    </router-link >
    </div>
    <div class="dropdown-item d-flex itens">
      <router-link  to="#" class="mr-auto" >
        <i class="fal fa-align-slash"></i>
        <span data-i18n="drpdwn.settings">Blacklist Mailing</span>
      </router-link >
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