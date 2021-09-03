import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import { Auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/productos',
    name: 'Products',
    component: Products,
    meta: {
      login: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.login)

  if (authRequired) {
    Auth.onAuthStateChanged(function (user) {
      if (!user) {
        next('/')
      } else {
        next()
      }
    })
  }
})

export default router
