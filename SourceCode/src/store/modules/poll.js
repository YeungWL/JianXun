import * as types from '../mutationType'
import state from '../state'
// import Config from '../../server/common/config'
// import { Toast } from 'mint-ui'
// import RequestUrl from '../../server/apiModel/HttpRequestApi'
// import Func from '../../server/common/Func'
// import ConstVariable from './common'

const mutations = {
  [types.POLLINGTIME] (state, obj) {
   // 存储当前时间
    localStorage.setItem('nowData', Date.parse(new Date()))
   // 定时执行
    setInterval(() => {
      let times = Date.parse(new Date())
      let localTime = localStorage.getItem('nowData') || localStorage.setItem('nowData', Date.parse(new Date()))
      let sec = parseInt(times - localTime)
      let min = 5 // 1分钟
      console.log('sec:', parseInt(sec / 1000))
      if (localTime && sec > 0 && parseInt(sec / 1000) >= min) {
    //     if (!Config.noRefreshPaths.includes(.state.paths) && store.state.isLoadPath) {
    //  // console.log('hahaha:', 5436545768979)
    //       store.state.isRefresh = true
        localStorage.setItem('nowData', Date.parse(new Date()))
      } else {
        // store.state.isRefresh = false
        // store.state.isLoadPath = false
      }
    }, 5000)
  }
}

export default{
  state,
  mutations
}
