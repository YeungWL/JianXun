/***
 *  会议通知
 * */
const meeting = resolve => require(['@/views/meeting/index'], resolve)
/** 会议通知 => 当前通知 */
const meetingCurrent = resolve => require(['@/views/meeting/meetingCurrent/meetingCurrent'], resolve)
/** 会议通知 => 历史纪录 */
const meetingHistory = resolve => require(['@/views/meeting/meetingHistory/meetingHistory'], resolve)

export default {
  path: '/meeting',
  component: meeting,
  redirect: '/meeting/meetingCurrent',
  name: 'meeting',
  meta: {
    requireAuth: true
  },
  children: [

    {
      path: '/meeting/meetingCurrent',
      component: meetingCurrent,
      name: 'meetingCurrent',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/meeting/meetingHistory',
      component: meetingHistory,
      name: 'meetingHistory',
      meta: {
        requireAuth: true
      }
    }
  ]
}
