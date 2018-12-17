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
/** 三级教育 => 我的课件 */
const myCourse = resolve => require(['@/views/education/courseware/myCourse'], resolve)
/** 三级教育 => 我的课件 => 添加或编辑课件 */
const addCourse = resolve => require(['@/views/education/courseware/addCourse'], resolve)
/** 三级教育 => 考题管理 */
const examQuestions = resolve => require(['@/views/education/exam/examQuestions'], resolve)
/** 三级教育 => 考卷管理 */
const examPaper = resolve => require(['@/views/education/exam/examPaper'], resolve)
/** 三级教育 => 教育记录 */
const eduRecord = resolve => require(['@/views/education/eduRecord/index'], resolve)
/** 三级教育 => 资费管理 => 历史订单 */
const expenses = resolve => require(['@/views/education/expenses/index'], resolve)
/** 三级教育 => 资费管理 => 发票管理 */
const invoice = resolve => require(['@/views/education/expenses/invoice'], resolve)
/** 三级教育 =>  考卷管理 => 编辑试卷 */
const editPaper = resolve => require(['@/views/education/exam/editPaper'], resolve)
/** 三级教育 =>  考卷管理 => 考场管理 */
const examManage = resolve => require(['@/views/education/exam/examManage'], resolve)
/** 三级教育 =>  教育记录 => 个人考试记录 */
const examList = resolve => require(['@/views/education/eduRecord/examList'], resolve)
/** 三级教育 =>  教育记录 => 个人学习记录 */
const educationList = resolve => require(['@/views/education/eduRecord/educationList'], resolve)
/** 三级教育 =>  教育记录 => 个人学习记录 */
const perViewPaper = resolve => require(['@/views/education/exam/perViewPaper'], resolve)

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
      path: '/education/myCourse',
      component: myCourse,
      name: 'myCourse',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/addCourse',
      component: addCourse,
      name: 'addCourse',
      meta: {
        requireAuth: true
      }
    },    
    {
      path: '/education/exam/examPaper',
      component: examPaper,
      name: 'examPaper',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/exam/examQuestions',
      component: examQuestions,
      name: 'examQuestions',
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
    },
    {
      path: '/education/invoice',
      component: invoice,
      name: 'invoice',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/exam/editPaper',
      component: editPaper,
      name: 'editPaper',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/exam/examManage',
      component: examManage,
      name: 'examManage',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/eduRecord/examList',
      component: examList,
      name: 'examList',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/eduRecord/educationList',
      component: educationList,
      name: 'educationList',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/education/exam/perViewPaper',
      component: perViewPaper,
      name: 'perViewPaper',
      meta: {
        requireAuth: true
      }
    }
  ]
}
