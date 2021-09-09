<template>
  <div class="subheader">
      <h1 class="subheader-title">
        <i class='subheader-icon' :class="icon"></i> {{ titulo }} <sup class='badge fw-500' :class="corMarcador">{{ TextMarcador }}</sup>
          <small>
            {{ msgSmall }}
          </small>
      </h1>
      <div class="subheader-block d-lg-flex align-items-center">
          <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    name: 'PagesSubHeader',
    props:{
      titulo: String,
      icon: String,
      msgSmall: String,
      TextMarcador: String,
      corMarcador:String,
    }

}
</script>

<style>
.subheader:not(:empty) {
    margin-bottom: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>