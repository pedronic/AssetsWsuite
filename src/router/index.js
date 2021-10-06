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
    path: '/dash-analitico',
    name: 'DashAnalitico',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashAnalitico.vue')
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
