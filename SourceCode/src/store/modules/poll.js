import * as types from '../mutationType'
import Config from '../../server/common/config'
// import { Toast } from 'mint-ui'
// import RequestUrl from '../../server/apiModel/HttpRequestApi'
// import Func from '../../server/common/Func'
// import ConstVariable from './common'

const state = {
  paths: '', // 当前请求路径
  isRefresh: true, // 是否刷新页面
  isLoadPath: false
}

const mutations = {
  [types.POLLINGTIME] (state, obj) {
    let pathname = obj.pathname || ''
    // 存储当前时间
    localStorage.setItem(pathname + '-time', Date.parse(new Date()))
   // 定时执行
    setInterval(() => {
      let times = Date.parse(new Date())
      let localTime = localStorage.getItem(pathname + '-time') || null
      let sec = parseInt(times - localTime)
      let min = 5 // 1分钟
      console.log('sec:', parseInt(sec / 1000))
      // 检测本地是否已经有缓存
      if (localTime !== null) {
        console.log(1111111111111)
          // 倘若存在缓存时间 检测路由是否已经发生改变
        if (!Config.noRefreshPaths.includes(state.paths) && state.isLoadPath) {
          console.log(2222222222222)
            // 检测时间是否已经过期 需要请求新的数据
          if (localTime && sec > 0 && parseInt(sec / 1000) >= min) {
            console.log(333333333333333)
              // 已过期 需要请求新的数据
            state.isRefresh = true
            // 重新设置缓存时间
            localStorage.setItem(pathname + '-time', Date.parse(new Date()))
          } else {
            console.log(4444444444444)
            state.isRefresh = false
            state.isLoadPath = false
          }
        } else {
            // 检测时间是否已经过期 需要请求新的数据 路由没发生改变
          if (!Config.noRefreshPaths.includes(state.paths) && localTime && sec > 0 && parseInt(sec / 1000) >= min) {
            console.log(55555555555555)
            // 已过期 请求新的数据
            state.isRefresh = false
            // 重新设置缓存时间
            localStorage.setItem(pathname + '-time', Date.parse(new Date()))
          } else {
            console.log(6666666666666)
            state.isRefresh = true
            // state.isLoadPath = true
          }
          state.isLoadPath = false
        }
      }
    }, 5000)
  }
}

export default{
  state,
  mutations
}
