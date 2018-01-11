/**
 * 存放公用的变量函数
 */
const state = {
  isOpen: false, // sidebar窗口
  gwRegPattern: /^[GW]+\d{8,9}$/, // 验证GW号
  mobileRegPattern: /^1(3|4|5|7|8)\d{9}$/, // 验证手机号码
  myChartList: []

}

export default state
