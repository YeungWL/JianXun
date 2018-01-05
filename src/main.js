// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

let students = {name: 'gregth', hah: '54563426', ddd: '543654'}
// let students = {
//   xiaomin: {
//     name: 'xiaoming',
//     grade: 1
//   },
//   teemo: {
//     name: 'teemo',
//     grade: 3
//   }
// }
if (typeof (students) === 'object' &&
Object.prototype.toString.call(students).toLowerCase() === '[object object]' && !students.length) {
  console.log(students)
} else {
  console.log(5436524)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
