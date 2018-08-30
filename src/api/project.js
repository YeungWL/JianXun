import service from '@/utils/request'
import qs from 'qs'
const OAUTH_API = '/jianzhumobile/mobile'

export function getMyProjectList(data) {
  return service.post(OAUTH_API + '/pj/getMyProjectList.do', qs.stringify(data))
}
// 创建项目
export function addProject(data) {
  return service.post(OAUTH_API + '/pj/addProject.do', qs.stringify(data))
}
// 修改项目
export function updateProject(data) {
  return service.post(OAUTH_API + '/pj/updateProject.do', qs.stringify(data))
}
// 管理项目(关联项目)
export function getManageProjectList(data) {
  return service.post(
    OAUTH_API + '/pj/getManageProjectList.do',
    qs.stringify(data)
  )
}
// 获取申请项目的组织
export function getApplyOrgList(data) {
  return service.post(OAUTH_API + '/pj/getApplyOrgList.do', qs.stringify(data))
}
// 对申请组织的操作(拒绝或同意加入,申请退出,拒绝退出或同意退出
export function doApplyOrg(data) {
  return service.post(OAUTH_API + '/pj/doApplyOrg.do', qs.stringify(data))
}
