import {httpFetch} from '../../server/apiModel/RequestAjax'
import * as types from '../mutationType'

const state = {
  HttpRequestAjax: httpFetch, // 请求接口
  userInfo: null,
  isSuccess: 1, // 返回成功
  code: null // 返回成功

}

const getters = {
  userInfo: () => {
    if (state.userInfo === null) {
      let userInfo = {
        username: '',
        thumbnail_pic: '#'
      }
      state.userInfo = userInfo
    }
    return state.userInfo
  }
}

const mutations = {
    // 获取用户信息
  [types.GETUSERINFO] (state, obj) {
    state.HttpRequestAjax('das/userInfo').then((res) => {
      console.log('userInfo:', res)
      if (res.isSuccess === state.isSuccess && res.code === state.code) {
        state.userInfo = res.resData
      } else {
        console.log(res)
      }
    })
  }
}
export default {
  state,
  getters,
  mutations
}
