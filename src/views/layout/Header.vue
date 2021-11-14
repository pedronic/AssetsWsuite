<template>
  <header class="page-header" role="banner" responsive>
    <!-- we need this logo when user switches to nav-function-top -->
    <!-- DOC: nav menu layout change shortcut -->
   
    <PageLogo />
    <!-- <div class="page-logo">
      <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
        <img src="../../assets/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo">
        <span class="page-logo-text mr-1"></span>
          <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
      </a>
    </div> -->
     <div class="hidden-md-down dropdown-icon-menu position-relative" style="margin-top: 8px;">
      <a href="#" class="header-btn btn js-waves-off" data-action="toggle" data-class="nav-function-hidden" title="Hide Navigation" style="color: #1e4457 !important;">
        <i class="fal fa-angle-right"></i>
      </a>
      <ul>
        <li>
          <a href="#" class="btn js-waves-off" data-action="toggle" data-class="nav-function-minify" title="Minify Navigation">
            <i class="ni ni-minify-nav"></i>
          </a>
        </li>
        <li>
          <a href="#" class="btn js-waves-off" data-action="toggle" data-class="nav-function-fixed" title="Lock Navigation">
            <i class="ni ni-lock-nav"></i>
          </a>
        </li>
      </ul>
    </div>
    <!-- DOC: mobile button appears during mobile width -->
    <div class="hidden-lg-up">
      <a href="#" class="header-btn btn press-scale-down" data-action="toggle" data-class="mobile-nav-on">
          <i class="ni ni-menu"></i>
      </a>
    </div>
    <!-- <menu-top-left v-if="loggedIn"/> -->
    <menu-top-left />
    <!-- <div class="search">
      <form class="app-forms hidden-xs-down" role="search" action="page_search.html" autocomplete="off">
        <input type="text" id="search-field" placeholder="Pesquisar" class="form-control" tabindex="1">
          <a href="#" onclick="return false;" class="btn-danger btn-search-close js-waves-off d-none" data-action="toggle" data-class="mobile-search-on">
          <i class="fal fa-times"></i>
        </a>
      </form>
    </div> -->
    <div class="ml-auto d-flex">
      <!-- activate app search icon (mobile) -->
      <div class="hidden-sm-up">
        <a href="#" class="header-icon" data-action="toggle" data-class="mobile-search-on" data-focus="search-field" title="Search">
          <i class="fal fa-search"></i>
        </a>
      </div>
      <!-- app settings -->
      <!-- <pesquisa-header /> -->
      <!-- <div>
        <a href="#" class="header-icon" data-toggle="dropdown" title="My Apps">
          <i class="fal fa-cube"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-animated w-auto h-auto">
          <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center rounded-top">
            <h4 class="m-0 text-center color-white">
              Quick Shortcut
              <small class="mb-0 opacity-80">User Applications & Addons</small>
            </h4>
          </div>
          <div class="custom-scroll h-100">
            <ul class="app-list">
              <li>
                <a href="#" class="app-list-item hover-white">
                  <span class="icon-stack">
                    <i class="base-2 icon-stack-3x color-primary-400"></i>
                      <i class="base-10 text-white icon-stack-1x"></i>
                      <i class="ni md-profile color-primary-800 icon-stack-2x"></i>
                  </span>
                  <span class="app-list-name">
                    Account
                  </span>
                </a>
              </li>
              <li>
                <a href="#" class="app-list-item hover-white">
                  <span class="icon-stack">
                    <i class="base-9 icon-stack-3x color-success-400"></i>
                    <i class="base-2 icon-stack-2x color-success-500"></i>
                                                        <i class="ni ni-shield icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Security
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-18 icon-stack-3x color-info-700"></i>
                                                        <span class="position-absolute pos-top pos-left pos-right color-white fs-md mt-2 fw-400">28</span>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Calendar
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-7 icon-stack-3x color-info-500"></i>
                                                        <i class="base-7 icon-stack-2x color-info-700"></i>
                                                        <i class="ni ni-graph icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Stats
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-4 icon-stack-3x color-danger-500"></i>
                                                        <i class="base-4 icon-stack-1x color-danger-400"></i>
                                                        <i class="ni ni-envelope icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Messages
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-4 icon-stack-3x color-fusion-400"></i>
                                                        <i class="base-5 icon-stack-2x color-fusion-200"></i>
                                                        <i class="base-5 icon-stack-1x color-fusion-100"></i>
                                                        <i class="fal fa-keyboard icon-stack-1x color-info-50"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Notes
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-16 icon-stack-3x color-fusion-500"></i>
                                                        <i class="base-10 icon-stack-1x color-primary-50 opacity-30"></i>
                                                        <i class="base-10 icon-stack-1x fs-xl color-primary-50 opacity-20"></i>
                                                        <i class="fal fa-dot-circle icon-stack-1x text-white opacity-85"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Photos
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-19 icon-stack-3x color-primary-400"></i>
                                                        <i class="base-7 icon-stack-2x color-primary-300"></i>
                                                        <i class="base-7 icon-stack-1x fs-xxl color-primary-200"></i>
                                                        <i class="base-7 icon-stack-1x color-primary-500"></i>
                                                        <i class="fal fa-globe icon-stack-1x text-white opacity-85"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Maps
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-5 icon-stack-3x color-success-700 opacity-80"></i>
                                                        <i class="base-12 icon-stack-2x color-success-700 opacity-30"></i>
                                                        <i class="fal fa-comment-alt icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Chat
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-5 icon-stack-3x color-warning-600"></i>
                                                        <i class="base-7 icon-stack-2x color-warning-800 opacity-50"></i>
                                                        <i class="fal fa-phone icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Phone
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="app-list-item hover-white">
                                                    <span class="icon-stack">
                                                        <i class="base-6 icon-stack-3x color-danger-600"></i>
                                                        <i class="fal fa-chart-line icon-stack-1x text-white"></i>
                                                    </span>
                                                    <span class="app-list-name">
                                                        Projects
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="w-100">
                                                <a href="#" class="btn btn-default mt-4 mb-2 pr-5 pl-5"> Add more apps </a>
                                            </li>
            </ul>
          </div>
        </div> 
      </div>-->
      <PesquisaHeader/>
      <edit-button-header />
      <ModulesHeader/>
      <notify-header />
      <UserHeader />
      
    </div>
  </header>
