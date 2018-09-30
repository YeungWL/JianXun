// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//引入vue
import App from './App.vue'//引入入口模块
import { router } from './router'//引入路由插件
import store from './store'
import ElementUI from 'element-ui'//引入element-ui插件
import api from '@/api' // 引入接口文档
import cookie from '@/utils/cookie' // 引入cookie
import 'element-ui/lib/theme-chalk/index.css'//引入公共样式
import 'normalize.css/normalize.css'
import '../static/iconfont/iconfont.css'//引入iconfont公共图标库样式
import 'styles/theme.less' //引入换肤样式
import 'styles/color.less' //引入换肤共用样式
import 'styles/index.scss'
import 'es6-promise'
import axios from 'axios'
import * as filters from './filters/filters.js'

// 日历
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文
//import 'es6-promise'//引入axios插件

// 引入全局过滤器
import './filters/globalFilters'
Vue.prototype.axios = axios
Vue.use(ElementUI)

// import UI from './components/index';
// Vue.use(UI) 

import uiComponents from "@/components/index";
Vue.use(uiComponents);

import thor from 'thor-x'
import 'thor-x/dist/index.css'
Vue.use(thor)


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// // 把api文件添加到原型中
Vue.prototype.$api = api
// // 把cookie添加到原型中  组件内使用方法 存：this.$cookie.set(key,value) 取 this.$cookie.get(key) 删 this.$cookie.remove(key)
Vue.prototype.$cookie = cookie

Vue.prototype.getToken = function (){
  return "PC_JIANXUN_APP2018";
  // return "PC_JIANXUN_APP201966";
}

Vue.prototype.baseURL = function (){
  return "http://120.25.121.72";
  // return "http://www.jianxunhulian.com";
}
// 改变数据格式
// let f = (objItem = [], rootsArr = []) => {
//   if (objItem.length > 0) {
//     objItem.forEach(item => {
//       rootsArr.push(item)
//       if (item.children && item.children.length > 0) {
//         f(item.children, rootsArr)
//       }
//     })
//   }
//   let defaultRoutes = [
//     { url: '/login' },
//     { url: '/register' },
//     { url: '/login' },
//     { url: '/error/404' },
//     { url: '/index' }
//   ] // 默认路由
//   return rootsArr.concat(defaultRoutes)
// }
// router.beforeEach((to, from, next) => {
//   let modelS = [...document.getElementsByClassName('v-modal')]
//   modelS.forEach(item => {
//     item.style.display = 'none'
//   })
//   window.scroll(0, 0)
//   if (true) {
//     let defaultRoutes = [
//       { url: '/login' },
//       { url: '/register' },
//       { url: '/login' },
//       { url: '/error/404' },
//       { url: '/index' }
//     ] // 默认路由
//     defaultRoutes.forEach(item => {
//       if (to.fullPath == item.url) {
//         next()
//       }
//     })
//     if (
//       store.state.menuRoots.rootLists &&
//       store.state.menuRoots.rootLists.length > 0
//     ) {
//       let permissionList = f(store.state.menuRoots.rootLists)
//       // ajax获取权限列表函数
//       // 这里省略了一些判断条件，比如判断是否已经拥有了权限数据等
//       let isPermission = false
//       permissionList.forEach(v => {
//         // 判断跳转的页面是否在权限列表中
//         if (v.url == to.fullPath) {
//           isPermission = true
//         }
//       })

//       // 没有权限时跳转到404页面
//       if (to.fullPath == '/error/404' || isPermission) {
//         // debugger
//         next()
//       } else {
//            next() // 没调试好，暂时备注掉/**/

// //      next({ path: '/error/404', replace: true })
//       }
//     } else {
//       //			next({path: "/login", replace: true})
//       next()
//     }
//   }
// })
// //获取子菜单数据
Vue.prototype.$getChildrenMenu=function(menuCode){
  let userAuthorityList=JSON.parse(this.$store.getters.rootLists);
  for(let i=0;i<userAuthorityList.length;i++){
    if(userAuthorityList[i].menuCode==menuCode){
       return userAuthorityList[i].childList;
      // console.log('getChildrenMenu:'+userAuthorityList[i].childList);
    }
  }
};
//获取最后子菜单数据
Vue.prototype.$getLastChildrenMenu=function(menuCode){
  let userAuthorityList=JSON.parse(this.$store.getters.rootLists);
  // console.log(userAuthorityList);
  for(let i=0;i<userAuthorityList.length;i++){
    if(userAuthorityList[i].childList&&userAuthorityList[i].childList.length>=1){
      // console.log(userAuthorityList[i].childList);
      for(let j=0;j<userAuthorityList[i].childList.length;j++){
        //console.log(userAuthorityList[i].childList[j].path);
        if(userAuthorityList[i].childList[j].menuCode==menuCode){
            return  userAuthorityList[i].childList[j].childList;
        }
      }
    }

  }
}
/* eslint-disable no-new */
/**
 * new Vue实例化了vue对象
 * el指定vue通过#app这个标签来渲染vue
 * 实例中如果组件和引入的文件模块同名，那么就可以省略后面部分，比如router部分可以写为router:router，因为同名，所以直接写router也是可以的
 * '<App/>'指代app.vue，template就是选择vue实例要加载哪个模板，也就是声明了App.vue是主程序，其他所有的.vue都是放在App.vue中
 * components: { App } 声明这个主入口是用的上面引入的App模块。
 */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
