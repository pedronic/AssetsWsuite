<template>
  <div class="dropdown-menu dropdown-menu-animated dropdown-lg w-app-drop-dash">
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
      <router-link to="" class="mr-auto">
        <i class="fal fa-eye iconDAM"></i>
        <span data-i18n="drpdwn.settings"> Painel de Supervisão</span>
      </router-link>
    </div>
    <div class="dropdown-item d-flex itens">
      <router-link to="/dash-analitico" class="mr-auto">
        <i class="fal fa-list iconDAM"></i>
        <span data-i18n="drpdwn.settings"> Dashboard Analítico</span>
      </router-link>
    </div>
    <div class="dropdown-item d-flex itens">
      <router-link to="/dash-filas" class="mr-auto">
        <i class="fal fa-road iconDAM"></i>
        <span data-i18n="drpdwn.settings"> Dash Filas</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownDash",
};
</script>

<style>
.w-app-drop-dash {
  right: unset !important;
}
.itens i {
  margin-right: 10px;
}
.iconDAM {
  width: 20px;
}
</style>