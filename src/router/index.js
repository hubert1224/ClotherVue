import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Interface from '@/components/MainInterface'
import Home from '@/components/Home'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/interface',
      name: 'Interface',
      component: Interface
    }
  ]
})
