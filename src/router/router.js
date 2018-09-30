import Vue from 'vue'
import Router from 'vue-router'

// 项目管理 - 路由表
import projectManage from './projectManage'
// 文库管理 - 路由表
import libraryManage from './libraryManage'
// 项目管理
import organizations from './organization.router'
// 日志管理
import record from './record'
// 系统管理 - 路由表
import systemManage from './systemManage'
// 个人中心 - 路由表
import personalManage from './personalManage'
// 监理日志 - 路由表
import supervisorLog from './supervisorLog'
// 现场检查 - 路由表
import checking from './checking'
// 三级教育 - 路由表
import education from './education'

/** 登录 */
const login = resolve => require(['@/views/login/login'], resolve)
/** 注册 */
const register = resolve => require(['@/views/register/register'], resolve)
/** 找回密码 */
const findPwd = resolve => require(['@/views/findPwd/findPwd'], resolve)

const layout = resolve => require(['@/views/layout/layout'], resolve)

Vue.use(Router)
/**
 * routes==默认路由节点
 */

export const routers = [{
  path: '/',
  redirect: '/login',
  meta: {
    requireAuth: true
  }
},
{
  path: '/login',
  name: 'login',
  component: login
},
{
  path: '/register',
  name: 'register',
  component: register
},
{
  path: '/findPwd',
  name: 'findPwd',
  component: findPwd
},
{
  path: '/layout',
  name: 'layout',
  redirect: '/project',
  component: layout,
  children: [projectManage, libraryManage, organizations, systemManage, personalManage, record, supervisorLog, checking, education]
},
// 当页面地址和上面任一地址不匹配，则跳转到404
{
  path: '*',
  redirect: '/error/404'
}
]
