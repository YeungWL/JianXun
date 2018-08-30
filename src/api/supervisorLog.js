import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

//  获取施工日志历史记录
export function historyList(data) {
  return service.post(OAUTH_API + '/buildLog/buildAttrHistorys.do', qs.stringify(data))
}
