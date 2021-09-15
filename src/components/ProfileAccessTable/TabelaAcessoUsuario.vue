<template>
    <div class="tabela-acesso-usuario profile-content">
        <b-table class="table-sm able-bordered table-hover table-striped w-100 dt-responsive dtr-inline" :items="items" responsive="true" :fields="fields">
            <template v-slot:head(acesso)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(add)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(view)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(edit)="data">
                <span v-html="data.label"></span>
            </template>
            <template v-slot:head(delete)="data">
                <span v-html="data.label"></span>
            </template>

            <template v-slot:cell(acesso)="data">
                <span>{{data.value}}</span>
            </template>
                    <template v-slot:cell(add)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.acesso)+'_add'" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(view)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.acesso)+'_view'" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(edit)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.acesso)+'_edit'" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(delete)="slot">
                        <b-form-checkbox v-model="slot.value" :id="(slot.item.acesso)+'_delete'" value="true" unchecked-value="false"/>
                    </template>
        </b-table>
    </div>    
</template>

<script>
export default {
    name:"TabelaAcessoUsuario",
    props:{
        items: Array,
    },
    mounted: function() {
        // this.localLabel = this.props.labels;
        // this.localItem = this.props.items;
        // this.data = this.items;
        // for (let it in this.props.items){
        //     t"rowLabel"cesso} = it.acesso;
        //     console.log("acesso ok");
        //     this.data.add = it.add;
        //     this.data.view = it.view;
        //     this.data.edit = it.edit;
        //     this.data.delete = it.delete;
        // }
    },
    computed: function() {
        // for (let it in this.props.items){
        //     t"rowLabel"cesso} = it.acesso;
        //     console.clear();
        //     console.log("acesso ok");
        //     this.data.add = it.add;
        //     this.data.view = it.view;
        //     this.data.edit = it.edit;
        //     this.data.delete = it.delete;
        // }
    },
    data() {
        return {
            // localItem: this.props.items,
            data: this.items,
            rowLabel: this.items.acesso,
            row: this.items,
            fields: [
                {
                    key:"acesso",
                    label: "Acesso",
                },
                {
                    key: "add",
                    label: "<i class='fal fa-plus mr-2 head-items'/>",
                },
                {
                    key:'view',
                    label:"<i class='fal fa-eye mr-2 head-items'/>",
                },
                {
                    key:'edit',
                    label:"<i class='fal fa-pencil mr-2 head-items' />",
                },
                {
                    key:'delete',
                    label:"<i class='fal fa-trash-alt mr-2 head-items' />",
                }
            ]
        }
    }
    
};
</script>

<style>
.profile-content {
    /* margin-left: 40px;
    margin-right: 40px; */
    margin-top: 5px;
    margin-bottom: 5px;
}

[aria-colindex="1"]{
    width: 90%;
}
.table thead{
    background-color: #0d6d9d;
    color:#fff;
}
.table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px;
padding-right: calc(0.3rem + 0.65em);

}
.table.b-table > thead > tr > [aria-sort=none], .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.table.b-table > thead > tr > [aria-sort=ascending], .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.table.b-table > thead > tr > [aria-sort=descending], .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
</style>