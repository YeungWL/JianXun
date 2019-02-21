/***
 *  文库管理
 * */
const library = resolve => require(['@/views/library/index'], resolve)
/** 文库管理 => 公共文库 */
const publicLibrary = resolve => require(['@/views/library/publicLibrary/publicLibrary'], resolve)
/** 文库管理 => 项目级文库 */
const projectLibrary = resolve => require(['@/views/library/projectLibrary/projectLibrary'], resolve)
/** 文库管理 => 组织级文库 */
const orgLibrary = resolve => require(['@/views/library/orgLibrary/orgLibrary'], resolve)

export default {
  path: '/library',
  component: library,
  redirect: '/library/publicLibrary',
  name: 'library',
  meta: {
    requireAuth: true
  },
  children: [

    {
      path: '/library/publicLibrary',
      component: publicLibrary,
      name: 'publicLibrary',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/library/pjLibrary',
      component: projectLibrary,
      name: 'pjLibrary',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/library/orgLibrary',
      component: orgLibrary,
      name: 'orgLibrary',
      meta: {
        requireAuth: true
      }
    }

  ]
}
