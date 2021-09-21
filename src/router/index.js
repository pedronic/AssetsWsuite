import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { userKey } from '@/config/global'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/license',
    name: 'License',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/License.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/relatorios-faturamento',
    name: 'RelatoriosFaturamento',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RelatoriosFaturamento.vue')
  },
  {
    path: '/registro-agentes',
    name: 'RegistroAgentes',
    component: () => import( '../views/RegistroAgentes.vue')
  },
  {
    path: '/lista-de-agentes',
    name: 'ListaAgentes',
    component: () => import( '../views/ListaAgentes.vue')
  },
  {
    path:'/registro-usuarios',
    name: 'RegistroUsuarios',
    component: () => import('../views/RegistroUsuarios.vue')
  },
  {
    path: '/lista-de-robos',
    name: 'ListaRobos',
    component: () => import( '../views/ListaRobos.vue')
  },
  {
    path:'/registro-robos',
    name: 'RegistroRobos',
    component: () => import('../views/RegistroRobos.vue')
  },
  {
    path:'/lista-de-usuarios',
    name: 'ListaUsuarios',
    component: () => import('../views/ListaUsuarios.vue')
  },
  {
    path: '/dash-analitico',
    name: 'DashAnalitico',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashAnalitico.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if(to.matched.some(record => record.meta.requiresAdmin)) {
      const user = JSON.parse(json)
      user && user.admin ? next() : next({ path: '/' })
  } else {
      next()
  }
});

export default router
