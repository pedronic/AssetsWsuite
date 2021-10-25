<template>
  
  <main id="js-page-content" class="page-content" role="main" >

    <router-view />
  </main>
  <!-- <router-view v-else /> -->

</template>

<script>
// import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue'
import { mapState } from "vuex"
export default {
  name: "Content",
  components:{
  },
  computed: mapState(['user'])
};
</script>

<style>
@media (min-width: 992px){
  .page-content {
    padding: 10px 14.6px 10px 10px !important;
  }
}
@media (min-width: 1200px){
  .page-content {
    padding: 10px 14.6px 10px 10px !important;
    }
}
.page-content {
  overflow: auto !important;
}


</style>