</template>

<script>
import PageLogo from '@/components/page-logo/PageLogo.vue';
import UserHeader from '../../components/user/UserHeader.vue';
import NotifyHeader from '../../components/notify/NotifyHeader.vue';
import EditButtonHeader from '../../components/editHeader/EditButtonHeader.vue';
import MenuTopLeft from '../../components/MenuTopLeft/MenuTopLeft.vue';
import ModulesHeader from '../../components/ModulesHeader/ModulesHeader.vue';
import PesquisaHeader from '../../components/pesquisa/PesquisaHeader.vue';
import {mapState} from 'vuex';

export default {
  components: { 
    PageLogo, 
    UserHeader, 
    NotifyHeader,
    EditButtonHeader,
    MenuTopLeft,
    ModulesHeader,
    PesquisaHeader, 
  //PesquisaHeader 
  },
  name: "Header",
  watch: mapState(['login']),
  computed:{
    loggedIn(){
      return this.$store.state.login
    }
  },
  data(){
    return{
      // loggedIn: false,
    }
  }
};
</script>

<style>
  .app-header{
    background-color: #bfbfbf !important;
    box-shadow: 0px 0px 0px 0px rgb(86 61 124 / 13%);
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 4.125rem;
    position: relative;
    z-index: 1000;
    order: 1;

  }
  .page-header {
    background-color: #bfbfbf !important;
    padding: 0 0rem !important;
   
  }
  .dropdown-icon-menu > ul > li .btn, .header-btn {
    border-radius: 4px;
    border: 0px solid #bababa !important;
    height: 2.25rem;
    width: 3.25rem;
    vertical-align: middle;
    line-height: 2.125rem;
    margin-right: 0.9375rem;
    font-size: 22px !important;
    padding: 0 0px;
    cursor: default;
    color: #1e4457 !important;
    position: relative;
}
.dropdown-icon-menu > ul > li .btn, .header-btn:active {
  color:#1e4457 !important;
}
.dropdown-icon-menu > ul {
    opacity: 0;
    list-style: none;
    margin: 0;
    position: absolute;
    background: #bfbfbf !important;
    height: 2.25rem;
    padding: 2.75rem 4px 5px;
    width: 3.75rem;
    margin-left: 1px;
    margin-top: -2.5rem;
    left: -5px;
    overflow: hidden;
    box-shadow: 0 3px 3px rgb(0 0 0 / 12%), 0 0 3px rgb(0 0 0 / 24%);
    border-radius: 0.25rem;
    transition: all 270ms cubic-bezier(0.34, 1.25, 0.3, 1);
}
.dropdown-icon-menu > ul > li .btn, .header-btn {
    border-radius: 4px;
    border: 1px solid #bababa;
    height: 2.25rem;
    width: 3.25rem;
    vertical-align: middle;
    line-height: 2.125rem;
    margin-right: 02px !important;
    font-size: 21px;
    padding: 0 11px;
    cursor: default;
    color: #1e4457 ;
    position: relative;
}
.header-icon:not(.btn) > [class*='fa-']:first-child {
    font-size: 21px !important;
}


.nav-function-hidden:not(.nav-function-top) .page-header [data-class="nav-function-hidden"] {
    background: #2e2e2e00 !important;
    border-color: #14141400 !important;
    box-shadow: inset 0 0 0px 0px rgb(0 0 0 / 37%) !important;
    color: #1e4457 !important;
}

a.header-btn .btn .js-waves-off :active{
  color: #1e4457 !important;
}
.w-app-icon-primary{
  margin-left: 15px;
}
.badge.badge-icon {
    background-color: #f71414 !important;
    color: #fff;
    box-shadow: 0 0 0 1px #fff;
}
</style>