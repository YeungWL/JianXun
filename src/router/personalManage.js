
//  个人中心管理

const personal = resolve => require(['@/views/personal/index'], resolve)
/**个人中心 => 基本资料 */
const personalInfo = resolve => require(['@/views/personal/personalInfo/personalInfo'], resolve)
/**个人中心 => 学习记录 */
const personalLearn = resolve => require(['@/views/personal/personalLearn/personalLearn'], resolve)
/**个人中心 => 个人账户 */
const personalAccount = resolve => require(['@/views/personal/personalAccount/personalAccount'], resolve)
/**个人中心 => 我的收藏 */
const personalCollection = resolve => require(['@/views/personal/personalCollection/personalCollection'], resolve)

/**个人中心 => 反馈管理*/
const personalFeedback = resolve => require(['@/views/personal/personalFeedback/personalFeedback'], resolve)

export default {
  path: '/personal',
  component: personal,
  redirect: '/personal/personalInfo',
  name: '个人中心',
  meta: {
    requireAuth: true
  },
  children: [{
      path: '/personal/personalInfo',
      component: personalInfo,
      name: 'personalInfo',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personal/personalLearn',
      component: personalLearn,
      name: 'personalLearn',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personal/personalAccount',
      component:personalAccount,
      name: 'personalAccount',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personal/personalCollection',
      component:personalCollection,
      name: 'personalCollection',
      meta: {
        requireAuth: true 
      }
    },
    {
      path: '/personal/personalFeedback',
      component:personalFeedback,
      name: 'personalFeedback',
      meta: {
        requireAuth: true 
      }
    }
  ]

}
