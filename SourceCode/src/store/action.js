import * as types from './mutationType'
export default{
    // 获取用户信息
  getUserInfo: ({commit}, obj) => {
    commit(types.GETUSERINFO, obj)
  },
  // 用户登录
  login: ({commit}, obj) => {
    commit(types.LOGIN, obj)
  },
  // 获取公钥
  getPublicKey: ({commit}, obj) => {
    commit(types.GETPUBLICKEY, obj)
  }
}
