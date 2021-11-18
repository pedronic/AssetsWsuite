<template>
  <div
    class="
      dropdown-menu dropdown-menu-animated dropdown-lg
      w-app-drop-relatorios
    "
    :class="{'show':isExpanded}" :style="isExpanded ? 'position: absolute; top: 66px; left: 347px; will-change: top, left;':''" :x-placement="isExpanded ? 'bottom-start':''"
  >
    <div class="dropdown-divider m-0"></div>
      <router-link v-if="userAccessPages[0].browser" :to="{ name: 'ListaMailing' }" @click.native.prevent="tellToColapse">
    <div class="dropdown-item d-flex itens">
          <i class="fal fa-list-ol iconDAM"></i>
          <span data-i18n="drpdwn.settings"> Mailing</span>
      <a class="ml-auto"><router-link v-if="userAccessPages[0].browser" :to="{ name: 'RegistroMailing' }" @click.native.prevent="tellToColapse"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
      <router-link v-if="userAccessPages[1].browser" :to="{ name: 'Blacklist' }" @click.native.prevent="tellToColapse">
    <div class="dropdown-item d-flex itens">
        <i class="fal fa-align-slash iconDAM"></i>
        <span data-i18n="drpdwn.settings">Blacklist</span>
      <a class="ml-auto"><router-link v-if="userAccessPages[1].add" :to="{ name: 'RegistroBlacklist' }" @click.native.prevent="tellToColapse"><i class="fal fa-plus-circle"></i></router-link></a>
    </div>
      </router-link>
    
  </div>
</template>

<script>
import {dropdownActionPages} from "../../config/global";

export default {
  name: "DropdownActionMenu",
  props:{
    expandedAct:{type: Boolean, default: false}
  },
  watch:{
    expandedAct(newValue, oldValue){
      console.log("WATCHING PROP 'expanded'...\n",oldValue)
      this.isExpanded = newValue;
    }
  },
  methods: {
    tellToColapse(){
      console.log("Tell to Collapse\n")
      this.$emit('ddActionClicked');

    },
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
      isExpanded:this.expandedAct,
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