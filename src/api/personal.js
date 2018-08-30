import service from '@/utils/request'
import qs from 'qs'
const OAUTH_API = '/jianzhumobile/mobile'

// /jianzhumobile/mobile/getUserInfo.do


//获取用户信息
export function getUserInfo(data) {
  return service.post(OAUTH_API + '/getUserInfo.do', qs.stringify(data))
}

//修改用户信息
export function updateUserInfo(data) {
  return service.post(OAUTH_API + '/updateUserInfo.do', qs.stringify(data))
}

// 用户接口 - 9、修改密码
export function editPwd(data) {
  return service.post(OAUTH_API + '/editPwd.do', qs.stringify(data))
}

// 用户接口 - 11、获取专家资格类型列表
export function zjzgCateList(data) {
  return service.post(OAUTH_API + '/zjzgCateList.do', qs.stringify(data))
}

// 用户接口 - 12、获取执业资格类型列表
export function zyzgCateList(data) {
  return service.post(OAUTH_API + '/zyzgCateList.do', qs.stringify(data))
}

// 用户接口 - 13、获取学位分类列表
export function xueweiCateList(data) {
  return service.post(OAUTH_API + '/xueweiCateList.do', qs.stringify(data))
}

// 用户接口 - 14、获取学历分类列表
export function xueliCateList(data) {
  return service.post(OAUTH_API + '/xueliCateList.do', qs.stringify(data))
}

// 用户接口 - 15、获取职称列表
export function zhiChengCateList(data) {
  return service.post(OAUTH_API + '/zhiChengCateList.do', qs.stringify(data))
}

// 用户接口 - 6、上传用户头像
export function uploadUserLogo(data) {
  return service.post(OAUTH_API + '/uploadUserLogo.do', qs.stringify(data))
}

//我的收藏 - 1、获取我的收藏列表
export function getFavourite(data) {
  return service.post(OAUTH_API + '/fav/getFavourite.do', qs.stringify(data))
}

//我的收藏 - 1、删除我的收藏
export function delFavourite(data) {
  return service.post(OAUTH_API + '/fav/delFavourite.do', qs.stringify(data))
}

//反馈管理 - 1、提交反馈内容
export function feedback(data) {
  return service.post(OAUTH_API + '/feedback/addFeedback.do', qs.stringify(data))
}