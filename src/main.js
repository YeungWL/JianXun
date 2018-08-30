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
import * as filters from './filters/filters.js'

// 日历
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文
//import 'es6-promise'//引入axios插件

// 引入全局过滤器
import './filters/globalFilters'

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

Vue.prototype.getToken = function (){//changeData是函数名
  return "PC_JIANXUN_APP2018";
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
