import Vue from 'vue'
import Router from 'vue-router'
import { getAccessToken } from '@/utils/auth'
import { routers } from './router'

Vue.use(Router)// Vue全局使用Router

// 路由器配置
const RouterConfig = {
  routes: routers
}

// 注册路由
export const router = new Router(RouterConfig)
const whiteList = ['/login', '/register', '/findPwd']
// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否有token
  if (getAccessToken()) {
    if (to.path === '/' || to.path === '/login' || to.path === '/register' || to.path === '/findPwd') {
      next('/layout')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(_ => {
  window.scrollTo(0, 0)
})
