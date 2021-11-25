<template>
    <div class="dropdown-menu dropdown-menu-animated dropdown-lg w-app-drop-relatorios">
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
        
        <div class="dropdown-item d-flex itens">
            <router-link to="/relatorios-gravacoes" class="mr-auto" >
                <i class="fal fa-file-audio iconDAM"></i>
                <span data-i18n="drpdwn.settings"> Relatório de Gravações</span>
            </router-link>
        </div>
        <div class="dropdown-item d-flex itens" v-if="user.type === 'user'" >
            <router-link to="/relatorios-faturamento" class="mr-auto">
                <i class="fal fa-file-invoice-dollar iconDAM"></i>
                <span data-i18n="drpdwn.settings"> Relatório de Faturamento</span>
            </router-link>
        </div>
        <div class="dropdown-item d-flex itens" v-if="user.type === 'user'">
            <router-link to="/relatorios-chamadas" class="mr-auto" >
                <i class="fal fa-file-spreadsheet iconDAM"></i>
                <span data-i18n="drpdwn.settings"> Relatório de Chamadas</span>
            </router-link>
        </div>
        
        
        
    </div>
  
</template>

<script>
import {mapState} from "vuex"
export default {
    name:"DropdownRelatorios",
    
    data(){
        return{
            userType:''
        }
    },
    computed: mapState(['user']),
    mounted(){
        this.userType = this.user.types
    }
}
</script>

<style>
.w-app-drop-relatorios{
     right: unset !important;
 }
 .itens i{
     margin-right: 10px;
 }
 .iconDAM{
     width: 20px;
 }
</style>