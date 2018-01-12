import postApi from '../apiModel/HttpRequestApi'
export default{
  isEncrypt: false, // 是否加密
  // 需要加密的字段接口
  encryptApi: [
      {url: postApi.login, fields: ['LoginInfo']}
  ],
  clientType: 3, // 渠道类型
  refreshCache: 0, // 0不缓存1 刷新缓存
  noRefreshPaths: ['/error', '/login']
}
