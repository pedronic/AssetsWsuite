<template>
  <div class="dropdown-menu dropdown-menu-animated dropdown-lg w-app-drop-admin">
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
      <router-link :to="{ name: 'ListaUsuarios' }">
    <div class="dropdown-item d-flex itens">
          <i class="fal fa-user-friends"></i>
          <span data-i18n="drpdwn.settings"> Usuários</span>
          <a class="ml-auto" href="#">
        <router-link :to="{ name: 'RegistroUsuarios' }">
          <i class="fal fa-plus-circle"></i>
        </router-link>
          </a>
    </div>
      </router-link>
    <div class="dropdown-item d-flex itens">
      <router-link to="/lista-de-perfil" class="mr-auto">
        <i class="fal fa-briefcase"></i>
        <span data-i18n="drpdwn.settings"> Perfil de Usuários</span>
      </router-link>
      <router-link to="/perfil-usuario" class="ml-auto"><i class="fal fa-plus-circle"></i></router-link>
    </div>
      <router-link :to="{ name: 'ListaAgentes' }">
    <div class="dropdown-item d-flex itens">
          <i class="fal fa-user-headset"></i>
          <span data-i18n="drpdwn.settings"> Agentes</span>
      <a class="ml-auto" href="#">
        <router-link :to="{ name: 'RegistroAgentes' }">
          <i class="fal fa-plus-circle"></i>
        </router-link>
      </a>
    </div>
      </router-link>
    <div class="dropdown-item d-flex itens">
      <router-link to="/pausas" class="mr-auto">
        <i class="fal fa-alarm-exclamation"></i>
        <span data-i18n="drpdwn.settings"> Pausas</span>
      </router-link>
      <router-link to='/grupo-de-pausas' class="ml-auto"><i class="fal fa-plus-circle"></i></router-link>
    </div>
      <router-link :to="{ name: 'ListaRobos' }">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-robot"></i>
        <span data-i18n="drpdwn.settings"> Robos</span>

      <a class="ml-auto" href="#"><router-link :to="{ name: 'RegistroRobos' }"><i class="fal fa-plus-circle"></i></router-link></a>

    </div>
      </router-link>
      <router-link :to="{ name: 'ListaOperadoras' }">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-sim-card"></i>
        <span data-i18n="drpdwn.settings"> Operadoras</span>
      <a class="ml-auto" href="#"><router-link :to="{ name: 'RegistroOperadoras' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-route"></i>
        <span data-i18n="drpdwn.settings"> Rotas</span>
      <a class="ml-auto" href="#"><i class="fal fa-plus-circle"></i></a>
    </div>
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-road"></i>
        <span data-i18n="drpdwn.settings"> Filas</span>
      <router-link to='/cadastrar-filas' class="ml-auto"><i class="fal fa-plus-circle"></i></router-link>
    </div>
      <router-link :to="{ name: 'ListaServidores' }">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-server"></i>
        <span data-i18n="drpdwn.settings"> Servidores</span>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroServidores' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
  </div>
</template>

<script>
export default {
  name: "DropdownAdminMenu",
};
</script>

<style>
.w-app-drop-admin {
  right: unset !important;
}

.itens i {
  margin-right: 10px;
}
</style>