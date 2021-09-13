<template>
    <div class="profile-content user-name-line d-flex col-10">
        <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
        <b-form-input id="profile-name-input" v-model="text" placeholder="Nome do Perfil"/>
        <b-button variant="outline-dark"><span class="fal fa-angle-down"/></b-button>
        <b-button variant="outline-dark"><span class="fal fa-pencil"/></b-button>
        <b-button variant="outline-dark"><span class="fal fa-trash-alt"/></b-button>
    </div>
</template>

<script>
export default {
    name: "NomeDoPerfilHead"
}
</script>

<style scoped>
.head-items{
    align-content: center;
    align-items: center;
}
.profile-content {
    margin-left: 40px;
    margin-right: 40px;
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