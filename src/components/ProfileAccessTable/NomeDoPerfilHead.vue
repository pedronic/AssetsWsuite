<template>
    <div>
        <div class="profile-content user-name-line d-flex">
            <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
            <b-form-input id="profile-name-input" v-model="text" :disabled="this.edit_name"/>
            <b-button variant="outline-dark" @click="showDetails">
                <span class="fal fa-angle-down"/>
            </b-button>
            <b-button variant="outline-dark" @click="enableEditName"><span class="fal fa-pencil"/></b-button>
            <b-button variant="outline-dark"><span class="fal fa-trash-alt"/></b-button>
        </div>
        <div :class="this.show_details">
            <tabela-acesso-usuario :items="items"/>
        </div>
    </div>
</template>

<script>
import TabelaAcessoUsuario from './TabelaAcessoUsuario.vue'
export default {
    name: "NomeDoPerfilHead",
    components: {
        TabelaAcessoUsuario
    },
    props: {
        items: Array,
        user: Array,
        colID: String,
        rowID: String,
    },
    computed:{        
    },
    methods: {
        showDetails(){
            if(this.show_details.length > 0) this.show_details = "";
            else this.show_details = "d-none";
        },
        enableEditName(){
            this.edit_name = !this.edit_name;
        },
    },
    watch: {
    },
    data() {
        return {
            show_details:"d-none",
            text: this.user.name,
            edit_name: true,
        }
    }
}
</script>

<style scoped>
.head-items{
    align-content: center;
    align-items: center;
}
.profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
}
.user-name-line {
    align-items: center !important;
    border-style: solid;
    border-width: 1px;
    border-color: #d0cece;
    padding-left: 0%;
    padding-right: 0%;
}
#profile-name-input{
    margin-left: 5px;
    margin-right: 0px;
    border-left-color: black;
    border-radius: 0px;
}
</style>