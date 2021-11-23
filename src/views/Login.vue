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
                        <input type="password" v-model="user.password" id="password" class="form-control form-control-lg login-pass" placeholder="Senha" required @keydown.enter="signin()"/>
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
import {baseApiUrl, userKey, showError} from "../config/global";
export default {
  name: "Login",
  data: function () {
    return{
      user:{},
      defaultAccessPages:[],
      pagesIndexTable:{}
    }
  },
  methods:{
    setPagesIndexTable(res){
      let p = {};
      for(let i in res){
        p[res[i].name] = res[i].page_id;
      }
      return JSON.stringify(p);
    },

    getDefaultAccessPages(userID){
        axios.get(baseApiUrl+"/pages")
        .then(res => {
          localStorage.setItem('__defaultAccessPages', JSON.stringify(res.data.data));
          localStorage.setItem('__pagesIndexTable', this.setPagesIndexTable(res.data.data));
          this.defaultAccessPages = JSON.parse(localStorage.getItem('__defaultAccessPages'));
          this.pagesIndexTable = JSON.parse(localStorage.getItem('__pagesIndexTable'));
          this.getUserProfile(userID);
        })
        .catch(err => console.log(err))
    },
    _setUserPages(userID){
      let pID, uID=userID.toString();
      axios.get(baseApiUrl+"/users/"+uID)
      .then(res => {
        localStorage.setItem('__setUserPagesResponse', JSON.stringify(res));
        pID = res.data[0].perfil_id;
        this.getProfilePages(pID);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
      })
    },
    async setUserPages(profileID){
      let pID = profileID.toString();
      console.log("Profile ID @setUserPages():\t",profileID);
      console.log("this.pagesIndexTable @setUserPages():\t",this.pagesIndexTable);
      let res = await axios.get(baseApiUrl+"/perfilspages/"+pID);
      let u = res.data.data[0];
      console.log("axios response @setUserPages():\n",u);
      let users = [];
      let keys = Object.keys(this.pagesIndexTable);
      let hasPage = false;
      let exists = res.data.data.length > 0 ? true : false;
      // let user = {};
          // {
          //     name: '',
          //     id: '',
          //     data:[]
          // };
      let data = {};
          // {
          //     name:'',
          //     page_id:null,
          //     modulo_name:'',
          //     add:null,
          //     read:null,
          //     edit:null,
          //     delete:null,
          //     browser:null,
          // };           
      // for(let i in u){
      //     user.name = u.perfil_name;
      //     user.id = u.perfil_id;
      //     user.data = [];

        for(let j in keys){
          data.name = keys[j];
          data.page_id = this.pagesIndexTable[keys[j]];
          hasPage = false;
          let thisPage = 0;
          if(exists){
            for (let k in u.pages){
              if(u.pages[k].page_id !== data.page_id) continue;
              else {
                  hasPage = true;
                  thisPage = k;
                  break;
              }
            }
          }
          if(hasPage){
            data.modulo_name = u.pages[thisPage].modulo_name;
            data.add = u.pages[thisPage].add?true:false;
            data.read = u.pages[thisPage].read?true:false;
            data.edit = u.pages[thisPage].edit?true:false;
            data.delete = u.pages[thisPage].delete?true:false;
            data.browser = u.pages[thisPage].browser?true:false;
          }
          else{
            data.modulo_name = "Discador";
            data.add = false;
            data.read = false;
            data.edit = false;
            data.delete = false;
            data.browser = false;
          }
            // user.data.push({...data})
        // }
        users.push({...data})
        }
      console.log("Users @getUsers():\n",users)
      localStorage.setItem('__userAccessPages', JSON.stringify(users));
      this.$store.commit('setAccessPages', true);
      // this.users = [...users];
      // this.dataOK = true;
    },
    getUserProfile(userID){
      let uID = userID.toString();
      axios.get(baseApiUrl+'/users/'+uID)
      .then(res => {
        console.log("User Profile:\n",res.data)
        // if(res.data.data[0].perfil_id !== 1) this.setUserPages(res.data.data[0].perfil_id);
        // else this.setUserPages(14);
        this.setUserPages(res.data.data[0].perfil_id);
      })
      .catch(showError)
    },
    getProfilePages(pID){
      axios.get(baseApiUrl+"/perfilspages")
      .then(res => {
        localStorage.setItem('__getProfilePagesResponse', JSON.stringify(res.data.data));
        let p = res.data.data;
        // let userProfile = {};
        for(let i in p){
          if(p[i].perfil_id === pID) localStorage.setItem('__perfilEncontrado', JSON.stringify(p[i]));
          else localStorage.setItem('__perfilEncontrado', "{'achou':'false'}");
        }
      })
    },
    signin() {
        axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
            this.$store.commit('setUser', res.data)
            localStorage.setItem(userKey, JSON.stringify(res.data))
            this.getDefaultAccessPages(res.data.id);
            localStorage.setItem('__signinResponse', JSON.stringify(res.data));
            // this.getUserProfile(res.data.id);
            this.$router.push({ name: 'Home' })
        })
        .catch(showError)
      }
  },
  beforeUnmount(){
    // this.getDefaultAccessPages();
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