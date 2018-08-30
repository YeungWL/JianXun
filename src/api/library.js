import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

// 文库管理-获取文库列表
export function lawList(data) {
  return service.post(OAUTH_API + '/lawList.do', qs.stringify(data))
}
// 文库管理-获取文库类型列表
export function lawCateList(data) {
  return service.post(OAUTH_API + '/lawCateList.do', qs.stringify(data))
}
// 文库管理-获取文档类型列表
export function lawTypeList(data) {
  return service.post(OAUTH_API + '/lawTypeList.do', qs.stringify(data))
}
// 文库管理-获取文库详情
export function lawDetail(data) {
  return service.post(OAUTH_API + '/lawDetail.do', qs.stringify(data))
}

// 文库管理-获取上一级的全部地区
export function parentAreaList(data) {
  return service.post(OAUTH_API + '/area/parentAreaList.do', qs.stringify(data))
}

// 文库管理-获取下一级的全部地区
export function childrentAreaList(data) {
  return service.post(OAUTH_API + '/area/childrentAreaList.do', qs.stringify(data))
}

// 文库管理-获取所有省与市信息列表
export function getAreaAndCity(data) {
  return service.post(OAUTH_API + '/area/getAreaAndCity.do', qs.stringify(data))
}

// 文库管理-获取文库详情页
export function getViewLaw(data) {
  return service.post(OAUTH_API + '/viewLaw.do', qs.stringify(data))
}

// 文库管理-获取文库详情页
export function saveLaw(data) {
  return service.post(OAUTH_API + '/saveLaw.do', qs.stringify(data))
}

// 文库管理-获取文库详情页
export function auditLawList(data) {
  return service.post(OAUTH_API + '/auditLawList.do', qs.stringify(data))
}

// 文库管理-审核公共文库
export function auditLaw(data) {
  return service.post(OAUTH_API + '/auditLaw.do', qs.stringify(data))
}

// 文库管理-个人文库列表
export function personLawList(data) {
  return service.post(OAUTH_API + '/personLawList.do', qs.stringify(data))
}

// 文库管理-文库的上架或下架(pc)
export function putawayLaw(data) {
  return service.post(OAUTH_API + '/putawayLaw.do', qs.stringify(data))
}

// 法律文库 - 10、查看编辑的文库(pc)
export function viewEditLaw(data) {
  return service.post(OAUTH_API + '/viewEditLaw.do', qs.stringify(data))
}

// 法律文库 - 6、修改文库(pc)
export function editLaw(data) {
  return service.post(OAUTH_API + '/editLaw.do', qs.stringify(data))
}

// 私有文库 - 9、获取我参与的项目列表
export function getMyPros(data) {
  return service.post(OAUTH_API + '/privateLaw/getMyPros.do', qs.stringify(data))
}

// 私有文库 - 10、查询我参与的组织
export function getMyOrgs(data) {
  return service.post(OAUTH_API + '/privateLaw/getMyOrgs.do', qs.stringify(data))
}

// 私有文库 - 4、获取组织文库列表数据(pc)
export function getOrgLawList(data) {
  return service.post(OAUTH_API + '/privateLaw/getOrgLawList.do', qs.stringify(data))
}

// 私有文库 - 5、添加组织文库(pc)
export function saveOrgLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/saveOrgLaw.do', qs.stringify(data))
}

// 私有文库 - 3、查看文库(pc)
export function watchLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/watchLaw.do', qs.stringify(data))
}

// 私有文库 - 7、修改文库(pc)
export function editPrivateLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/editPrivateLaw.do', qs.stringify(data))
}

// 私有文库 - 8、删除文库(pc)
export function deleteLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/deleteLaw.do', qs.stringify(data))
}

// 私有文库 - 11、获取文件属性列表
export function lawAttr(data) {
  return service.post(OAUTH_API + '/privateLaw/lawAttr.do', qs.stringify(data))
}

// 私有文库 - 1、获取项目文库列表数据(pc)
export function getProjectLawList(data) {
  return service.post(OAUTH_API + '/privateLaw/getProjectLawList.do', qs.stringify(data))
}

// 私有文库 - 12、上传附件
export function uploading(data) {
  return service.post(OAUTH_API + '/privateLaw/uploading.do', qs.stringify(data))
}

// 私有文库 - 14、取消附件
export function canCelFile(data) {
  return service.post(OAUTH_API + '/privateLaw/canCelFile.do', qs.stringify(data))
}

// 私有文库 - 6、查看编辑文库(pc)
export function watchEditLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/watchEditLaw.do', qs.stringify(data))
}

// 私有文库 - 2、添加项目文库(pc)
export function saveProjectLaw(data) {
  return service.post(OAUTH_API + '/privateLaw/saveProjectLaw.do', qs.stringify(data))
}
