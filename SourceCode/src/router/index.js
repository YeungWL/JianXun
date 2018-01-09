import Vue from 'vue'
import Router from 'vue-router'
import UserManagement from '@/view/home/userManagement'
import Login from '@/view/user/login'
import Home from '@/view/home/home'
import NotFount from '@/view/error/noFiles'

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
    },
    {
      path: '/error',
      name: 'NotFount',
      component: NotFount
    },
    {
      path: '/*',
      redirect: '/error'
    }
  ]
})
