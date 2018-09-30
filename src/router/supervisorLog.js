/***
 *  日志管理
 * */
const supervisorLog = resolve => require(['@/views/supervisorLog/index'], resolve)

/** 日志主页 */
const supervisorHomeRecord = resolve =>
  require(['@/views/supervisorLog/homeRecord/homeRecord'], resolve)
// 日志编写
const writeSupervisoRecord = resolve =>
   require(['@/views/supervisorLog/homeRecord/writeRecord/writeRecord'], resolve)
// 日志详情
const supervisorDetail = resolve =>
   require(['@/views/supervisorLog/homeRecord/detail/detail'], resolve)
export default {
  path: '/supervisorLog',
  component: supervisorLog,
  redirect: '/supervisorLog/homeRecord',
  name: 'supervisorLog',
  meta: { requireAuth: true },
  children: [
    {
      path: '/supervisorLog/homeRecord',
      component: supervisorHomeRecord,
      name: 'supervisorHomeRecord',
      meta: { requireAuth: true }
    },
    {
      path: '/supervisorLog/writeRecord',
      component: writeSupervisoRecord,
      name: 'writeSupervisoRecord',
      meta: { requireAuth: true }
    },
    {
      path: '/supervisorLog/detail',
      component: supervisorDetail,
      name: 'supervisorDetail',
      meta: { requireAuth: true }
    }
  ]
}
