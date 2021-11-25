<template>
  
<div class="dropdown-menu dropdown-menu-animated dropdown-lg">
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
                                    
                                    <a href="#" class="dropdown-item w-app-edit-fast" data-action="app-reset">
                                        <i class="fal fa-rabbit-fast"></i>
                                        <span data-i18n="drpdwn.settings"> Em Construção</span>
                                    </a>
                                                                        
                                </div>
</template>

<script>
export default {
    name:"DropdowEditHeader"

}
</script>

<style>
.w-app-edit-fast{
    font-size: 21px;
}
.w-app-edit-fast i {
    margin-right: 10px;
}
.w-app-edit-fast span{
    font-size: 14px;
}
</style>