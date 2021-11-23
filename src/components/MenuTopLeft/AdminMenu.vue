<template>
  <!-- <div> -->
        <!-- <a href="#" data-toggle="dropdown" title="Administração" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
          <i class="fal fa-cogs"></i>
        </a> -->
        
        <!-- <dropdown-admin-menu :expandedAdm="isExpanded"/> -->
  <!-- </div> -->
  <b-dropdown class="header-icon d-flex align-items-center justify-content-center ml-2" :html="icon" no-caret variant="link">
    <!-- <b-dd-divider/> -->
      <b-container fluid>
        <b-col cols='12'>
          <b-row v-if="userAccessPages[0].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaUsuarios' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-user-friends iconDAM"/><span class="iconDAM" >Usuários</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[0].add">
              <b-dd-item  :to="{ name: 'RegistroUsuarios' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>
  
          <b-row v-if="userAccessPages[1].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " to="/lista-de-perfil" html='<i class="fal fa-align-slash iconDAM"/>'>
                <i class="fal fa-briefcase iconDAM"/><span class="iconDAM">Perfil de Usuários</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[1].add">
              <b-dd-item  :to="{name:'Perfil', params:{nome:'', userData: defaultUserData.data, pages: defaultAccessPages}}">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[2].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaAgentes' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-user-headset iconDAM"/><span class="iconDAM" >Agentes</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[2].add">
              <b-dd-item  :to="{ name: 'RegistroAgentes' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>
          
          <b-row v-if="userAccessPages[3].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " to="/pausas" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-alarm-exclamation iconDAM"/><span class="iconDAM" >Pausas</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[3].add && userAccessPages[3].edit">
              <b-dd-item  to='/grupo-de-pausas'>
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[4].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaRobos' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-user-robot iconDAM"/><span class="iconDAM" >Robôs</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[4].add">
              <b-dd-item  :to="{ name: 'RegistroRobos' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[5].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaOperadoras' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-sim-card iconDAM"/><span class="iconDAM" >Operadoras</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[5].add">
              <b-dd-item  :to="{ name: 'RegistroOperadoras', params:{opID: -1} }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[6].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: ''}" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-route iconDAM"/><span class="iconDAM" >Rotas</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[6].add">
              <b-dd-item  :to="{ name: 'RegistroRotas' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[7].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaFilas' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-road iconDAM"/><span class="iconDAM" >Filas</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[7].add">
              <b-dd-item  :to="{name:'FilasCadastro', params: {qID:-1}}">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[8].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaFinalizacoes' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-road iconDAM"/><span class="iconDAM" >Finalizações</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[8].add">
              <b-dd-item  :to="{ name: 'RegistroFinalizacoes' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[9].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaServidores' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-server iconDAM"/><span class="iconDAM" >Servidores</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[9].add">
              <b-dd-item  :to="{ name: 'RegistroServidores' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[10].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaScripts' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-server iconDAM"/><span class="iconDAM" >Scripts</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[10].add">
              <b-dd-item  :to="{ name: 'RegistroScripts' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>
        </b-col>
      </b-container>
  </b-dropdown>
      
</template>

<script>
// import DropdownAdminMenu from './DropdownAdminMenu.vue'
import {defaultNewUserProfile, dropdownAdminPages} from "../../config/global";

export default {
  // components: { DropdownAdminMenu },
  name: "AdminMenu",
  props: {
    expanded:{type: Boolean, default: false}
  },
  watch:{
    expanded(newValue, oldValue){
      console.log("WATCHING PROP 'expanded'...\n",oldValue,"\tnewValue:\t",newValue);
      this.isExpanded = newValue;
    }
  },
  methods:{
    setDefaultUser(){
      // console.log("Default New User Profile:\n",defaultNewUserProfile)
      this.defaultUserData = [{...defaultNewUserProfile}];
      console.log("Default User Data:\n",this.defaultUserData);
    },
    getPages(){
      // let pp = await axios.get(baseApiUrl+"/pages");
      // this.defaultAccessPages = [...pp.data.data];
      // console.clear()
      this.defaultAccessPages = JSON.parse(localStorage.getItem('__userAccessPages'));
      console.log("Default Access Pages from <DropdownActionMenu/>:\n",this.defaultAccessPages);
      for(let i in dropdownAdminPages){
        this.userAccessPages.push({...this.defaultAccessPages[dropdownAdminPages[i]-1]});
      }
      console.log("User Access Pages from <DropdownAdminMenu/>:\n",this.userAccessPages);
    },
  },
  created(){
    this.getPages();
  },
  data(){
    return{
      defaultUserData:[],
      defaultAccessPages:[],
      userAccessPages:[],
      isExpanded:this.expanded,
      icon:'<i class="fal fa-cogs"/>'
    }
  }

}
</script>

<style>

</style>