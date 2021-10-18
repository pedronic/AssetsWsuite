<template>
    <div class="tabela-acesso-usuario profile-content">
        <b-table class="tabela-acesso-usuario table-sm able-bordered table-hover table-striped w-100 dt-responsive dtr-inline" :items="items" responsive="true" :fields="fields" sticky-header>
            <template v-slot:head(name)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(modulo_name)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(add)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(read)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(edit)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(delete)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(browser)="data">
                <span v-html="data.label"></span>
            </template>
            
            <template v-slot:cell(name)="data">
                <span>{{data.value}}</span>
            </template>
            <template v-slot:cell(modulo_name)="data">
                <span>{{data.value}}</span>
            </template>
            <template v-slot:cell(add)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.name)+'_add'" :ref="(slot.item.name)+'_add'" :value="true" :unchecked-value="false" :disabled="isDependantDisabled(slot.item.name,'add',slot.item.page_id)"/>
            </template>
            <template v-slot:cell(read)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.name)+'_read'" :value="true" :unchecked-value="false" :disabled="isDependantDisabled(slot.item.name,'read',slot.item.page_id)"/>
            </template>
            <template v-slot:cell(edit)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.name)+'_edit'" :value="true" :unchecked-value="false" :disabled="isDependantDisabled(slot.item.name,'edit',slot.item.page_id)"/>
            </template>
            <template v-slot:cell(delete)="slot">
                <b-form-checkbox v-model="slot.value" :id="(slot.item.name)+'_delete'" :value="true" :unchecked-value="false" :disabled="isDependantDisabled(slot.item.name,'delete',slot.item.page_id)"/>
            </template>
            <template v-slot:cell(browser)="slot">
                <b-form-checkbox v-model="slot.item.browser" :ref="(slot.item.name)+'_browser'" :id="(slot.item.name)+'_browse'" :value="true" :unchecked-value="false" :disabled="isBrowseDisabled()" :browsable="slot.value"/>
            </template>
        </b-table>
    </div>    
</template>

<script>
// var load = 0;
export default {
    name:"TabelaAcessoUsuario",
    props:{
        items: Array,
        viewOnly: Boolean,
        pages: Array,
        // pages_index:Object,
    },
    created(){
        console.log("Pages que Tabela Acesso Usuario recebe @created:\n",this.pages)
        // console.log("Pages_index que Tabela Acesso Usuario recebe @created:\n",this.pages_index)
        // this.setPagesIndexTable();
        this.isBrowseDisabled = function(){
            if(this.viewOnly) {
                return this.viewOnly;
            }
            else{
                return false;
            }
        }
        this.isDependantDisabled = function(a,bread,index){
            // if(load === 0) {
            //     this.pagesIndexTable = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            //     console.log("Pages Index Table @isDependantDisabled():\n",this.pagesIndexTable);
            //     load = 1;
            // }
            var idd = {};
            // var indexREAL = this.pages_index[a];
            // console.log("Pages_index:\n",this.pages_index);
            // console.log("\n\tPages_index length:\n",Object.keys(this.pages_index).length);
            // console.log("\nindexREAL:\t",indexREAL);
            if(this.viewOnly){
                return this.viewOnly;
            }
            else if(!this.pages[index-1][bread]){
                console.log('this.pages[',index,'][',bread,'] @isDependantDisabled():\n',this.pages[index][bread])
                console.log('this.pages[',index,'] @isDependantDisabled():\n',this.pages[index])
                return true;
            }
            else{
                for (let ii in this.items) {
                    let k = this.items[ii].name;
                    idd[k] = !this.items[ii].browser;
                }
                // console.log("a:\n",a)
                // console.log("idd:\n",idd)
                // console.log("idd[a]:\n",idd[a])
                return idd[a];
            }
        }
    },
    mounted() {
        console.log("Items que Tabela Acesso Usuario recebe @mounted:\n",this.items);
        console.log("Pages que Tabela Acesso Usuario recebe @mounted:\n",this.pages)
        this.state = function() {
            let d;
            if (this.viewOnly) d=true;
            else d = this.browsable;
            return d;
        }
    },
    methods: {
        setPagesIndexTable(){
            this.pagesIndexTable = JSON.parse(localStorage.getItem('__pagesIndexTable'));
            // load = 1;
        }
    },
    data() {
        return {
            row: [this.items],
            isDisabled: this.viewOnly,
            fields: [
                {
                    key:"name",
                    label: "Acesso",
                },
                {
                    key:"modulo_name",
                    label: "Módulos",
                },
                {
                    key: "add",
                    label: "<i class='fal fa-plus mr-2 head-items'/>",
                },
                {
                    key:'read',
                    label:"<i class='fal fa-eye mr-2 head-items'/>",
                },
                {
                    key:'edit',
                    label:"<i class='fal fa-pencil mr-2 head-items' />",
                },
                {
                    key:'delete',
                    label:"<i class='fal fa-trash-alt mr-2 head-items' />",
                },
                {
                    key:'browser',
                    label:"<i class='fal fa-mouse-pointer mr-2 head-items' />",
                }
            ],
        }
    }
    
};
</script>

<style >
.b-table-sticky-header {
    max-height: 700px;
    margin-bottom: 5px;
}

.profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
    position: relative;
}

.tabela-acesso-usuario > .table.b-table > tbody > tr > [aria-colindex="1"]{
    width: 80%;
}
.tabela-acesso-usuario > .table.b-table > tbody > tr > [aria-colindex="2"]{
    width: 10%;
}
.tabela-acesso-usuario > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-acesso-usuario > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px;
padding-right: calc(0.3rem + 0.65em);

}
.tabela-acesso-usuario > .table.b-table > thead > tr > [aria-sort=none], .tabela-acesso-usuario > .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.tabela-acesso-usuario > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-acesso-usuario > .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-acesso-usuario > .table.b-table > thead > tr > [aria-sort=descending], .tabela-acesso-usuario > .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-acesso-usuario > .table.b-table > thead > tr > .table-b-table-default {
background-color: #0d6d9d !important;
color:#fff !important;
/* position: sticky;
position: -webkit-sticky;
top: 45px;
z-index: 2; */
}
.tabela-acesso-usuario > .table.b-table>tbody{
    z-index: 1;
}
</style>