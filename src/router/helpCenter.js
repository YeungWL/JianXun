/***
 *  帮助中心
 * */
const helpCenter = resolve => require(['@/views/helpCenter/index'], resolve)
/**帮助中心 => 栏目管理 */
const helpMenu = resolve => require(['@/views/helpCenter/helpMenu/index'], resolve)
/**帮助中心 => 内容管理 */
const helpContent = resolve => require(['@/views/helpCenter/helpContent/index'], resolve)
/**帮助中心 => 内容管理 => 添加内容 */
const addHelpContent = resolve => require(['@/views/helpCenter/helpContent/addHelpContent'], resolve)

export default {
  path: '/helpCenter', component: helpCenter, redirect: '/helpCenter/helpMenu', name: 'helpCenter', meta: { requireAuth: true },
   children: [
    { path: '/helpCenter/helpMenu', component: helpMenu, name: 'helpMenu', meta: { requireAuth: true }},
    { path: '/helpCenter/helpContent', component: helpContent, name: 'helpContent', meta: { requireAuth: true }},
    { path: '/helpContent/addHelpContent', component: addHelpContent, name: 'addHelpContent', meta: { requireAuth: true }}

  ]
}