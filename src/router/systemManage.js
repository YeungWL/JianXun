/***
 *  系统设置
 * */
const system = resolve => require(['@/views/system/index'], resolve)
/**系统设置 => 菜单管理 */
const menu = resolve => require(['@/views/system/menu/menuManagement'], resolve)
/**系统设置 => 角色管理 */
const role = resolve => require(['@/views/system/role/roleManagement'], resolve)
/**系统设置 => 用户管理 */
const user = resolve => require(['@/views/system/user/userManagement'], resolve)
/**系统设置 => 操作日志 */
const logs = resolve => require(['@/views/system/logs/operatingLogs'], resolve)
/**系统设置 => 字典管理 */
const dictionary = resolve => require(['@/views/system/dictionary/dictionaryManagement'], resolve)
/**系统设置 => 地区管理 */
const area = resolve => require(['@/views/system/area/areaManagement'], resolve)
/**系统设置 => 施工日志模板管理 */
const buildingDiary = resolve => require(['@/views/system/buildingDiary/buildingDiaryModelMg'], resolve)
/**系统设置 => 监理日志模板管理 */
const supervisorDiary = resolve => require(['@/views/system/supervisorDiary/supervisorDiaryModelMg'], resolve)

export default {
  path: '/system', component: system, redirect: '/system/menu', name: 'system', meta: { requireAuth: true },
   children: [
    { path: '/system/menu', component: menu, name: 'menu', meta: { requireAuth: true }},
    { path: '/system/role', component: role, name: 'role', meta: { requireAuth: true }},
    { path: '/system/user', component: user, name: 'user', meta: { requireAuth: true }},
    { path: '/system/logs', component: logs, name: 'logs', meta: { requireAuth: true }},
    { path: '/system/dictionary', component: dictionary, name: 'dictionary', meta: { requireAuth: true }},
    { path: '/system/area', component: area, name: 'area', meta: { requireAuth: true }},
    { path: '/system/buildingDiary', component: buildingDiary, name: 'buildingDiary', meta: { requireAuth: true }},
    { path: '/system/supervisorDiary', component: supervisorDiary, name: 'supervisorDiary', meta: { requireAuth: true }}
  ]
}