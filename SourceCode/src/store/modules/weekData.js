import * as types from '../mutationType'
import RequestUrl from '../../server/apiModel/HttpRequestApi'
import ConstVariable from './common'
import { Toast } from 'mint-ui'
const state = {
  dataType: {order: 1, consumer: 2, enterSeller: 3, enterBusiness: 4, newUser: 5, payServerCode: 6, withDraw: 7},
  weekType: {this: 1, last: 2},
  orderInfo: {ThisWeek: [], LastWeek: [], title: '订单周期统计'},
  consumersInfo: {ThisWeek: [], LastWeek: [], title: '消费周期统计'},
  enterSellersInfo: {ThisWeek: [], LastWeek: [], title: '入驻商家周期统计'},
  enterBusinessInfo: {ThisWeek: [], LastWeek: [], title: '入驻运营中心周期统计'},
  newUserInfo: {ThisWeek: [], LastWeek: [], title: '新增用户周期统计'},
  withDrawInfo: {ThisWeek: [], LastWeek: [], title: '提现周期统计'},
  storageList: []
}
const getters = {
  orderInfo: state => state.orderInfo,
  consumersInfo: state => state.consumersInfo,
  enterSellersInfo: state => state.enterSellersInfo,
  enterBusinessInfo: state => state.enterBusinessInfo,
  newUserInfo: state => state.newUserInfo,
  payServerCodeInfo: state => state.payServerCodeInfo,
  withDrawInfo: state => state.withDrawInfo,
  storageData: (object) => {
    if (object && typeof object === 'object') {
      state.storageList.push(object)
      // localStorage.setItem('statistics', JSON.stringify(state.storageList))
    }
  }
}
const mutations = {

    // 获取周期统计
  [types.GETWEEKDATA] (state, obj) {
    // 周期订单本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.order}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.orderInfo.ThisWeek.push(weekInfo[i].amount)
        }
        // getters.storageData({'orderInfoNow': state.orderInfo.ThisWeek})
      } else {
        Toast(res.description)
      }
    })
    // 周期订单上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.order}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.orderInfo.LastWeek.push(weekInfo[i].amount)
        }
        // getters.storageData({'orderInfoLast': state.orderInfo.LastWeek})
      } else {
        Toast(res.description)
      }
    })

    // 周期消费本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.consumer}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.consumersInfo.ThisWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })
      // 周期消费上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.consumer}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.consumersInfo.LastWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })

    // 周期入驻商家本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.enterSeller}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.enterSellersInfo.ThisWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })
        // 周期入驻商家上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.enterSeller}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.enterSellersInfo.LastWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })

    // 周期运营中心本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.enterBusiness}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.enterBusinessInfo.ThisWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })
          // 周期运营中心上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.enterBusiness}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.enterBusinessInfo.LastWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })

    // 周期新增用户本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.newUser}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.newUserInfo.ThisWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })
            // 周期新增用户上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.newUser}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.newUserInfo.LastWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })

    // 周期已提现本周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.this, Type: state.dataType.withDraw}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.withDrawInfo.ThisWeek = []
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.withDrawInfo.ThisWeek.push(weekInfo[i].amount)
        }
      } else {
        Toast(res.description)
      }
    })
            // 周期已提现上周统计
    ConstVariable.HttpRequestAjax(RequestUrl.period, {WeekType: state.weekType.last, Type: state.dataType.withDraw}).then((res) => {
      if (res.isSuccess === ConstVariable.isSuccess) {
        state.withDrawInfo.LastWeek = []
        let weekInfo = res.resData.statistic
        for (let i = 0, length = weekInfo.length; i < length; i++) {
          state.withDrawInfo.LastWeek.push(weekInfo[i].amount)
        }
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
