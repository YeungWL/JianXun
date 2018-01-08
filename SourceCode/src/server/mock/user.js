import api from '../apiModel/HttpRequestApi'

const Mock = require('mockjs')

// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const userData = function () {
  let returnData = {
    'isSuccess': 1,
    'code': null,
    'description': null,
    'resData':
    {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      username: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
  }
  return returnData
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(api.userInfo, 'post', userData)
