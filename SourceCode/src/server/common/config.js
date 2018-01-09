import postApi from '../apiModel/HttpRequestApi'
export default{
  isEncrypt: true, // 是否加密
  // 需要加密的字段接口
  encryptApi: [
      {url: postApi.login, fields: ['LoginInfo']}
  ]
}
