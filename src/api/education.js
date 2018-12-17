import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

// 三级教育考题 - 1、题目列表
export function questionList(data) {
  return service.post(OAUTH_API + '/eduExam/questionList.do', qs.stringify(data))
}

// 三级教育考题 - 2、新增考题
export function saveQuestion(data) {
  return service.post(OAUTH_API + '/eduExam/saveQuestion.do', qs.stringify(data))
}

// 三级教育考题 - 3、编辑题目页面
export function questionPage(data) {
  return service.post(OAUTH_API + '/eduExam/questionPage.do', qs.stringify(data))
}

// 三级教育考题 - 4、编辑提交考题
export function editQuestion(data) {
  return service.post(OAUTH_API + '/eduExam/editQuestion.do', qs.stringify(data))
}

// 三级教育考题 - 5、冻结或激活考题
export function freezeQuestion(data) {
  return service.post(OAUTH_API + '/eduExam/freezeQuestion.do', qs.stringify(data))
}

// 三级教育考题 - 6、删除题目选项
export function deletedQption(data) {
  return service.post(OAUTH_API + '/eduExam/deletedQption.do', qs.stringify(data))
}

// 三级教育考题 - 7、考卷列表
export function examList(data) {
  return service.post(OAUTH_API + '/eduExam/examList.do', qs.stringify(data))
}

// 三级教育考题 - 8、添加或编辑考卷
export function saveOrUpdateExam(data) {
  return service.post(OAUTH_API + '/eduExam/saveOrUpdateExam.do', qs.stringify(data))
}

// 三级教育考题 - 9、获取考卷信息
export function getExamInfo(data) {
  return service.post(OAUTH_API + '/eduExam/getExamInfo.do', qs.stringify(data))
}

// 三级教育考题 - 10、删除考卷
export function deletedExam(data) {
  return service.post(OAUTH_API + '/eduExam/deletedExam.do', qs.stringify(data))
}

// 三级教育考题 - 11、获取组织列表
export function getEduOrgList(data) {
  return service.post(OAUTH_API + '/eduExam/getOrgList.do', qs.stringify(data))
}

// 三级教育考题 - 12、设置考卷开关
export function setExamIsDeleted(data) {
  return service.post(OAUTH_API + '/eduExam/setExamIsDeleted.do', qs.stringify(data))
}

// 三级教育考题 - 13、获取考卷试题列表
export function getExamQastoreList(data) {
  return service.post(OAUTH_API + '/eduExam/getExamQastoreList.do', qs.stringify(data))
}

// 三级教育考题 - 14、已选题目列表
export function getSelectExamQastoreList(data) {
  return service.post(OAUTH_API + '/eduExam/getSelectExamQastoreList.do', qs.stringify(data))
}

// 三级教育考题 - 15、保存考卷题目
export function saveExamQastore(data) {
  return service.post(OAUTH_API + '/eduExam/saveExamQastore.do', qs.stringify(data))
}

// 三级教育考题 - 16、课件列表
export function getCourseList(data) {
  return service.post(OAUTH_API + '/eduExam/getCourseList.do', qs.stringify(data))
}

// 三级教育考题 - 14、保存题目
export function eduSaveQastore(data) {
  return service.post(OAUTH_API + '/eduExam/saveQastore.do', qs.stringify(data))
}

// 三级教育考题 - 15、取消题目
export function eduCancelQastore(data) {
  return service.post(OAUTH_API + '/eduExam/cancelQastore.do', qs.stringify(data))
}

// 三级教育考题 - 16、获取考卷题目数量
export function getExamQastoreCount(data) {
  return service.post(OAUTH_API + '/eduExam/getExamQastoreCount.do', qs.stringify(data))
}

// 三级教育考题 - 27、添加考场
export function eduSaveAct(data) {
  return service.post(OAUTH_API + '/eduExam/saveAct.do', qs.stringify(data))
}

// 三级教育考题 - 28、获取考卷列表
export function getExamList(data) {
  return service.post(OAUTH_API + '/eduExam/getExamList.do', qs.stringify(data))
}

// 三级教育考题 - 30、设置考场开关
export function eduSetActIsDeleted(data) {
  return service.post(OAUTH_API + '/eduExam/setActIsDeleted.do', qs.stringify(data))
}

// 三级教育考题 - 31、考场列表
export function getActList(data) {
  return service.post(OAUTH_API + '/eduExam/actList.do', qs.stringify(data))
}

// 三级教育考题 - 43、班组列表
export function getExamgroupList(data) {
  return service.post(OAUTH_API + '/eduExam/groupList.do', qs.stringify(data))
}

// 三级教育考题 - 29、一键生成考卷
export function randomSaveExam(data) {
  return service.post(OAUTH_API + '/eduExam/randomSaveExam.do', qs.stringify(data))
}

// 三级教育班组 - 1、新增班组
export function eduGroupAdd(data) {
  return service.post(OAUTH_API + '/eduClassGroup/add.do', qs.stringify(data))
}

// 三级教育班组 - 2、更新班组
export function eduGroupUpdate(data) {
  return service.post(OAUTH_API + '/eduClassGroup/update.do', qs.stringify(data))
}

// 三级教育班组 - 3、班组列表
export function eduGroupGetList(data) {
  return service.post(OAUTH_API + '/eduClassGroup/list.do', qs.stringify(data))
}

// 三级教育考题 - 34、课件学习记录
export function courseRecord(data) {
  return service.post(OAUTH_API + '/eduExam/courseRecord.do', qs.stringify(data))
}

// 三级教育考题 - 47、获取课件学习记录(pc)
export function getCourseRecord(data) {
  return service.post(OAUTH_API + '/eduExam/getCourseRecord.do', qs.stringify(data))
}

// 三级教育班组 - 4、删除班组
export function eduGroupDelete(data) {
  return service.post(OAUTH_API + '/eduClassGroup/delete.do', qs.stringify(data))
}

// 三级教育班组 - 8、查找所有公司
export function companyList(data) {
  return service.post(OAUTH_API + '/eduClassGroup/companyList.do', qs.stringify(data))
}

// 三级教育班组 - 5、关联公司
export function bindCompany(data) {
  return service.post(OAUTH_API + '/eduClassGroup/bindCompany.do', qs.stringify(data))
}

// 三级教育班组 - 6、查找组织关联的公司
export function getOrgBindCompany(data) {
  return service.post(OAUTH_API + '/eduClassGroup/getOrgBindCompany.do', qs.stringify(data))
}

// 三级教育班组 - 7、解绑公司
export function unbindCompany(data) {
  return service.post(OAUTH_API + '/eduClassGroup/unbindCompany.do', qs.stringify(data))
}

// 三级教育考题 - 35、考试记录
export function examRecord(data) {
  return service.post(OAUTH_API + '/eduExam/examRecord.do', qs.stringify(data))
}

// 三级教育考题 - 17、生成最终考卷或者可编辑考卷
export function saveFinalOrEditExam(data) {
  return service.post(OAUTH_API + '/eduExam/saveFinalOrEditExam.do', qs.stringify(data))
}
