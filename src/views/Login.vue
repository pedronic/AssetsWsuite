<template>
  <div class="page-wrapper auth">
    <div class="page-inner bg-brand-gradient">
      <div class="page-content-wrapper bg-transparent m-0">
        
        <div class="flex-1 bg-login" >
          <div class="container py-4 py-lg-5 my-lg-5 px-4 px-sm-0">
            <div class="row">
              <div class="col col-md-6 col-lg-7 ">
                <div class="logo-login">
                <img src="@/assets/img/logo-w2.png" class="rounded mx-auto d-block img-fluid" />
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-5 col-xl-4 ml-auto">
                
                <div class="card p-4 rounded-plus bg-faded">
                  <form
                    id="js-login"
                    novalidate=""
                    
                  >
                    <div class="form-group">
                      <div class="input-group flex-nowrap">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fal fa-user fs-xl"></i>
                          </span>
                        </div>
                        <input id="addon-wrapping-left" v-model="user.username" type="text" class="form-control form-control-lg login-user" placeholder="Usuário" aria-label="Username" aria-describedby="addon-wrapping-left">
                      </div>  
                     
                      <div class="invalid-feedback">
                        No, you missed this one.
                      </div>
                      
                    </div>
                    <div class="form-group">
                      <div class="input-group flex-nowrap">
                         <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fal fa-key fs-xl"></i>
                          </span>
                        </div>
                        <input type="password" v-model="user.password" id="password" class="form-control form-control-lg login-pass" placeholder="Senha" required />
                      </div>
                      
                      <div class="invalid-feedback">
                        Sorry, you missed this one.
                      </div>
                     
                    </div>
                    <!-- <div class="form-group text-left">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" d="rememberme" />
                        <label class="custom-control-label" for="rememberme">
                          Remember me for the next 30 days</label
                        >
                      </div>
                    </div> -->
                    <div class="row no-gutters">
                      <div class="col-lg-6 pr-lg-1 my-2 ml-auto">
                        <a @click="signin()"  class="btn btn-info btn-block btn-lg" >
                          Login 
                        </a>
                      </div>
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class=" position-absolute pos-bottom pos-left pos-right p-3 text-center text-white " > 
              2021 © W Suite &nbsp;
              <a href="https://www.wtechnology.com.br" class="text-white opacity-40 fw-500" title="wtechnology.com.br" target="_blank"  >W Technology</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {baseApiUrl, userKey, showError} from "@/config/global";
export default {
  name: "Login",
  data: function () {
    return{
      user:{}
    }
  },
  methods:{
     signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ name: 'Home' })
                })
                .catch(showError)
        }
  }
};
</script>

<style scoped>

.nav-function-hidden:not(.nav-function-top) .page-wrapper {
    padding-left: 0;
}

@media (min-width: 992px){
.pt-lg-5, .py-lg-5 {
    padding-top: 6rem !important;
}
.bg-login{
  background-image: url('../assets/img/1812874.jpg');
  background: url('../assets/img/1812874.jpg');
  background-position: center;
  background-size: 100%;
}
.nav-function-hidden:not(.nav-function-top) .page-wrapper {
    padding-left: 0;
}
}
.btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active, .show > .btn-info.dropdown-toggle {
    color: #fff;
    background-color: #0d6d9d;
    border-color: #0d6d9d;
}
.btn-info {
    color: #fff;
    background-color: #0d6d9d;
    border-color: #0d6d9d;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
}
.logo-login{
  text-align: center;
}
.bg-faded {
    background-color: #f7f9fa00 !important;
}
.card, .card-group {
    box-shadow: 0px 0px 0px 0px rgb(20 54 71 / 8%);
    border: transparent 0px;
    margin-top:120px ;
}
.bg-login{
  background-color: rgb(185, 185, 185);
}
.logo-login img{
  max-width: 360px;
}
.login-pass {
  outline: none;
  border-color: transparent !important;
}
.login-user{
  outline: none;
  border-color: transparent !important;
}
.login-user:focus{
  border-color: transparent !important;

}
.login-pass:focus{
   border-color: transparent !important;
}
</style>