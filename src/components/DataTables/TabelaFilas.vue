<template>
  <b-table id="tabela-de-filas" :ref="'tabela-de-filas'" class="tabela-filas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="filas" :responsive="true" :fields="fields" sticky-header selectable @row-clicked="rowSelect" :filter="filter" filter-debounce="150" :filter-included-fields="['agente']" :per-page="10">
    <template v-slot:head(selected)='data'>
      <span v-html="data.label"/>
    </template>
    <template v-slot:head(agente)='data'>
      <span>{{data.label}}</span>
    </template>
    <template v-slot:head(p0)='data'>
      <span>{{data.label}}</span>
    </template>
    <template v-slot:head(p1)='data'>
      <span>{{data.label}}</span>
    </template>
    <template v-slot:head(p2)='data'>
      <span>{{data.label}}</span>
    </template>

    <template v-slot:cell(selected)='slot'>
      <b-form-checkbox v-model="slot.value" :id="slot.item.agente + '_selected'" :value='true' :unchecked-value="false" disabled/>
    </template>
    <template v-slot:cell(agente)='slot'>
      <span :id="slot.item.agente + '_agente'">{{slot.value}}</span>
    </template>
    <template v-slot:cell(p0)='slot'>
      <b-form-checkbox v-model="slot.value" :id="slot.item.agente + '_p0'" :ref="slot.item.agente + '_p0'" :value='true' :unchecked-value="false" @change="checkLine(slot.index, 'p0', $el)"/>
    </template>
    <template v-slot:cell(p1)='slot'>
      <b-form-checkbox v-model="slot.value" :id="slot.item.agente + '_p1'" :ref="slot.item.agente + '_p1'" :value='true' :unchecked-value="false" @change="checkLine(slot.index, 'p1', $el)"/>
    </template>
    <template v-slot:cell(p2)='slot'>
      <b-form-checkbox v-model="slot.value" :id="slot.item.agente + '_p2'" :ref="slot.item.agente + '_p2'" :value='true' :unchecked-value="false" @change="checkLine(slot.index, 'p2', $el)"/>
    </template>
  </b-table>
</template>

<script>
export default {
  name:'TabelaAgentes',
  props:{
    items: Array,
    filter: String,
  },
  created(){
    this.filas = [...this.items];

    this.prioridades = function(){
      let item = [];
      let p = [];
      for(let f in this.items){
        console.log("f:\n", f)
        item.push(this.items[f].p0);
        item.push(this.items[f].p1);
        item.push(this.items[f].p2);
        p.push(item);
        item.splice(0,3);
      }
      return p;
    };
  },
  methods: {
    checkLine(i,p,ev){
      console.clear();
      console.log("Checando Item ",i," da Fila:\n",this.filas[i])
      console.log("ck:\n",ev)
      let ck = !this.filas[i][p];
      switch(p){
        case 'p0':
          console.log('p0.checked:\n',this.$refs[this.filas[i].agente+'_p0']["checked"])
          console.log('p1.checked:\n',this.$refs[this.filas[i].agente+'_p1']["checked"])
          console.log('p2.checked:\n',this.$refs[this.filas[i].agente+'_p2']["checked"])
          if(ck){
            this.filas[i].p0 = true;
            this.filas[i].p1 = false;
            this.$refs[this.filas[i].agente+'_p1']["checked"] = this.filas[i].p1;
            this.filas[i].p2 = false;
            this.$refs[this.filas[i].agente+'_p2']["checked"] = this.filas[i].p2;
          }
          break;
        case 'p1':
          console.log('p0.checked:\n',this.$refs[this.filas[i].agente+'_p0'].checked)
          console.log('p1.checked:\n',this.$refs[this.filas[i].agente+'_p1'].checked)
          console.log('p2.checked:\n',this.$refs[this.filas[i].agente+'_p2'].checked)
          if(ck){
            this.filas[i].p1 = true;
            this.filas[i].p0 = false;
            this.$refs[this.filas[i].agente+'_p0']["checked"] = this.filas[i].p0;
            this.filas[i].p2 = false;
            this.$refs[this.filas[i].agente+'_p2']["checked"] = this.filas[i].p2;
          }
          break;
        case 'p2':
          console.log('p0.checked:\n',this.$refs[this.filas[i].agente+'_p0'].checked)
          console.log('p1.checked:\n',this.$refs[this.filas[i].agente+'_p1'].checked)
          console.log('p2.checked:\n',this.$refs[this.filas[i].agente+'_p2'].checked)
          if(ck){
            this.filas[i].p2 = true;
            this.filas[i].p0 = false;
            this.$refs[this.filas[i].agente+'_p0']["checked"] = this.filas[i].p0;
            this.filas[i].p1 = false;
            this.$refs[this.filas[i].agente+'_p1']["checked"] = this.filas[i].p1;
          }
          break;
      }
      console.log("Checando NOVAMENTE Item ",i," da Fila:\n",this.filas[i])
      console.log('p0.checked:\n',this.$refs[this.filas[i].agente+'_p0'].checked)
      console.log('p1.checked:\n',this.$refs[this.filas[i].agente+'_p1'].checked)
      console.log('p2.checked:\n',this.$refs[this.filas[i].agente+'_p2'].checked)
    },
    rowSelect(item,index){
      console.clear()
      console.log(this.filas[index].selected)
      // console.log("Item:\n",item,"\n\nIndex:\n",index)

      this.filas[index].selected = !this.filas[index].selected;

    }
  },
  data(){
    return{
      fields: [
        {
          key:'selected',
          label: '<span class="fal fa-road fa-1x head-add-button"/>',
          sortable: false,
        },
        {
          key:'agente',
          label: 'Filas',
          sortable: false
        },
        {
          key:'p0',
          label:'0',
          sortable:false
        },
        {
          key:'p1',
          label:'1',
          sortable:false
        },
        {
          key:'p2',
          label:'2',
          sortable:false
        }
      ],
    }
  }

}
</script>

