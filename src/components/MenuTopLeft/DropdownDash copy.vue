<template>
    <div class="dropdown-menu dropdown-menu-animated dropdown-lg w-app-drop-dash" :class="{'show':isExpanded}" :style="isExpanded ? 'position: absolute; top: 66px; left: 347px; will-change: top, left;':''" :x-placement="isExpanded ? 'bottom-start':''">
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
        <div class="dropdown-item d-flex itens" >
            <router-link v-if="userAccessPages[0].browser && userAccessPages[0].read" to="" class="mr-auto">
            <i class="fal fa-eye iconDAM"></i>
            <span data-i18n="drpdwn.settings"> Painel de Supervisão</span>
            </router-link>
        </div>
        <div class="dropdown-item d-flex itens">
            <router-link v-if="userAccessPages[1].browser && userAccessPages[1].read" to="/dash-analitico" class="mr-auto" >
                    <i class="fal fa-list iconDAM"></i>
            <span data-i18n="drpdwn.settings"> Dashboard Analítico</span>
            </router-link>
        </div>
                                            
    </div>
</template>

<script>
import {dropdownDashPages} from "../../config/global";

export default {
    name: "DropdownDash",
    props:{
        expandedDash:{type: Boolean, default: false}
    },
    watch:{
      expandedDash(newValue, oldValue){
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
          for(let i in dropdownDashPages){
            this.userAccessPages.push({...this.defaultAccessPages[dropdownDashPages[i]-1]});
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
            isExpanded:this.expandedDash,
        }
    }
}
</script>

<style>
.w-app-drop-dash{
     right: unset !important;
 }
 .itens i{
     margin-right: 10px;
 }
 .iconDAM{
     width: 20px;
 }
</style>