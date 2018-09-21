const organization = resolve => require(['@/views/organization'], resolve)
const organizationStructure = resolve => require(['@/views/organization/organizationStructure'], resolve)
const organizationManage = resolve => require(['@/views/organization/organizationManage'], resolve)
const organizationPosition = resolve => require(['@/views/organization/organizationPosition'], resolve)
const connection = resolve => require(['@/views/organization/connection'], resolve)
const showConnection = resolve => require(['@/views/organization/showConnection'], resolve)
const organizationPower = resolve => require(['@/views/organization/organizationPower/power'], resolve)

export default {
  path: '/organization',
  component: organization,
  name: 'organization',
  redirect: '/organization/structure',
  meta: {
    requireAuth: false
  },
  children: [
    {
      path: '/organization/structure',
      component: organizationStructure,
      name: 'frame'
    },
    {
      path: '/organization/manage',
      component: organizationManage,
      name: 'managerOganization'
    }, ,
    {
      path: '/organization/position',
      component: organizationPosition,
      name: 'managePosition'
    }, {
      path: '/organization/connection',
      component: connection,
      name: 'connection'
    },
    {
      path: '/organization/showConnection',
      component: showConnection,
      name: 'showConnection'
    },
    {
      path: '/organization/power',
      component: organizationPower,
      name: 'organizationPower'
    }
  ]
}
