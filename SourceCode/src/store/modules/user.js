import {httpFetch} from '../../server/apiModel/RequestAjax'
import * as types from '../mutationType'
import { Toast } from 'mint-ui'

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
      if (res.isSuccess === state.isSuccess && res.code === state.code) {
        state.userInfo = res.resData
      } else {
        Toast(res.description)
      }
    })
  }
}
export default {
  state,
  getters,
  mutations
}
