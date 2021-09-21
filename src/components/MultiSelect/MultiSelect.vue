<template>
<div> 
  <div class="m-control-wrapper">
    <div id="multiselect-sample" class="control-section" style="height: 500px">

        
        <div class="control-styles" style="padding-top: 30px">
            <h4>Box Mode</h4>
            <ejs-multiselect id='sample-list2' :dataSource='sportsData' :mode='boxMode' :placeholder='waterMark'></ejs-multiselect>
        </div>
        
        
        </div>
     </div>
</div>
</template>
<style scoped>
    .m-control-wrapper {
        margin: 0 auto;
        width: 64%;
    }
</style>
<script>
import Vue from "vue";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import * as data from './dataSource.json';

Vue.use(MultiSelectPlugin);

export default Vue.extend ({
    data: function() {
        return {
            waterMark: 'Favorite Sports',
            defaultMode: 'Default',
            boxMode: 'Box',
            delimiterMode: 'Delimiter',
            sportsData: data['sportsData']
        };
    }
});
</script>