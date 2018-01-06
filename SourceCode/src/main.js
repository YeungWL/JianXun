// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import echarts from 'echarts'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Vue.prototype.activeState = false
// Vue.prototype.$isOpen = (value) => {
//   console.log(value)
//   this.activeState = value
//   console.log('activeState:', this.activeState)
//   return value
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
