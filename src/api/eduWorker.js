import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

// 三级教育考题 - 18、公共或个人课件列表 - 选课列表

export function getCourseList(data) {
  return service.post(OAUTH_API + '/eduExam/getCourseList.do', qs.stringify(data))
}

// 三级教育考题 - 19、添加课件

export function savaeCourse(data) {
  return service.post(OAUTH_API + '/eduExam/savaeCourse.do', qs.stringify(data))
}

// 三级教育考题 -20、上传附件

export function uploadingCourse(data) {
  return service.post(OAUTH_API + '/eduExam/uploading.do', qs.stringify(data))
}

// 三级教育考题 - 21、编辑课件页面

export function editCoursePage(data) {
  return service.post(OAUTH_API + '/eduExam/editCoursePage.do', qs.stringify(data))
}

// 三级教育考题 - 22、编辑提交课件

export function editSaveCourse(data) {
  return service.post(OAUTH_API + '/eduExam/editSaveCourse.do', qs.stringify(data))
}

// 三级教育考题 - 59、上传封面或者缩略图
export function uploadPic(data) {
  return service.post(OAUTH_API + '/eduExam/uploadPic.do', qs.stringify(data))
}
// 三级教育考题 - 23、取消附件

export function canCelAttach(data) {
  return service.post(OAUTH_API + '/eduExam/canCelAttach.do', qs.stringify(data))
}

// 三级教育考题 - 24、选课

export function selectCourse(data) {
  return service.post(OAUTH_API + '/eduExam/selectCourse.do', qs.stringify(data))
}

// 三级教育考题 - 25、级别列表

export function gradeList(data) {
  return service.post(OAUTH_API + '/eduExam/gradeList.do', qs.stringify(data))
}

// 三级教育考题 -  26、已选课列表- 课件管理，在选择课件之后返回显示的列表，跟组织ID关联

export function beSelectCourseList(data) {
  return service.post(OAUTH_API + '/eduExam/beSelectCourseList.do', qs.stringify(data))
}

// 三级教育考题 -  32、设置课件状态
export function setCourseIsDeleted(data) {
  return service.post(OAUTH_API + '/eduExam/setCourseIsDeleted.do', qs.stringify(data))
}

// 三级教育考题 -  33、删除选课课件
export function deletedRefCourse(data) {
  return service.post(OAUTH_API + '/eduExam/deletedRefCourse.do', qs.stringify(data))
}

// 三级教育考题 -  49、删除课件
export function deleteCourse(data) {
  return service.post(OAUTH_API + '/eduExam/deleteCourse.do', qs.stringify(data))
}

// 三级教育之工人管理 - 1、工人列表
export function workerList(data) {
  return service.post(OAUTH_API + '/eduWorker/workerList.do', qs.stringify(data))
}

// 三级教育之工人管理 - 2、工人添加
export function workerAdd(data) {
  return service.post(OAUTH_API + '/eduWorker/workerAdd.do', qs.stringify(data))
}

// 三级教育考题 -  3、工人修改
export function workerUpdate(data) {
  return service.post(OAUTH_API + '/eduWorker/workerUpdate.do', qs.stringify(data))
}

// 三级教育考题 - 4、批量导入工人excel文件
export function workerUpload(data) {
  return service.post(OAUTH_API + '/eduWorker/workerUpload.do', qs.stringify(data))
}

// 三级教育考题 - 4、获取工人模板上传文件
export function workerTempFile(data) {
  return service.post(OAUTH_API + '/eduWorker/workerTempFile.do', qs.stringify(data))
}

// 三级教育之工人管理 - 7、下载失败数据
export function workerDownload(data) {
  return service.post(OAUTH_API + '/eduWorker/workerDownload.do', qs.stringify(data))
}
