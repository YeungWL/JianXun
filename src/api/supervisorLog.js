import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

//  获取施工日志历史记录
export function historyList(data) {
  return service.post(OAUTH_API + '/buildLog/buildAttrHistorys.do', qs.stringify(data))
}

//  获取监理日志项目列表
export function getMyInPro(data) {
  return service.post(OAUTH_API + '/ck/getMyInPro.do', qs.stringify(data))
}

//现场检查 - 13、获取未关联的组织列表
export function getNotBindOrgs(data) {
  return service.post(OAUTH_API + '/ck/getNotBindOrgs.do', qs.stringify(data))
}

//  获取监理日志组织列表
export function getSupervisorMyOrgs(data) {
  return service.post(OAUTH_API + '/supervision/getMyOrgs.do', qs.stringify(data))
}

// 监理日志 - 2、获取模板列表
export function getTempList(data) {
  return service.post(OAUTH_API + '/supervision/getTempList.do', qs.stringify(data))
}

// 监理日志 - 11、添加日志
export function addTemp(data) {
  return service.post(OAUTH_API + '/supervision/addTemp.do', qs.stringify(data))
}

// 监理日志 - 10、获取日志列表
export function getAddTempList(data) {
  return service.post(OAUTH_API + '/supervision/getAddTempList.do', qs.stringify(data))
}

// 监理日志 - 12、修改日志模板扩展名
export function editExtendName(data) {
  return service.post(OAUTH_API + '/supervision/editExtendName.do', qs.stringify(data))
}

// 监理日志 - 3、获取已授权查阅的组织列表
export function getBeReferOrgs(data) {
  return service.post(OAUTH_API + '/supervision/getBeReferOrgs.do', qs.stringify(data))
}

// 监理日志 - 4、查阅授权
export function setPermission(data) {
  return service.post(OAUTH_API + '/supervision/setPermission.do', qs.stringify(data))
}

// 监理日志 - 4、查阅授权
export function inputPage(data) {
  return service.post(OAUTH_API + '/supervision/inputPage.do', qs.stringify(data))
}

// 监理日志 - 6、创建或更新监理日志
export function saveSupervision(data) {
  return service.post(OAUTH_API + '/supervision/saveSupervision.do', qs.stringify(data))
}
