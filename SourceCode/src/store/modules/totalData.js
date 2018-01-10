import * as types from '../mutationType'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import ConstVariable from './common'
import { Toast } from 'mint-ui'
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
const getters = {
  registerInfo: state => state.registerInfo,
  enterSellerInfo: state => state.enterSellerInfo,
  enterOperationInfo: state => state.enterOperationInfo,
  consumInfo: state => state.consumInfo,
  cashInfo: state => state.cashInfo,
  tradeOrderInfo: state => state.tradeOrderInfo,
  serviceCodeInfo: state => state.serviceCodeInfo,
  consumerInfo: state => state.consumerInfo,
  intAccountConsumInfo: state => state.intAccountConsumInfo,
  cashAccountInfo: state => state.cashAccountInfo,
  wechatPayInfo: state => state.wechatPayInfo,
  alipayInfo: state => state.alipayInfo,
  crossMemberInfo: state => state.crossMemberInfo,
  bindServerCodeInfo: state => state.bindServerCodeInfo,
  storeInfo: state => state.storeInfo
}
const mutations = {
    // 获取总数统计
  [types.GETTOTALDATA] (state, obj) {
      // 注册用户总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.register}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.registerInfo.registerTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
    // 入驻商家总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.seller}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.enterSellerInfo.enterSellerTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
        // 入驻营运中心总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.operation}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.enterOperationInfo.enterOperationTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
    //       // 消费总额
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.consumption}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.consumInfo.consumTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
             // 提现总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.cash}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.cashInfo.cashTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                 // 交易订单总额
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.tradeOrder}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.tradeOrderInfo.tradeOrderTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                   // 出售服务码总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.serviceCode}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.serviceCodeInfo.serviceCodeTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                    // 消费者总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.consumer}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.consumerInfo.consumerTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                    // 积分账户消费
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.intAccountConsum}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.intAccountConsumInfo.intAccountConsumTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                      // 现金账户消费
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.cashAccount}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.cashAccountInfo.cashAccountTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                       // 微信支付
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.wechatPay}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.wechatPayInfo.wechatPayTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                         // 支付宝支付
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.alipay}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.alipayInfo.alipayTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                         // 跨界会员数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.crossMember}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.crossMemberInfo.crossMemberTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                           // 已绑服务码店数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.bindServerCode}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.bindServerCodeInfo.bindServerCodeTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
                           // 门店铺设总数
    ConstVariable.HttpRequestAjax(RequestUrl.statistics, {type: state.dataType.store}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.storeInfo.storeTotal = res.resData.amount
      } else {
        Toast(res.description)
      }
    })
  }

}

export default{
  state,
  getters,
  mutations
}
