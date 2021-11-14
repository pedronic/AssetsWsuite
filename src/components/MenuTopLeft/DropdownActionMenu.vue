<template>
  <div
    class="
      dropdown-menu dropdown-menu-animated dropdown-lg
      w-app-drop-relatorios
    "
  >
    <div class="dropdown-divider m-0"></div>
      <router-link v-if="userAccessPages[0].browser" :to="{ name: 'ListaMailing' }">
    <div class="dropdown-item d-flex itens">
          <i class="fal fa-list-ol iconDAM"></i>
          <span data-i18n="drpdwn.settings"> Mailing</span>
      <a class="ml-auto"><router-link v-if="userAccessPages[0].add" :to="{ name: 'RegistroMailing' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
      <router-link v-if="userAccessPages[1].browser" :to="{ name: 'Blacklist' }">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-align-slash iconDAM"></i>
        <span data-i18n="drpdwn.settings">Blacklist</span>
      <a class="ml-auto"><router-link v-if="userAccessPages[1].add" :to="{ name: 'RegistroBlacklist' }"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
    
  </div>
</template>

<script>
import {dropdownActionPages} from "../../config/global";

export default {
  name: "DropdownActionMenu",
  methods: {
    getPages(){
      // let pp = await axios.get(baseApiUrl+"/pages");
      // this.defaultAccessPages = [...pp.data.data];
      // console.clear()
      this.defaultAccessPages = JSON.parse(localStorage.getItem('__userAccessPages'));
      console.log("Default Access Pages from <DropdownActionMenu/>:\n",this.defaultAccessPages);
      for(let i in dropdownActionPages){
        this.userAccessPages.push({...this.defaultAccessPages[dropdownActionPages[i]-1]});
      }
      console.log("User Access Pages from <DropdownAdminMenu/>:\n",this.userAccessPages);
    },
  },
  created(){
    this.getPages();
  },
  data(){
    return{
      defaultAccessPages:[],
      userAccessPages:[],
    }
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