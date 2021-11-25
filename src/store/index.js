import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    dashboard: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if(user) {
          axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
          
      } else {
          delete axios.defaults.headers.common['Authorization']
          
      }
    },
    setDashboard(state, dashboard) {
        
      if(dashboard === undefined){
        state.dashboard = !state.dashboard
      }else{
        state.dashboard = dashboard
      }
        
       
      console.log('stado do dash',state.dashboard)
    },
   
  },
  actions: {
  },
  modules: {
  }
})
