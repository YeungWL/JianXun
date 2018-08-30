import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

// 系统权限管理 - 1、获取所有用户列表
export function userList(data) {
  return service.post(OAUTH_API + '/privilege/userList.do', qs.stringify(data))
}

// 系统权限管理 - 2、添加用户
export function addUser(data) {
  return service.post(OAUTH_API + '/privilege/addUser.do', qs.stringify(data))
}
// 系统权限管理 - 3、修改用户
export function updateUser(data) {
  return service.post(OAUTH_API + '/privilege/updateUser.do', qs.stringify(data))
}

// 系统权限管理 - 4、停用,恢复或冻结用户
export function delUser(data) {
  return service.post(OAUTH_API + '/privilege/delUser.do', qs.stringify(data))
}

// 系统权限管理 - 5、获取所有角色列表
export function roleList(data) {
  return service.post(OAUTH_API + '/privilege/roleList.do', qs.stringify(data))
}

// 系统权限管理 - 25、验证用户唯一性
export function checkUserUnique(data) {
  return service.post(OAUTH_API + '/privilege/checkUserUnique.do', qs.stringify(data))
}

// 系统权限管理 - 6、添加角色
export function addRole(data) {
  return service.post(OAUTH_API + '/privilege/addRole.do', qs.stringify(data))
}

// 系统权限管理 - 7、修改角色
export function updateRole(data) {
  return service.post(OAUTH_API + '/privilege/updateRole.do', qs.stringify(data))
}

// 系统权限管理 - 7、验证角色编码是否存在
export function checkRoleCode(data) {
  return service.post(OAUTH_API + '/privilege/checkRoleCode.do', qs.stringify(data))
}

// 系统权限管理 - 8、停用,恢复角色
export function delRole(data) {
  return service.post(OAUTH_API + '/privilege/delRole.do', qs.stringify(data))
}

// 系统权限管理 - 10、获取角色信息
export function getRole(data) {
  return service.post(OAUTH_API + '/privilege/getRole.do', qs.stringify(data))
}

// 系统权限管理 - 11、获取菜单按钮操作列表
export function menuList(data) {
  return service.post(OAUTH_API + '/privilege/menuList.do', qs.stringify(data))
}

// 系统权限管理 - 12、添加菜单按钮操作[pc]
export function addMenu(data) {
  return service.post(OAUTH_API + '/privilege/addMenu.do', qs.stringify(data))
}

// 系统权限管理 - 13、修改菜单或按钮[pc]
export function updateMenu(data) {
  return service.post(OAUTH_API + '/privilege/updateMenu.do', qs.stringify(data))
}

// 系统权限管理 - 14、删除或恢复菜单或按钮[pc]
export function delMenu(data) {
  return service.post(OAUTH_API + '/privilege/delMenu.do', qs.stringify(data))
}

// 系统设置-15、获取菜单或者按钮信息
export function getMenu(data) {
  return service.post(OAUTH_API + '/privilege/getMenu.do', qs.stringify(data))
}

// 系统权限管理 - 16、验证菜单或按钮编码是否存在
export function checkMenuCode(data) {
  return service.post(OAUTH_API + '/privilege/checkMenuCode.do', qs.stringify(data))
}

// 系统权限管理 - 19、获取字典列表
export function zidianList(data) {
  return service.post(OAUTH_API + '/privilege/zidianList.do', qs.stringify(data))
}
// 系统权限管理 - 20、添加字典操作
export function addZidian(data) {
  return service.post(OAUTH_API + '/privilege/addZidian.do', qs.stringify(data))
}
// 系统权限管理 - 21、修改字典操作
export function updateZidian(data) {
  return service.post(OAUTH_API + '/privilege/updateZidian.do', qs.stringify(data))
}
// 系统权限管理 - 22、删除字典操作
export function delZidian(data) {
  return service.post(OAUTH_API + '/privilege/delZidian.do', qs.stringify(data))
}
// 系统权限管理 - 23、获取某条字典信息
export function getZidian(data) {
  return service.post(OAUTH_API + '/privilege/getZidian.do', qs.stringify(data))
}
// 系统权限管理 - 24、验证字典编码是否存在
export function checkZidianCode(data) {
  return service.post(OAUTH_API + '/privilege/checkZidianCode.do', qs.stringify(data))
}

// 系统权限管理 - 26、获取用户登录日志列表
export function getUserLogList(data) {
  return service.post(OAUTH_API + '/privilege/getUserLogList.do', qs.stringify(data))
}

// 系统权限管理 - 31、删除登录日志
export function delUserLog(data) {
  return service.post(OAUTH_API + '/privilege/delUserLog.do', qs.stringify(data))
}

// 系统权限管理 - 32、批理删除登录日志
export function delBatchUserLog(data) {
  return service.post(OAUTH_API + '/privilege/delBatchUserLog.do', qs.stringify(data))
}

// 系统权限管理 - 27、获取施工日志分页列表
export function getAttrTemplateList(data) {
  return service.post(OAUTH_API + '/privilege/getAttrTemplateList.do', qs.stringify(data))
}

// 系统权限管理 - 28、添加施工日志
export function addAttrTemplate(data) {
  return service.post(OAUTH_API + '/privilege/addAttrTemplate.do', qs.stringify(data))
}

// 系统权限管理 - 29、修改施工日志
export function updateAttrTemplate(data) {
  return service.post(OAUTH_API + '/privilege/updateAttrTemplate.do', qs.stringify(data))
} 

// 系统权限管理 - 30、删除或者恢复施工日志
export function delAttrTemplate(data) {
  return service.post(OAUTH_API + '/privilege/delAttrTemplate.do', qs.stringify(data))
}

// 系统权限管理 - 33、验证模板编码是否存在
export function checkTemplateCode(data) {
  return service.post(OAUTH_API + '/privilege/checkTemplateCode.do', qs.stringify(data))
}

// 系统权限管理 - 34、获取监理日志分页列表
export function getSupervisionTempList(data) {
  return service.post(OAUTH_API + '/privilege/getSupervisionTempList.do', qs.stringify(data))
}
// 系统权限管理 - 35、添加监理日志模板
export function addSupervisionTemp(data) {
  return service.post(OAUTH_API + '/privilege/addSupervisionTemp.do', qs.stringify(data))
}
// 系统权限管理 - 36、修改监理日志模板
export function updateSupervisionTemp(data) {
  return service.post(OAUTH_API + '/privilege/updateSupervisionTemp.do', qs.stringify(data))
}
// 系统权限管理 - 37、删除或者监理施工日志模板
export function delSupervisionTemp(data) {
  return service.post(OAUTH_API + '/privilege/delSupervisionTemp.do', qs.stringify(data))
}
// 系统权限管理 - 38、获取某条监理日志信息
export function getSupervisionInfo(data) {
  return service.post(OAUTH_API + '/privilege/getSupervisionInfo.do', qs.stringify(data))
}
// 系统权限管理 - 39、获取某条施工日志信息
export function getAttrTemplateInfo(data) {
  return service.post(OAUTH_API + '/privilege/getAttrTemplateInfo.do', qs.stringify(data))
}
// 系统权限管理 - 40、验证监理模板编码是否存在
export function checkSuperviTemplateCode(data) {
  return service.post(OAUTH_API + '/privilege/checkSuperviTemplateCode.do', qs.stringify(data))
}

// 地区统一接口 - 4、获取所有省市区三级信息列表
export function getCityAllChild(data) {
  return service.post(OAUTH_API + '/area/getCityAllChild.do', qs.stringify(data))
}

