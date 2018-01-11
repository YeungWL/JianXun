import Vue from 'vue'
import Router from 'vue-router'
import UserManagement from '@/view/home/userManagement'
import Login from '@/view/user/login'
import Home from '@/view/home/home'
import NotFount from '@/view/error/noFiles'
import businessManagement from '@/view/home/businessManagement'
import developing from '@/view/error/developing'
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
      meta: {keepAlive: 1},
      name: 'Home',
      component: Home
    },
    {
      path: '/userManagement',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/businessManagement',
      name: 'businessManagement',
      component: businessManagement
    },
    {
      path: '/developing',
      name: 'developing',
      component: developing
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
