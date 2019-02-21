import service from '@/utils/request'
import qs from 'qs'
const OAUTH_API = '/jianzhumobile/mobile'


// 项目列表
export function getMeetingProject(data) {
  return service.post(OAUTH_API + '/pj/getMyProjectList.do', qs.stringify(data))
}

// 会议列表
export function meetingList(data) {
  return service.post(OAUTH_API + '/meeting/pc/search.do', qs.stringify(data))
}

// 会议通知 - 01、新增或编辑会议前开启计时
export function meetingPrepare(data) {
  return service.post(OAUTH_API + '/meeting/prepare.do', qs.stringify(data))
}

// 会议通知 - 02、获取所有与指定项目关联的组织及其成员
export function meetingGetProjectInfo(data) {
  return service.post(OAUTH_API + '/meeting/getProjectInfo.do', qs.stringify(data))
}
