<template>
  <!-- <div> -->
    <b-dropdown class="header-icon d-flex align-items-center justify-content-center ml-2" :html="icon" no-caret variant="link">
    <!-- <a href="#" data-toggle="dropdown" title="Mailing" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded"> -->
      <!-- <i class="fal fa-list-alt"/> -->
    <!-- </a> -->
      <!-- <b-dd-divider/> -->
      <b-container fluid>
        <b-col cols='12'>
          <b-row v-if="userAccessPages[0].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'ListaMailing' }" html='<i class="fal fa-list-ol iconDAM"/>'>
                <i class="fal fa-list-ol iconDAM"/><span class="iconDAM" >Mailing</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[0].add">
              <b-dd-item  :to="{ name: 'RegistroMailing' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>

          <b-row v-if="userAccessPages[1].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'Blacklist' }" html='<i class="fal fa-align-slash iconDAM"/>'>
                <i class="fal fa-list-ol iconDAM"/><span class="iconDAM">Blacklist</span>
              </b-dd-item>
            </b-col>
            <b-col cols="2" v-if="userAccessPages[1].add">
              <b-dd-item  :to="{ name: 'RegistroBlacklist' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col>
          </b-row>
        </b-col>
      </b-container>

      <!-- <dropdown-action-menu @ddActionClicked="actionClicked" :expandedAct="isExpanded"/> -->
    </b-dropdown>
  <!-- </div> -->
</template>

<script>
// import DropdownActionMenu from "./DropdownActionMenu.vue";
import {dropdownActionPages} from "../../config/global";

export default {
  // components: { DropdownActionMenu },
  name: "ActionMenu",
  props: {
    expanded:{type: Boolean, default: false}
  },
  watch:{
    expanded(newValue, oldValue){
      console.log("WATCHING PROP 'expanded'...\n",oldValue)
      this.isExpanded = newValue;
    }
  },
  methods: {
    actionClicked(){
      this.$emit('collapseDDAction');
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
      isExpanded:this.expanded,
      icon:'<i class="fal fa-list-alt"/>'
    }
  }
};
</script>

<style>
.iconDAM{
  text-decoration: none !important;
}
</style>