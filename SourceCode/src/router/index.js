import Vue from 'vue'
import Router from 'vue-router'
import UserManagement from '@/view/home/userManagement'
import Login from '@/view/user/login'
import Home from '@/view/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/userManagement',
      name: 'UserManagement',
      component: UserManagement
    }
  ]
})
