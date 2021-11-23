<template>
    <div>
        <a href="#" data-toggle="dropdown" title="drlantern@gotbootstrap.com" class="header-icon d-flex align-items-center justify-content-center ml-2">
            <img src="img/demo/avatars/avatar-admin.png" class="profile-image rounded-circle" alt="Dr. Codex Lantern">
            <!-- you can also add username next to the avatar with the codes below:
            <span class="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span>
            <i class="ni ni-chevron-down hidden-xs-down"></i> -->
        </a>
        <div class="dropdown-menu dropdown-menu-animated dropdown-lg">
            <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                    <span class="mr-2">
                        <img src="img/demo/avatars/avatar-admin.png" class="rounded-circle profile-image" alt="Dr. Codex Lantern">
                    </span>
                    <div class="info-card-text">
                        <div class="fs-lg text-truncate text-truncate-lg"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Dr. Codex Lantern</font></font></div>
                        <span class="text-truncate text-truncate-md opacity-80"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">drlantern@gotbootstrap.com</font></font></span>
                    </div>
                </div>
            </div>
            <div class="dropdown-divider m-0"></div>
            <a href="#" class="dropdown-item" data-action="app-reset">
                <span data-i18n="drpdwn.reset_layout"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Redefinir layout</font></font></span>
            </a>
            <a href="#" class="dropdown-item" data-toggle="modal" data-target=".js-modal-settings">
                <span data-i18n="drpdwn.settings"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Configurações</font></font></span>
            </a>
            <div class="dropdown-divider m-0"></div>
            <a href="#" class="dropdown-item" data-action="app-fullscreen">
                <span data-i18n="drpdwn.fullscreen"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Tela cheia</font></font></span>
                <i class="float-right text-muted fw-n"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">F11</font></font></i>
            </a>
            <a href="#" class="dropdown-item" data-action="app-print">
                <span data-i18n="drpdwn.print"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Impressão</font></font></span>
                <i class="float-right text-muted fw-n"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Ctrl + P</font></font></i>
            </a>
            <div class="dropdown-multilevel dropdown-multilevel-left">
                <div class="dropdown-item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                    Língua
                </font></font></div>
                <div class="dropdown-menu">
                    <a href="#?lang=fr" class="dropdown-item" data-action="lang" data-lang="fr"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Français</font></font></a>
                    <a href="#?lang=en" class="dropdown-item active" data-action="lang" data-lang="en"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Inglês (EUA)</font></font></a>
                    <a href="#?lang=es" class="dropdown-item" data-action="lang" data-lang="es"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Espanhol</font></font></a>
                    <a href="#?lang=ru" class="dropdown-item" data-action="lang" data-lang="ru"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Русский язык</font></font></a>
                    <a href="#?lang=jp" class="dropdown-item" data-action="lang" data-lang="jp"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">日本語</font></font></a>
                    <a href="#?lang=ch" class="dropdown-item" data-action="lang" data-lang="ch"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">中文</font></font></a>
                </div>
            </div>
            <div class="dropdown-divider m-0"></div>
            <a class="dropdown-item fw-500 pt-3 pb-3"  @click.prevent="logout">
                <span data-i18n="drpdwn.page-logout"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Sair</font></font></span>
                <span class="float-right fw-n"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">@codexlantern</font></font></span>
            </a>
        </div>
    </div>
</template>

<script>
import {userKey} from "../../config/global";
import {mapState} from "vuex";
export default {
    name: "UserHeader",
    computed: mapState(["user"]),
    methods:{
        logout(){
            localStorage.removeItem(userKey);
            localStorage.removeItem('__userAccessPages');
            localStorage.removeItem('__signinResponse');
            localStorage.removeItem('__defaultAccessPages');
            localStorage.removeItem('__pagesIndexTable');
            this.$store.commit('setUser', null);
            this.$store.commit('setAccessPages', false);
            this.$router.push({name: 'Login'});
        }

    }


}
</script>

<style>

</style>