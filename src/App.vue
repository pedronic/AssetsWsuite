<template>
  <div id="app" class="page-wrapper" :class="{ 'auth': !user }" >
    <div class="page-inner" :class="{'bg-brand-gradient' : !user}" >
      <Sidebar />
      <div class="page-content-wrapper" :class="{'bg-transparent m-0': !user}">
        <Header/>
        <!-- <Loading v-if="validatingToken" /> -->
        <!-- <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div> 
        <router-view /> -->
        <Content />
        <Footer />
      </div>
    </div>
    <!-- <div class="page-inner bg-brand-gradient" v-else>
    </div> -->
      <!-- <login /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, userKey } from "@/config/global"
import Header from "@/views/layout/Header.vue";
import Sidebar from "@/views/layout/Sidebar.vue";
import Footer from "@/views/layout/Footer.vue";
import Content from "@/views/layout/Content.vue";
// import Login from "@/views/Login.vue";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    Content,
    // Login,
  },
  data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'Login' })
				return
			}
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (res.data) {
				this.$store.commit('setUser', userData)
		
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'Login' })
			}
			this.validatingToken = false
		},
    logout(){
      // if (e) {e.returnValue = 'Changes you made may not be saved';}
      // else {return null;}
      var perfEntries = performance.getEntriesByType("navigation");
      console.log("Performance.navigation.type:\n",perfEntries.at(-1).type)
      if(perfEntries.at(-1).type === 'reload'){
        localStorage.removeItem(userKey);
        this.$store.commit('setUser', null);
        this.$store.commit('setAccessPages', false);
        this.$router.push({name: 'Login'});
        console.log("Reload event!")
      }
      else return;
    }
	},
	created() {
		this.validateToken();
    /* window.addEventListener('beforeunload', this.logout() */ /* function(e) {
      console.log("Target:\n",e.currentTarget);
      
      for(let i in e.currentTarget){
        console.log("KEY:\t",i,"\n",e[i])
      }
      console.log("Performance.navigation.type:\n",PerformanceNavigationTiming.type)
    } )*/
	},
  computed: mapState(["user"]),
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
.page-content-wrapper {
  background-color: #fff !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

// validacao fields
