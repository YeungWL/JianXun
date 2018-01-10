import * as types from '../mutationType'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import ConstVariable from './common'

const state = {
  dataType: {register: 1, seller: 2, operation: 3, consumption: 4, cash: 5, tradeOrder: 6, serviceCode: 7, consumer: 8, intAccountConsum: 9, cashAccount: 10, wechatPay: 11, alipay: 12, crossMember: 13, bindServerCode: 14, store: 15},
  registerInfo: {registerTotal: 0, title: '注册用户总数'},
  enterSellerInfo: {enterSellerTotal: 0, title: '入驻商家总数'},
  enterOperationInfo: {enterOperationTotal: 0, title: '入驻营运中心总数'},
  consumInfo: {consumTotal: 0, title: '消费总额'},
  cashInfo: {cashTotal: 0, title: '提现总数'},
  tradeOrderInfo: {tradeOrderTotal: 0, title: '交易订单总额'},
  serviceCodeInfo: {serviceCodeTotal: 0, title: '出售服务码总数'},
  intAccountConsumInfo: {intAccountConsumTotal: 0, title: '积分账户消费'},
  consumerInfo: {consumerTotal: 0, title: '消费者总数'},
  cashAccountInfo: {cashAccountTotal: 0, title: '现金账户消费'},
  wechatPayInfo: {wechatPayTotal: 0, title: '微信支付'},
  alipayInfo: {alipayTotal: 0, title: '支付宝支付'},
  crossMemberInfo: {crossMemberTotal: 0, title: '跨界会员数'},
  bindServerCodeInfo: {bindServerCodeTotal: 0, title: '已绑服务码店数'},
  storeInfo: {storeTotal: 0, title: '门店铺设总数'}
}
const mutations = {
    // 获取总数统计
  [types.GETTOTALDATA] (state, obj) {
      // 注册用户总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.register}).then((res) => {})
  }

}

export default{
  state,
  mutations
}
