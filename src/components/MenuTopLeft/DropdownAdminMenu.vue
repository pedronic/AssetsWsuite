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

      
    <router-link v-if="userAccessPages[0].browser" :to="{ name: 'ListaUsuarios' }" class="mr-auto">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-friends iconDAM"></i>
        <span data-i18n="drpdwn.settings">Usuários</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[0].add" :to="{ name: 'RegistroUsuarios' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[1].browser" to="/lista-de-perfil">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-briefcase iconDAM"></i>
        <span data-i18n="drpdwn.settings">Perfil de Usuários</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[1].add" :to="{name:'Perfil', params:{nome:'', userData: defaultUserData.data, pages: defaultAccessPages}}">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[2].browser" :to="{ name: 'ListaAgentes' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-headset iconDAM"></i>
        <span data-i18n="drpdwn.settings">Agentes</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[2].add" :to="{ name: 'RegistroAgentes' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

      
    <router-link v-if="userAccessPages[3].browser" to="/pausas">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-alarm-exclamation iconDAM"></i>
        <span data-i18n="drpdwn.settings">Pausas</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[3].add && userAccessPages[3].edit" to='/grupo-de-pausas'>
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[4].browser" :to="{ name: 'ListaRobos' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-user-robot iconDAM"></i>
        <span data-i18n="drpdwn.settings">Robôs</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[4].add" :to="{ name: 'RegistroRobos' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[5].browser" :to="{ name: 'ListaOperadoras' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-sim-card iconDAM"></i>
        <span data-i18n="drpdwn.settings">Operadoras</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[5].add" :to="{ name: 'RegistroOperadoras', params:{opID: -1} }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[6].browser" :to="{ name: ''}">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-route iconDAM"></i>
        <span data-i18n="drpdwn.settings">Rotas</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[6].add" :to="{ name: 'RegistroRotas'}">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[7].browser" :to="{ name: ''}">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-road iconDAM"></i>
        <span data-i18n="drpdwn.settings">Filas</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[7].add" :to="{name:'FilasCadastro', params: {qID:-1}}">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

     <router-link v-if="userAccessPages[8].browser" :to="{ name: 'ListaFinalizacoes'}">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-road iconDAM"></i>
        <span data-i18n="drpdwn.settings">Finalizações</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[8].add" :to="{ name: 'RegistroFinalizacoes' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>
      
    <router-link v-if="userAccessPages[9].browser" :to="{ name: 'ListaServidores' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-server iconDAM"></i>
        <span data-i18n="drpdwn.settings">Servidores</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[9].add" :to="{ name: 'RegistroServidores' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>

    <router-link v-if="userAccessPages[10].browser" :to="{ name: 'ListaScripts' }">
      <div class="dropdown-item d-flex itens">
        <i class="fal fa-server iconDAM"></i>
        <span data-i18n="drpdwn.settings">Scripts</span>
        <a class="ml-auto" href="#">
          <router-link v-if="userAccessPages[10].add" :to="{ name: 'RegistroScripts' }">
            <i class="fal fa-plus-circle"></i>
          </router-link>
        </a>
      </div>
    </router-link>
  </div>
</template>

<script>
// import {baseApiUrl, defaultNewUserProfile} from "../../config/global";
// import axios from "axios";

const dropdownAdminPages = [1,2,3,4,5,6,7,8,9,10,11];

export default {
  name: "DropdownAdminMenu",
  props:{
    accessPages:Array
  },
  methods:{
    setDefaultUser(){
      // console.log("Default New User Profile:\n",defaultNewUserProfile)
      // this.defaultUserData = [{...defaultNewUserProfile}];
      console.log("Default User Data:\n",this.defaultUserData);
    },
    getPages(){
      // let pp = await axios.get(baseApiUrl+"/pages");
      // this.defaultAccessPages = [...pp.data.data];
      // console.clear()
      this.defaultAccessPages = JSON.parse(localStorage.getItem('__userAccessPages'));
      console.log("Default Access Pages from <DropdownAdminMenu/>:\n",this.defaultAccessPages);
      for(let i in dropdownAdminPages){
        this.userAccessPages.push({...this.defaultAccessPages[dropdownAdminPages[i]-1]});
      }
      console.log("User Access Pages from <DropdownAdminMenu/>:\n",this.userAccessPages);
    },
  },
  data(){
    return {
      defaultUserData:[],
      defaultAccessPages:[],
      userAccessPages:[],
      usuarios:false,
    }
  },
  created(){
    // this.setDefaultUser();
    this.getPages();
    
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