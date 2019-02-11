import service from '@/utils/request'
import qs from 'qs'
const OAUTH_API = '/jianzhumobile/mobile'

export function meetingList(data) {
  return service.post(OAUTH_API + '/meeting/pc/search.do', qs.stringify(data))
}
