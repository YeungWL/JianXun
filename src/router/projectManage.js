/***
 *  项目管理
 * */
const project = resolve => require(['@/views/project/index'], resolve)
/**项目管理 => 项目列表 */
const projectList = resolve => require(['@/views/project/projectList/projectList'], resolve)
/**项目管理 => 项目组织 */
const projectOrg = resolve => require(['@/views/project/projectOrg/projectOrg'], resolve)
/**项目管理 => 项目消息 */
const projectMsg = resolve => require(['@/views/project/projectMsg/projectMsg'], resolve)
export default {
  path: '/project',
  component: _ => import('../views/project/index.vue'),
  redirect: '/project/projectList',
  name: '项目管理',
  meta: {
    requireAuth: true
  },
  children: [{
      path: '/project/projectList',
      component: _ => import('../views/project/projectList/projectList.vue'),
      name: 'projectList',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/project/projectOrg',
      component: projectOrg,
      name: 'projectOrg',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/project/projectMsg',
      component: projectMsg,
      name: 'projectMsg',
      meta: {
        requireAuth: true
      }
    }
  ]

}
