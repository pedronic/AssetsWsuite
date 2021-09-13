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
            <template v-slot:cell(add)="data">
                <b-form-checkbox v-model="data.add" value="true" unchecked-value="false"/>
            </template>
            <template v-slot:cell(view)="data">
                <b-form-checkbox v-model="data.view" value="true" unchecked-value="false"/>
            </template>
            <template v-slot:cell(edit)="data">
                <b-form-checkbox v-model="data.edit" value="true" unchecked-value="false"/>
            </template>
            <template v-slot:cell(delete)="data">
                <b-form-checkbox v-model="data.delete" value="true" unchecked-value="false"/>
            </template>
        </b-table>
    </div>    
</template>

<script>
// import func from 'vue-editor-bridge';
export default {
    name:"TabelaAcessoUsuario",
    props:{
        items: Array,
        // labels: {
        //     type: Array,
        //     default: function() {
        //         return this.localLabel;
        //     }
        // }
    },
    mounted: function() {
        this.localLabel = this.props.labels;
        this.localItem = this.props.items; 
    },
    computed: function() {

    },
    data() {
        return {
            // localLabel:[],
            // localItem:[],
            fields: [
                {
                    key:"acesso",
                    label: "Acesso",
                    // thClass:"mr-2"
                },
                {
                    key: "add",
                    label: "<i class='fal fa-plus mr-2 head-items'/>",
                    // thClass:"fal fa-plus mr-2 head-items",
                },
                {
                    key:'view',
                    label:"<i class='fal fa-eye mr-2 head-items'/>",
                    // thClass:"fal fa-eye mr-2 head-items",
                },
                {
                    key:'edit',
                    label:"<i class='fal fa-pencil mr-2 head-items' />",
                    // thClass:"fal fa-pencil mr-2 head-items",
                },
                {
                    key:'delete',
                    label:"<i class='fal fa-trash-alt mr-2 head-items' />",
                    // thClass:"fal fa-trash-alt mr-2 head-items",
                }
            ]
        }
    }
    
};
</script>

<style>
/* .head-items {

} */
.profile-content {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>