import axios from 'axios'
import querystring from 'qs'

if (!window.Promise) {
  window.Promise = Promise
}
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 在请求发出之前进行一些操作
  return config
}, function (err) {
    // Do something with request error
  return Promise.reject(err)
})
  // 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
    // 在这里对返回的数据进行处理
  return res
}, function (err) {
    // Do something with response error
  return Promise.reject(err)
})
// 请求接口
export const httpFetch = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, querystring.stringify(params)).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
