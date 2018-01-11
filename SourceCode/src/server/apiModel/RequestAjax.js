import axios from 'axios'
import router from '../../router'
import {Toast} from 'mint-ui'
import Config from '../common/config'
import Utils from '../../utils/crypto'
import Storage from '../../utils/localStorage'
// import Url from './HttpRequestApi'

if (!window.Promise) {
  window.Promise = Promise
}
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 在请求发出之前进行一些操作
  let tempID = ''
  let token = ''
  if (sessionStorage[Utils.stringToBase64('userInfo')]) {
    let userInfo = sessionStorage[Utils.stringToBase64('userInfo')]
    let userItem = JSON.parse(Utils.baseToString(userInfo))
    tempID = userItem.tempID
    token = userItem.token
  }

  config.headers = {
    'Content-Type': 'application/json',
    'clientType': Config.clientType,
    'tempID': tempID,
    'userToken': token
  }

  return config
}, function (err) {
    // Do something with request error
  return Promise.reject(err)
})
  // 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  // console.log('localStorage:', localStorage[Utils.stringToBase64('publicKey')])
    // 在这里对返回的数据进行处理
  return res
}, function (err) {
  // console.log('responseError:', err)
  // 检查是否需要授权
  if (err.response.status === 401) {
    Storage.clearCache()
    console.log(33333333)
    router.push('/login')
    return false
  } else if (err.response.status === 404) { // 404页面不存在
    router.push('/error')
  } else if (err.response.status === 500 || err.response.status === 501 || err.response.status === 502) { // 检查服务器500
    Toast({
      message: '服务器繁忙 稍后再试',
      duration: 2000
    })
  } else { // 其他错误
    Toast({
      message: '出错啦! ' + err.response.status + JSON.stringify(err.response.data),
      duration: 3000
    })
  }
    // Do something with response error
  return Promise.reject(err)
})

// 请求接口
export const httpFetch = (url, params) => {
  // 判断是否是登录进去的
  if (url !== '/api/user/login' && !sessionStorage[Utils.stringToBase64('userInfo')]) {
    router.push('/login')
  }
  // 处理请求参数
  if ((params !== null || params !== '') && Config.isEncrypt) {
      // 需要加密处理的接口
    Config.encryptApi.forEach((res) => {
      if (res.url === url) {
        let key = localStorage[Utils.stringToBase64('publicKey')] || ''
        res.fields.forEach((v) => {
          if (params[v]) {
            params[v] = Utils.encrypRsa(key, params[v])
          }
        })
      }
    })
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
