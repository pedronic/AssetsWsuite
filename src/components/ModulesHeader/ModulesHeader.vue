<template>
     <div>
        <a href="#" data-toggle="dropdown" title="Edição Rapida" class="header-icon d-flex align-items-center justify-content-center ml-2">
            <i class="fal fa-cube"></i>
        </a>
        <dropdow-edit-header />                           
    </div>
</template>

<script>
import DropdowEditHeader from '../../components/editHeader/DropdowEditHeader.vue';
export default {
    name:"ModulesHeader",
    components:{
        DropdowEditHeader
    }
}
</script>

