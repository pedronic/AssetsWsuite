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
    <!-- <div class="popover fade show bs-popover-right" role="tooltip" id="popover35326" style="position: absolute; will-change: top, left; top: 345px; left: 489px;" x-placement="right">
      <div class="arrow" style="top: 10px;"></div>
      <h3 class="popover-header">Popover title</h3>
      <div class="popover-body"></div>
    </div> -->
</div>
</template>

<script>
export default {
    name: "PesquisaHeader"
}
</script>

<style>

</style>