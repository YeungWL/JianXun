import service from '@/utils/request'
import qs from 'qs'
const OAUTH_API = '/jianzhumobile/mobile'

// 现场检查 - 1、现场检查问题列表
export function checkupQuestionList(data) {
  return service.post(OAUTH_API + '/ck/checkupQuestionList.do', qs.stringify(data))
}
// 现场检查 - 2、获取用户参与的项目列表
export function getMyInPro(data) {
  return service.post(OAUTH_API + '/ck/getMyInPro.do', qs.stringify(data))
}
// 现场检查 - 3、根据项目id查询我所在的组织和授权与我的组织
export function getOrgList(data) {
  return service.post(OAUTH_API + '/ck/getOrgList.do', qs.stringify(data))
}
// 现场检查 - 4、添加现场检查问题
export function inputQuestion(data) {
  return service.post(OAUTH_API + '/ck/inputQuestion.do', qs.stringify(data))
}
// 现场检查 - 5、问题的整改或复查页面
export function replyQuestionPage(data) {
  return service.post(OAUTH_API + '/ck/replyQuestionPage.do', qs.stringify(data))
}
// 现场检查 - 6、整改回复提交
export function rectifyCheckupQuestion(data) {
  return service.post(OAUTH_API + '/ck/rectifyCheckupQuestion.do', qs.stringify(data))
}
// 现场检查 - 7、组织授权
export function checkupOrgPermission(data) {
  return service.post(OAUTH_API + '/ck/checkupOrgPermission.do', qs.stringify(data))
}
// 现场检查 - 8、复查回复提交
export function reviewCheckupQuestion(data) {
  return service.post(OAUTH_API + '/ck/reviewCheckupQuestion.do', qs.stringify(data))
}
// 现场检查 - 9、查看历史记录
export function historyRecord(data) {
  return service.post(OAUTH_API + '/ck/historyRecord.do', qs.stringify(data))
}
// 现场检查 - 10、获取问题属性列表
export function questionAttr(data) {
  return service.post(OAUTH_API + '/ck/questionAttr.do', qs.stringify(data))
}
// 现场检查 - 11、获取检查类别列表
export function checkupType(data) {
  return service.post(OAUTH_API + '/ck/checkupType.do', qs.stringify(data))
}
// 现场检查 - 12、获取已授权的组织列表
export function getBeAuthorOrgs(data) {
  return service.post(OAUTH_API + '/ck/getBeAuthorOrgs.do', qs.stringify(data))
}
// 现场检查 - 13、获取未关联的组织列表
export function getNotBindOrgs(data) {
  return service.post(OAUTH_API + '/ck/getNotBindOrgs.do', qs.stringify(data))
}
// 现场检查 - 14、获取用户参与的项目
export function getMyPro(data) {
  return service.post(OAUTH_API + '/ck/getMyPro.do', qs.stringify(data))
}
// 现场检查 - 15、根据项目id查询组织
export function getOrgs(data) {
  return service.post(OAUTH_API + '/ck/getOrgs.do', qs.stringify(data))
}

// 现场检查 - 16、删除问题
export function deleteQues(data) {
  return service.post(OAUTH_API + '/ck/delete.do', qs.stringify(data))
}

// 现场检查 - 17、容量
export function capacity(data) {
  return service.post(OAUTH_API + '/ck/capacity.do', qs.stringify(data))
}