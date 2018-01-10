import * as types from '../mutationType'
import { Toast } from 'mint-ui'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import Func from '../../server/common/Func'
import ConstVariable from './common'

const state = {
  userInfo: null,
  loginInfo: {userAccount: '', password: '', isRemember: 0}// 用户登录信息

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
  },
  loginInfo: state => state.loginInfo
}

const mutations = {
    // 获取用户信息
  [types.GETUSERINFO] (state, obj) {
    ConstVariable.HttpRequestAjax(RequestUrl.userInfo).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess && res.code === ConstVariable.code) {
        state.userInfo = res.resData
      } else {
        Toast(res.description)
      }
    })
  },

  // 用户登录
  [types.LOGIN] (state, obj) {
    let loginType = Func.validateAccount(state.loginInfo.userAccount)
    let params = {
      LoginInfo: loginType + '\t' + state.loginInfo.userAccount + '\t' + state.loginInfo.password + '\t' + ConstVariable.clientType,
      DeviceIdentity: '',
      ClientSource: ConstVariable.clientSource
    }
    ConstVariable.HttpRequestAjax(RequestUrl.login, params).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess && res.code === '1000') {
        // 存储用户信息
        ConstVariable.Storage.sessionSetItem('userInfo', JSON.stringify(res.resData))
        ConstVariable.router.push('/home')
      } else {
        Toast(res.description)
      }
      console.log(res)
    })
  }
}
export default {
  state,
  getters,
  mutations
}
