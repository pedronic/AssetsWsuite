<template>
    <div>
        <a href="#" data-toggle="dropdown" title="Edição Rapida" class="header-icon d-flex align-items-center justify-content-center ml-2">
            <!-- <img src="img/demo/avatars/avatar-admin.png" class="profile-image rounded-circle" alt="Dr. Codex Lantern"> -->
            <!-- you can also add username next to the avatar with the codes below:
            <span class="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span> -->
            <i class="fal fa-acorn"></i>
        </a>
        <dropdow-edit-header />                           
    </div>
</template>

<script>
import DropdowEditHeader from './DropdowEditHeader.vue'

export default {
  components: { DropdowEditHeader },
    name: "EditButtonHeader"

}
</script>

<style>

</style>