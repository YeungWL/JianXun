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
Vue.config.productionTip = false

// 引入图形插件
Vue.prototype.$echarts = echarts
Vue.use(InfiniteScroll)

// 引入mockjs
require('./mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
