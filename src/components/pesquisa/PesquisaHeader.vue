<template>
<div>
    <div class="hidden-md-down d-flex" style="align-items: center;">
        <div id="back-header-button" style="align-items: center; margin-right: 5px;">
            <a href="#" data-toggle="back">
                <i class="fal fa-angle-left fa-2x"/>
            </a>
        </div>
        <b-form-input v-model="text" placeholder="Digite sua busca..."></b-form-input>
        <div id="back-header-button" style="align-items: center; margin-left: 5px;">
            <a href="#" data-toggle="forward">
                <i class="fal fa-angle-right fa-2x"/>
            </a>
        </div>
        <a href="#" class="header-icon" data-toggle="popover" title="Buscar">
            <i class="fal fa-search"></i>
        </a>
    </div>
</div>
</template>

<script>
export default {
    name: "PesquisaHeader",
    data(){
        return{
            text:''
        }
    }
}
</script>

<style>

</style>