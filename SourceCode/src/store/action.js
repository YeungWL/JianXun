import * as types from './mutationType'
export default{
    // 获取用户信息
  getUserInfo: ({commit}, obj) => {
    commit(types.GETUSERINFO, obj)
  }
}
