<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 col-inputs">
                <h1 class="subheader-title">
                    <i class='subheader-icon' :class="icon"></i> {{ titulo }} <sup class='badge fw-500' :class="corMarcador">{{ TextMarcador }}</sup>
                    <small>
                        {{ msgSmall }}
                    </small>
                </h1>
            </div>
            <div class="col-8">
                 <slot></slot>
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    name: 'subHeaderCommun',
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

</style>