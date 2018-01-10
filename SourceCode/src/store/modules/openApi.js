import * as types from '../mutationType'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import ConstVariable from './common'

const state = {}
const mutations = {
  [types.GETPUBLICKEY] (state, obj) {
    ConstVariable.HttpRequestAjax(RequestUrl.getPublicKey).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess && res.code === ConstVariable.code) {
        let publicKey = res.resData.publicKey
            // 本地存储
        localStorage.setItem(ConstVariable.Utils.stringToBase64('publicKey'), publicKey)
      }
    })
  }
}

export default{
  state,
  mutations
}
