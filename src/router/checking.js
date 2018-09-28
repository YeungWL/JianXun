/***
 *  现场检查
 * */
const checking = resolve => require(['@/views/checking/index'], resolve)
/* 现场检查 => 问题列表 */
const checkupQuestionList = resolve => require(['@/views/checking/checkupQuestionList/checkupQuestionList'], resolve)
/* 现场检查 => 整改/复查 */
const rectifyCheckupQuestion = resolve => require(['@/views/checking/checkupQuestionList/rectifyCheckupQuestion'], resolve)
/* 现场检查 => 历史记录 */
const history = resolve => require(['@/views/checking/checkupQuestionList/history'], resolve)
/**现场检查 => 组织授权 */
const checkupOrgPermission = resolve => require(['@/views/checking/checkupQuestionList/checkupOrgPermission'], resolve)
/**现场检查 => 添加现场检查问题 */
const addCheckupQuestion = resolve => require(['@/views/checking/checkupQuestionList/addCheckupQuestion'], resolve)


export default {
  path: '/checking',
  component: checking,
  redirect: '/checking/checkupQuestionList',
  name: 'checking',
  meta: { requireAuth: true },
  children: [
    {
      path: '/checking/checkupQuestionList',
      component: checkupQuestionList,
      name: 'checkupQuestionList',
      meta: { requireAuth: true }
    },
    {
      path: '/checking/rectifyCheckupQuestion',
      component: rectifyCheckupQuestion,
      name: 'rectifyCheckupQuestion',
      meta: { requireAuth: true }
    },   
    {
      path: '/checking/history',
      component: history,
      name: 'history',
      meta: { requireAuth: true }
    },
    {
      path: '/checking/checkupOrgPermission',
      component: checkupOrgPermission,
      name: 'checkupOrgPermission',
      meta: { requireAuth: true }
    },
    {
      path: '/checking/addCheckupQuestion',
      component: addCheckupQuestion,
      name: 'addCheckupQuestion',
      meta: { requireAuth: true }
    }       
  ]
}
