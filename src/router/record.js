/***
 *  日志管理
 * */
const record = resolve => require(['@/views/record/index'], resolve)
/**资费管理 */
const payCharge = resolve =>
  require(['@/views/record/payCharge/payCharge'], resolve)
/**日志主页 */
const homeRecord = resolve =>
  require(['@/views/record/homeRecord/homeRecord'], resolve)
//日志编写
const writeRecord = resolve =>
  require(['@/views/record/homeRecord/writeRecord/writeRecord'], resolve)
//日志详情
const detail = resolve => require(['@/views/record/homeRecord/detail/detail'],resolve)
export default {
  path: '/record',
  component: record,
  redirect: '/record/homeRecord',
  name: 'record',
  meta: { requireAuth: true },
  children: [
    {
      path: '/record/payCharge',
      component: payCharge,
      name: 'payCharge',
      meta: { requireAuth: true }
    },
    {
      path: '/record/homeRecord',
      component: homeRecord,
      name: 'homeRecord',
      meta: { requireAuth: true }
    },
    {
      path: '/record/writeRecord',
      component: writeRecord,
      name: 'writeRecord',
      meta: { requireAuth: true }
    },
    {
      path: '/record/detail',
      component: detail,
      name: 'detail',
      meta: { requireAuth: true }
    }
  ]
}
