<template>
  <div class="dropdown-menu dropdown-menu-animated dropdown-lg w-app-drop-admin"  v-if="user.type === 'admin'">
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

      
    <router-link :to="{ name: 'ListaUsuarios' }" class="mr-auto">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-friends iconDAM"></i>
        <span data-i18n="drpdwn.settings">Usuários</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: 'RegistroUsuarios' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link to="/lista-de-perfil">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-briefcase iconDAM"></i>
        <span data-i18n="drpdwn.settings">Perfil de Usuários</span>
        <a class="ml-auto" href="#">
          <router-link :to="{path:'/perfil-usuario', params:{nome:''}}">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link :to="{ name: 'ListaAgentes' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-headset iconDAM"></i>
        <span data-i18n="drpdwn.settings">Agentes</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: 'RegistroAgentes' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

      
    <router-link to="/pausas">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-alarm-exclamation iconDAM"></i>
        <span data-i18n="drpdwn.settings">Pausas</span>
        <a class="ml-auto" href="#">
          <router-link to='/grupo-de-pausas'>
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link :to="{ name: 'ListaRobos' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-robot iconDAM"></i>
        <span data-i18n="drpdwn.settings">Robôs</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: 'RegistroRobos' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link :to="{ name: 'ListaOperadoras' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-sim-card iconDAM"></i>
        <span data-i18n="drpdwn.settings">Operadoras</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: 'RegistroOperadoras' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link :to="{ name: ''}">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-route iconDAM"></i>
        <span data-i18n="drpdwn.settings">Rotas</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: ''}">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link :to="{ name: ''}">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-road iconDAM"></i>
        <span data-i18n="drpdwn.settings">Filas</span>
        <a class="ml-auto" href="#">
          <router-link to='/cadastrar-filas'>
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>
      
    <router-link :to="{ name: 'ListaServidores' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-server iconDAM"></i>
        <span data-i18n="drpdwn.settings">Servidores</span>
        <a class="ml-auto" href="#">
          <router-link :to="{ name: 'RegistroServidores' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "DropdownAdminMenu",
    
    data(){
        return{
            userType:''
        }
    },
    computed: mapState(['user']),
    mounted(){
        this.userType = this.user.types
    }
};
</script>

<style>
.w-app-drop-admin {
  right: unset !important;
}
.iconDAM{
  width: 20px;
}
.itens i {
  margin-right: 10px;
}
</style>