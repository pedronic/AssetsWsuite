<template>
  
  <main id="js-page-content" class="page-content" role="main" v-if="user">

    <router-view />
  </main>
  <router-view v-else />

</template>

<script>
//import PagesSubHeader from '@/components/subheader/PagesSubHeader.vue'
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
    padding: 10px 10px !important;
  }
}


</style>