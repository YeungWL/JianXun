// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import router from './router'
import { InfiniteScroll } from 'mint-ui'
import echarts from 'echarts'
import store from './store'
import Config from './server/common/config'
Vue.config.productionTip = false

// 引入图形插件
Vue.prototype.$echarts = echarts
Vue.use(InfiniteScroll)

// 引入mockjs
require('./mock.js')
// 存储当前时间
localStorage.setItem('nowData', Date.parse(new Date()))
// 定时执行
setInterval(() => {
  let times = Date.parse(new Date())
  let localTime = localStorage.getItem('nowData') || localStorage.setItem('nowData', Date.parse(new Date()))
  let sec = parseInt(times - localTime)
  let min = 60 // 1分钟
 // console.log('sec:', parseInt(sec / 1000))
  if (localTime && sec > 0 && parseInt(sec / 1000) >= min) {
    if (!Config.noRefreshPaths.includes(store.state.paths) && store.state.isLoadPath) {
     // console.log('hahaha:', 5436545768979)
      store.state.isRefresh = true
      localStorage.setItem('nowData', Date.parse(new Date()))
    }
  } else {
    store.state.isRefresh = false
    store.state.isLoadPath = false
  }
}, 5000)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
