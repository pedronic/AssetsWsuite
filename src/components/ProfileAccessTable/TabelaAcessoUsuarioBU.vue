<template>
    <div class="tabela-acesso-usuario profile-content col-10">
        <b-table class="col-10" hover striped :items="items" :fields="fields" head-variant="dark">
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
                    <template v-slot:cell(add)>
                        <b-form-checkbox v-model="data.items.add" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(view)>
                        <b-form-checkbox v-model="data.items.view" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(edit)>
                        <b-form-checkbox v-model="data.items.edit" value="true" unchecked-value="false"/>
                    </template>
                    <template v-slot:cell(delete)>
                        <b-form-checkbox v-model="data.items.delete" value="true" unchecked-value="false"/>
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
        this.localLabel = this.props.labels;
        this.localItem = this.props.items;
        // this.data = this.items;
        // for (let it in this.props.items){
        //     this.data.acesso = it.acesso;
        //     console.log("acesso ok");
        //     this.data.add = it.add;
        //     this.data.view = it.view;
        //     this.data.edit = it.edit;
        //     this.data.delete = it.delete;
        // }
    },
    computed: function() {
        // for (let it in this.props.items){
        //     this.data.acesso = it.acesso;
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
            data: [],
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
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>