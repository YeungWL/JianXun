import axios from 'axios'
import querystring from 'qs'
import router from '../../router'
import Toast from 'mint-ui'
import Config from '../common/config'
import Utils from '../../utils/crypto'
// import Url from './HttpRequestApi'

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
  console.log('localStorage:', localStorage[Utils.stringToBase64('publicKey')])
    // 在这里对返回的数据进行处理
  return res
}, function (err) {
  console.log('responseError:', err)
  // 检查是否需要授权
  if (err.response.status === 401) {
    router.push('/login')
  } else if (err.response.status === 404) { // 404页面不存在
    router.push('/error')
  } else if (err.response.status === 500 || err.response.status === 501 || err.response.status === 502) { // 检查服务器500
    console.log(11111111111)
    alert(654365373568765)
    Toast('服务器繁忙 稍后再试')
  } else { // 其他错误
    Toast({
      message: '出错啦! ' + err.response.status + JSON.stringify(err.response.data),
      duration: 5000
    })
  }
    // Do something with response error
  return Promise.reject(err)
})

// 请求接口
export const httpFetch = (url, params) => {
  // 处理请求参数
  if ((params !== null || params !== '') && Config.isEncrypt) {
      // 需要加密处理的接口
    Config.encryptApi.forEach((res) => {
      if (res.url === url) {
        let key = localStorage[Utils.stringToBase64('publicKey')] || ''
        res.fields.forEach((v) => {
          if (params[v]) {
            console.log(v)
            params[v] = Utils.encrypRsa(key, v)
          }
        })
      }
    })
  }
  return new Promise((resolve, reject) => {
    console.log('params', JSON.stringify(params))
    axios.post(url, querystring.stringify(params)).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
