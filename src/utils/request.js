import axios from 'axios'
import store from '@/store'

// 创建实例时设置配置的默认值
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000// 请求超时时间
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.accessToken) {
      if (config.method === 'get') {
        if (!config.params) {
          config.params = {}
        }
        if (!config.params.access_token) {
          config.params.access_token = store.getters.accessToken
        }
      } else if (config.method === 'post') {
        // console.log(this.getToken())
        if (!config.data.includes('access_token')) {
          config.data = config.data + '&accessToken=' + store.getters.accessToken + '&token=' + 'PC_JIANXUN_APP2018'
        }
      }
  //  headers: { 'X-Token': store.getters.token }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
/**
* 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
* 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
*/
service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('logout').then(_ => {
            location.reload()
          })
          break
        default:
          return Promise.reject(error.response.data)
      }
    } else {
      return Promise.reject(error.response.data)
    }
  }

)

export default service
