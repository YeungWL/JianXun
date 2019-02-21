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

// 内容管理 - 07、添加内容
export function contentAdd(data) {
  return service.post(OAUTH_API + '/cms/content/add.do', qs.stringify(data))
}
// 内容管理 - 08、获取内容信息
export function getContentInfo(data) {
  return service.post(OAUTH_API + '/cms/content/getContentInfo.do', qs.stringify(data))
}
// 内容管理 - 09、提交编辑的内容
export function contentEdit(data) {
  return service.post(OAUTH_API + '/cms/content/edit.do', qs.stringify(data))
}
// 内容管理 - 10、获取某类栏目下的内容列表
export function contentList(data) {
  return service.post(OAUTH_API + '/cms/content/list.do', qs.stringify(data))
}
// 内容管理 - 11、批量删除/恢复/置顶/推荐操作
export function batchOperate(data) {
  return service.post(OAUTH_API + '/cms/content/batchOperate.do', qs.stringify(data))
}
// 内容管理 - 12、删除或恢复某个内容
export function deleteOrRecover(data) {
  return service.post(OAUTH_API + '/cms/content/deleteOrRecover.do', qs.stringify(data))
}
// 内容管理 - 13、上传内容缩略图
export function contentUploadPic(data) {
  return service.post(OAUTH_API + '/cms/uploadPic.do', qs.stringify(data))
}
// 内容管理 - 14、上传内容附件
export function contentUploading(data) {
  return service.post(OAUTH_API + '/cms/uploading.do', qs.stringify(data))
}
// 内容管理 - 15、取消附件
export function contentCancelAttach(data) {
  return service.post(OAUTH_API + '/cms/content/cancelAttach.do', qs.stringify(data))
}
