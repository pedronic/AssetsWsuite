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
    component: () => import( '../views/Cadastrar/RegistroAgentes.vue')
  },
  {
    path: '/registro-operadoras',
    name: 'RegistroOperadoras',
    props: true,
    component: () => import( '../views/Cadastrar/RegistroOperadoras.vue')
  },
  {
    path: '/registro-mailing',
    name: 'RegistroMailing',
    component: () => import( '../views/Cadastrar/RegistroMailing.vue')
  },
  {
    path: '/registro-servidores',
    name: 'RegistroServidores',
    component: () => import( '../views/Cadastrar/RegistroServidores.vue')
  },
  {
    path: '/lista-de-mailing',
    name: 'ListaMailing',
    component: () => import( '../views/Listas/ListaMailing.vue')
  },
  {
    path: '/lista-de-servidores',
    name: 'ListaServidores',
    component: () => import( '../views/Listas/ListaServidores.vue')
  },
  {
    path: '/lista-de-finalizacoes',
    name: 'ListaFinalizacoes',
    component: () => import( '../views/Listas/ListaFinalizacoes.vue')
  },
  {
    path: '/lista-de-operadoras',
    name: 'ListaOperadoras',
    component: () => import( '../views/Listas/ListaOperadoras.vue')
  },
  {
    path: '/lista-de-agentes',
    name: 'ListaAgentes',
    component: () => import( '../views/Listas/ListaAgentes.vue')
  },
  {
    path:'/registro-usuarios',
    name: 'RegistroUsuarios',
    component: () => import('../views/Cadastrar/RegistroUsuarios.vue')
  },
  {
    path: '/lista-de-robos',
    name: 'ListaRobos',
    component: () => import( '../views/Listas/ListaRobos.vue')
  },
  {
    path:'/registro-robos',
    name: 'RegistroRobos',
    component: () => import('../views/Cadastrar/RegistroRobos.vue')
  },
  {
    path: '/lista-de-scripts',
    name: 'ListaScripts',
    component: () => import( '../views/Listas/ListaScripts.vue')
  },
  {
    path: '/lista-de-filas',
    name: 'ListaFilas',
    component: () => import( '../views/Listas/ListaFilas.vue')
  },
  {
    path:'/registro-scripts',
    name: 'RegistroScripts',
    component: () => import('../views/Cadastrar/RegistroScripts.vue')
  },
  {
    path:'/registro-finalizacoes',
    name: 'RegistroFinalizacoes',
    component: () => import('../views/Cadastrar/RegistroFinalizacoes.vue')
  },
  {
    path:'/lista-de-usuarios',
    name: 'ListaUsuarios',
    component: () => import('../views/Listas/ListaUsuarios.vue')
  },
  {
    path: '/dash-analitico',
    name: 'DashAnalitico',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashAnalitico.vue')
  },
  {
    path: '/dash-filas',
    name: 'DashFilas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashFilas.vue')
  },
  {
    path: '/blacklist',
    name: 'Blacklist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Listas/Blacklist.vue')
  },
  {
    path: '/registro-blacklist',
    name: 'RegistroBlacklist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cadastrar/RegistroBlacklist.vue')
  },
  {
    path: '/perfil-usuario',
    name: 'Perfil',
    props: true,
    component: () => import('../views/PerfilDeUsuario/Perfil.vue')
  },
  {
    path: '/lista-de-perfil',
    name: 'PerfilLista',
    // replace: true,
    component: () => import('../views/PerfilDeUsuario/PerfilLista.vue')
  },
  {
    path: '/pausas',
    name: 'Pausas',
    // replace: true,
    component: () => import('../views/Pausas/Pausas.vue')
  },
  {
    path: '/grupo-de-pausas',
    name: 'PausasGrupo',
    component: () => import('../views/Pausas/PausasGrupo.vue')
  },
  {
    path: '/cadastrar-filas',
    name: 'FilasCadastro',
    props: true,
    component: () => import('../views/Filas/FilasCadastro.vue')
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
