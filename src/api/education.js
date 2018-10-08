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
