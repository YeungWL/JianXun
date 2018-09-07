/***
 *  现场检查
 * */
const checking = resolve => require(['@/views/checking/index'], resolve)
/**现场检查 => 问题列表 */
const checkupQuestionList = resolve => require(['@/views/checking/checkupQuestionList/checkupQuestionList'], resolve)
/**现场检查 => 历史记录 */
const history = resolve => require(['@/views/checking/checkupQuestionList/history'], resolve)

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
      path: '/checking/history',
      component: history,
      name: 'history',
      meta: { requireAuth: true }
    }    
  ]
}
