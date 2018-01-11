import * as types from '../mutationType'
import { Toast } from 'mint-ui'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import Func from '../../server/common/Func'
import ConstVariable from './common'

const state = {
  userInfo: {username: ''},
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
    let userInfo = sessionStorage[ConstVariable.Utils.stringToBase64('userInfo')]
    let userItem = JSON.parse(ConstVariable.Utils.baseToString(userInfo))
    state.userInfo.username = userItem.userName || ''
    // state.userInfo.username = ConstVariable.Utils.localRsaDecrypt(userItem.userName) || ''
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
        state.userInfo.username = res.resData.userName || ''
        // 针对用户一些重要信息使用RSA加密
        // res.resData.uid = ConstVariable.Utils.localRsaEncrypt(res.resData.uid)
        // res.resData.accountUid = ConstVariable.Utils.localRsaEncrypt(res.resData.accountUid)
        // res.resData.mobile = ConstVariable.Utils.localRsaEncrypt(res.resData.mobile)
        // res.resData.userName = ConstVariable.Utils.localRsaEncrypt(res.resData.userName)
        // res.resData.code = ConstVariable.Utils.localRsaEncrypt(res.resData.code)

        // 存储用户信息
        sessionStorage.setItem(ConstVariable.Utils.stringToBase64('userInfo'), ConstVariable.Utils.stringToBase64(JSON.stringify(res.resData)))

        ConstVariable.router.push('/home')
      } else {
        Toast(res.description)
      }
    })
  },

  // 用户登出
  [types.LOGOUT] (state, obj) {
    let $router = obj.$router
    ConstVariable.HttpRequestAjax(RequestUrl.logout).then((res) => {
      console.log(res)
      if (res.isSuccess === ConstVariable.isSuccess) {
        // 清楚缓存
        ConstVariable.Storage.clearCache()
        $router.push('/login')
      } else {
        Toast(res.description)
      }
    })
  },
  // 检查是否已经登录
  [types.CHECKISLOGIN] (state, obj) {
    let $router = obj.$router
    if (obj && obj.paths === '/login' && sessionStorage[ConstVariable.Utils.stringToBase64('userInfo')]) {
      $router.push('/home')
    } else {
      $router.push('/login')
    }
  }
}
export default {
  state,
  getters,
  mutations
}
