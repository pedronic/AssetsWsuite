<template>
<!-- <div> -->
  <!-- <a href="#" data-toggle="dropdown" title="Relatorios" class="header-icon d-flex align-items-center justify-content-center ml-2" :aria-expanded="isExpanded">
    <i class="fal fa-ballot"></i>
  </a>
  <dropdown-relatorios :expandedRel="isExpanded"/> -->
  <b-dropdown class="header-icon d-flex align-items-center justify-content-center ml-2" :html="icon" no-caret variant="link">
    <b-container fluid>
        <b-col cols='12'>
          <b-row v-if="userAccessPages[0].browser && userAccessPages[0].read">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " to="" >
                <i class="fal fa-file-audio iconDAM"/><span class="iconDAM" >Relatório de Gravações</span>
              </b-dd-item>
            </b-col>
            <!-- <b-col cols="2" v-if="userAccessPages[0].add">
              <b-dd-item  :to="{ name: 'RegistroMailing' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col> -->
          </b-row>

          <b-row v-if="userAccessPages[1].browser">
            <b-col cols='10'>      
              <b-dd-item class="dropdown-item d-flex itens " :to="{ name: 'Blacklist' }" html='<i class="fal fa-align-slash iconDAM"/>'>
                <i class="fal fa-file-invoice-dollar iconDAM"/><span class="iconDAM">Relatório de Faturamento</span>
              </b-dd-item>
            </b-col>
            <!-- <b-col cols="2" v-if="userAccessPages[1].add">
              <b-dd-item  :to="{ name: 'RegistroBlacklist' }">
                <i class="fal fa-plus-circle"/>
              </b-dd-item>
            </b-col> -->
          </b-row>
        </b-col>
      </b-container>
  </b-dropdown>
<!-- </div> -->
  
</template>

<script>
// import DropdownRelatorios from './DropdownRelatorios.vue'
import {dropdownRelatoriosPages} from "../../config/global";

export default {
  // components: { DropdownRelatorios },
    name: "RelatoriosMenu",
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
      getPages(){
        // let pp = await axios.get(baseApiUrl+"/pages");
        // this.defaultAccessPages = [...pp.data.data];
        // console.clear()
        this.defaultAccessPages = JSON.parse(localStorage.getItem('__userAccessPages'));
        console.log("Default Access Pages from <DropdownActionMenu/>:\n",this.defaultAccessPages);
        for(let i in dropdownRelatoriosPages){
          this.userAccessPages.push({...this.defaultAccessPages[dropdownRelatoriosPages[i]-1]});
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
        icon:'<i class="fal fa-ballot"/>'
      }
    }
}
</script>

<style>

</style>