/***
 *  三级教育
 * */
const education = resolve => require(['@/views/education/index'], resolve)
/** 三级教育 => 班组管理 */
const group = resolve => require(['@/views/education/group/index'], resolve)
/** 三级教育 => 工人管理 */
const worker = resolve => require(['@/views/education/worker/index'], resolve)
/** 三级教育 => 课件管理 */
const courseware = resolve => require(['@/views/education/courseware/index'], resolve)
/** 三级教育 => 考试管理 */
const exam = resolve => require(['@/views/education/exam/index'], resolve)
/** 三级教育 => 教育记录 */
const eduRecord = resolve => require(['@/views/education/eduRecord/index'], resolve)
/** 三级教育 => 资费管理 */
const expenses = resolve => require(['@/views/education/expenses/index'], resolve)

export default {
  path: '/education',
  component: education,
  redirect: '/education/group',
  name: 'education',
  meta: {
    requireAuth: true
  },
  children: [
    {
      path: '/education/group',
      component: group,
      name: 'group',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/worker',
      component: worker,
      name: 'worker',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/courseware',
      component: courseware,
      name: 'courseware',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/exam',
      component: exam,
      name: 'exam',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/eduRecord',
      component: eduRecord,
      name: 'eduRecord',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/expenses',
      component: expenses,
      name: 'expenses',
      meta: {
        requireAuth: true
      }
    }
  ]
}
