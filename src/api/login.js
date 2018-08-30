import service from '@/utils/request'
import qs from 'qs'

// 获取token
const OAUTH_API = '/jianzhumobile/mobile'

/*
 * 用户接口 - 3、验证用户唯一性
*/
export function checkUserName(data) {
  return service.post(OAUTH_API + '/checkUserName.do', qs.stringify(data))
}

/**
 * 接口名称：生成验证码
 */
export function codeUrl(data) {
  return process.env.BASE_API + OAUTH_API + '/imgCode.do?imageUid='+data.imageUid+'&token=' + data.token + '&t=' + new Date().getTime() + Math.random();
}
/**
 * 接口名称：验证验证码
 */
export function checkImgCode(data) {
  return service.post(OAUTH_API + '/checkImgCode.do', qs.stringify(data))
}
/**
 * 接口名称：验证用户登录
 */
export function login(data) {
  return service.post(OAUTH_API + '/login.do', qs.stringify(data))
}

/**
 * 接口名称：退出
 */
export function logout(data) {
  return service.post(OAUTH_API + '/logout.do', qs.stringify(data))
}

/**
 * 接口名称：获取用户信息
 */
export function getUserInfo(data) {
  return service.post(OAUTH_API + '/getUserInfo.do', qs.stringify(data))
}

/**
 * 接口名称：通过refreshToken获取用户访问令牌
 */
export function getUserAccessToken() {
  return service.post(OAUTH_API + '/getUserAccessToken.do', qs.stringify(data))
}

/**
 * 接口名称：用户接口 - 2、用户注册
 */
export function register(data) {
  return service.post(OAUTH_API + '/register.do', qs.stringify(data))
}

/**
 * 接口名称：用户接口 - 8、找回密码
 */
export function findPwd(data) {
  return service.post(OAUTH_API + '/findPwd.do', qs.stringify(data))
}


// 系统权限管理 - 18、获取自己具有的菜单按钮操作权限列表
export function getMyMenuList(data) {
  return service.post(OAUTH_API + '/privilege/getMyMenuList.do', qs.stringify(data))
}