<style >

.tabela-filas > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-filas > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.3rem / 2) bottom 10px;
  padding-right: calc(0.3rem + 0.65em);
}
.tabela-filas > .table.b-table > thead > tr > [aria-sort=none], .tabela-filas > .table.b-table > tfoot > tr > [aria-sort=none] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.tabela-filas > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-filas > .table.b-table > tfoot > tr > [aria-sort=ascending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-filas > .table.b-table > thead > tr > [aria-sort=descending], .tabela-filas > .table.b-table > tfoot > tr > [aria-sort=descending] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-filas > .table.b-table > thead > tr > .table-b-table-default {
  background-color: #0d6d9d !important;
  color:#fff !important;
  border-color: #0d6d9d !important;
  align-items: center !important;
  align-content: center !important;
  text-align: center;
  vertical-align: middle !important;
}

.tabela-filas > .table.b-table > tbody > tr > [aria-colindex="2"], .tabela-filas > .table.b-table > thead > tr > [aria-colindex="2"]{
  /* width: 3.5%; */
  text-align: left;
}
.tabela-filas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-filas > .table.b-table > thead > tr > [aria-colindex="1"]{
  width: 0.02%;
  text-align: center !important;
}
.tabela-filas > .table.b-table > tbody > tr > [aria-colindex="3"], .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="4"], .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="5"], .tabela-filas > .table.b-table > thead > tr >[aria-colindex="3"],.tabela-filas > .table.b-table > thead > tr >[aria-colindex="4"],.tabela-filas > .table.b-table > thead > tr >[aria-colindex="5"]{
  width: 0.2%;
  text-align: center !important;
}
.tabela-filas > .table.b-table > tbody > tr > [aria-colindex="1"] > div, .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="3"] > div, .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="4"] > div, .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="5"] > div{
  margin-left: 1ch;
}
/* .tabela-filas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-filas > .table.b-table > thead > tr > [aria-colindex="1"]{
    width: 0.2%;
    text-align: center !important;
} */

/* #editar-filas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-filas > .table.b-table > thead > tr > [aria-colindex="8"] {
    display: none !important;
} */
</style>
