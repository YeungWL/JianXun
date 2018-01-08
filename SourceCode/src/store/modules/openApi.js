import * as types from '../mutationType'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import ConstVariable from './common'
import LocalStorage from '../../utils/localStorage'

const state = {}
const mutations = {
  [types.GETPUBLICKEY] (state, obj) {
    ConstVariable.HttpRequestAjax(RequestUrl.getPublicKey).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess && res.code === ConstVariable.code) {
        let publicKey = res.resData.publicKey
            // 本地存储
        LocalStorage.localSetItem('publicKey', publicKey)
      }
    })
  }
}

export default{
  state,
  mutations
}
