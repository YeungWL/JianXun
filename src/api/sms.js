import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

/*
 * 短信验证码接口 - 1、发送短信验证码
*/
export function sendMsmCode(data) {
  return service.post(OAUTH_API + '/sms/sendMsmCode.do', qs.stringify(data))
}

/**
 * 接口名称：短信验证码接口 - 2、验证短信码唯一性
 */
export function checkMsmCode(data) {
  return service.post(OAUTH_API + '/sms/checkMsmCode.do', qs.stringify(data))
}
/**
 * 接口名称：短信验证码接口 - 3、查询手机短信码
 */
export function getMsmCode(data) {
  return service.post(OAUTH_API + '/sms/getMsmCode.do', qs.stringify(data))
}
