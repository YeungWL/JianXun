import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

// 内容管理 - 1、获取所有栏目数据
export function columnListAll(data) {
  return service.post(OAUTH_API + '/cms/column/listAll.do', qs.stringify(data))
}

// 内容管理 - 2、查询指定父栏目的子栏目列表
export function columnChildList(data) {
  return service.post(OAUTH_API + '/cms/column/childList.do', qs.stringify(data))
}
// 内容管理 - 3、提交栏目（添加或编辑）
export function columnSubmit(data) {
  return service.post(OAUTH_API + '/cms/column/submit.do', qs.stringify(data))
}

// 内容管理 - 4、获取指定栏目的信息
export function columnInfo(data) {
  return service.post(OAUTH_API + '/cms/column/info.do', qs.stringify(data))
}

// 内容管理 - 5、停用或启用某个栏目
export function columnDisableOrEnable(data) {
  return service.post(OAUTH_API + '/cms/column/disableOrEnable.do', qs.stringify(data))
}

// 内容管理 - 6、验证栏目编码是否合法
export function columnCheckCode(data) {
  return service.post(OAUTH_API + '/cms/column/checkCode.do', qs.stringify(data))
}



