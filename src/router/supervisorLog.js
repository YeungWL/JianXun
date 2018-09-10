/***
 *  日志管理
 * */
const supervisorLog = resolve => require(['@/views/supervisorLog/index'], resolve)
/** 资费管理 */
const payCharge = resolve =>
  require(['@/views/supervisorLog/payCharge/payCharge'], resolve)
/** 日志主页 */
const homeRecord = resolve =>
  require(['@/views/supervisorLog/homeRecord/homeRecord'], resolve)
// 日志编写
const writeSupervisoRecord = resolve =>
   require(['@/views/supervisorLog/homeRecord/writeRecord/writeRecord'], resolve)
// 日志详情
const detail = resolve => require(['@/views/supervisorLog/homeRecord/detail/detail'], resolve)
export default {
  path: '/supervisorLog',
  component: supervisorLog,
  redirect: '/supervisorLog/homeRecord',
  name: 'supervisorLog',
  meta: { requireAuth: true },
  children: [
    {
      path: '/supervisorLog/payCharge',
      component: payCharge,
      name: 'payCharge',
      meta: { requireAuth: true }
    },
    {
      path: '/supervisorLog/homeRecord',
      component: homeRecord,
      name: 'homeRecord',
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
      component: detail,
      name: 'detail',
      meta: { requireAuth: true }
    }
  ]
}
