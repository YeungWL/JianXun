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
