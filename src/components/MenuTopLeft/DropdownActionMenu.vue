<template>
  <div
    class="
      dropdown-menu dropdown-menu-animated dropdown-lg
      w-app-drop-relatorios
    "
    v-if="user.type ==='admin'"
  >
    <div class="dropdown-divider m-0"></div>
      <router-link :to="{ name: 'ListaMailing' }">
    <div class="dropdown-item d-flex itens">
          <i class="fal fa-list-ol iconDAM"></i>
          <span data-i18n="drpdwn.settings"> Mailing</span>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroMailing' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
      <router-link  :to="{ name: 'Blacklist' }">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-align-slash iconDAM"></i>
        <span data-i18n="drpdwn.settings">Blacklist</span>
      <a class="ml-auto"><router-link :to="{ name: 'RegistroBlacklist' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
    
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "DropdownActionMenu",
  data(){
        return{
            userType:''
        }
    },
    computed: mapState(['user']),
    mounted(){
        
    }

};
</script>

<style>
.itens i{
     margin-right: 10px;
 }
.iconDAM{
  width: 20px;
}
</style>