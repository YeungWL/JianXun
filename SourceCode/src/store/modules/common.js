import {httpFetch} from '../../server/apiModel/RequestAjax'
import LocalStorage from '../../utils/localStorage'
import Utils from '../../utils/crypto'

export default{
  HttpRequestAjax: httpFetch, // 请求接口
  Storage: LocalStorage, // 本地浏览器缓存
  Utils: Utils, // 加密类
  clientType: 7, // 客户端类型
  clientSource: 1, // 设备系统类型（1：网站；2：安卓客户端；3：IOS客户端；4：其它 5：WinPhone）
  isSuccess: 1, // 返回成功
  code: null // 返回成功

}
