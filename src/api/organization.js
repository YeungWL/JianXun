import service from '@/utils/request'
import qs from 'qs'

// API接口路径
const ORGS_API = '/jianzhumobile/mobile'

export function getOrganizationList(data, ctx) {
  ctx = ctx instanceof Object ? ctx : {}
  return new Promise(rs => {
    data = qs.stringify({
      token: data.token,
      accessToken: localStorage.getItem('accessToken')
    })
    service({
      method: 'POST',
      url: '/jianzhumobile/mobile/pj/findMyOrgList.do',
      data: data
    }).then(res => {
      let orgList = res.data,
        temp = {
          nolink: {
            projectId: 'nolink',
            proName: '未关联',
            shortName: '未关联',
            orgList: []
          }
        },
        i
      for (i = 0; i < orgList.length; i++) {
        if (orgList[i].projectId) {
          if (temp[orgList[i].projectId]) {
            temp[orgList[i].projectId].orgList.push(orgList[i])
          } else {
            temp[orgList[i].projectId] = {
              projectId: orgList[i].projectId,
              proName: orgList[i].proName ? orgList[i].proName : '未命名项目',
              shortName: orgList[i].shortName,
              orgList: [orgList[i]]
            }
          }
        } else {
          temp.nolink.orgList.push(orgList[i])
        }
      }
      ctx.data = []
      for (i in temp) {
        ctx.data.push(temp[i])
      }

      // console.log(ctx)

      // ctx.data = res.data;
      rs(res)
    })
  })
}

export function getOrganizationInfo(data, ctx) {
  ctx = ctx instanceof Object ? ctx : {}
  console.log(ctx)
  data = qs.stringify({
    token: data.token,
    accessToken: localStorage.getItem('accessToken'),
    projectOrgId: data.projectOrgId
  })
  return new Promise(rs => {
    service({
      url: '/jianzhumobile/mobile/getOrgInfo.do',
      method: 'POST',
      data: data
    }).then(res => {
      ctx.data = res.data
      rs(res)
    })
  })
}

/*
  获取管理组织列表
*/
export function getOrgsList(data) {
  return service.post(ORGS_API + '/pcOrgList.do', qs.stringify(data))
}
/*
  创建组织
*/
export function addOrg(data) {
  return service.post(ORGS_API + '/addOrg.do', qs.stringify(data))
}
/*
  修改组织
*/
export function updateByOrg(data) {
  return service.post(ORGS_API + '/modifyOrg.do', qs.stringify(data))
}
/* 删除组织
*/
export function deleteByOrg(data) {
  return service.post(ORGS_API + '/deleteOrg.do', qs.stringify(data))
}

/* 查询我创建的组织 */
export function getMyOrganization(data) {
  return service.post(ORGS_API + '/getOrgsList.do', qs.stringify(data))
}

/*
  冻结/解冻组织
*/
export function freezeOrRecoverOrg(data) {
  return service.post(ORGS_API + '/freezeOrRecoverOrg.do', qs.stringify(data))
}
/*
  获取可以管理的组织列表
*/
export function getManageOrgList(data) {
  return service.post(ORGS_API + '/getOrgsList.do', qs.stringify(data))
}
/*
  创建部门
*/
export function addDepartment(data) {
  return service.post(ORGS_API + '/addDepartment.do', qs.stringify(data))
}
/*
  获取部门列表
*/
export function getDepartmentList(data) {
  return service.post(ORGS_API + '/pcDepartmentList.do', qs.stringify(data))
}
/* 
  获取组织岗位列表
*/
export function getOrgInfo(data) {
  return service.post(ORGS_API + '/getOrgInfo.do', qs.stringify(data))
}
/*
  删除部门成员
*/
export function deleteMember(data) {
  return service.post(ORGS_API + '/deleteMember.do', qs.stringify(data))
}
/*
  修改部门
*/
export function modifyDepartment(data) {
  return service.post(ORGS_API + '/modifyDepartment.do', qs.stringify(data))
}
/*
  删除部门
*/
export function deleteDepartment(data) {
  return service.post(ORGS_API + '/deleteDepartment.do', qs.stringify(data))
}
/*
  获取组织已添加暂存成员列表
*/
export function getOrgStorageList(data) {
  return service.post(
    ORGS_API + '/org/getOrgStorageList.do',
    qs.stringify(data)
  )
}
/*
  添加部门成员
*/
export function addOrgMember(data) {
  return service.post(ORGS_API + '/addOrgMember.do', qs.stringify(data))
}
/*
  添加组织预存成员
*/
export function addOrgStorage(data) {
  return service.post(ORGS_API + '/org/addOrgStorage.do', qs.stringify(data))
}
/*
  删除组织预存部门成员
*/
export function delOrgStorage(data) {
  return service.post(ORGS_API + '/org/delOrgStorage.do', qs.stringify(data))
}
/*
  关联项目 - 获取关联项目的列表
*/
export function getProjectList(data) {
  return service.post(ORGS_API + '/pj/findMyProject.do', qs.stringify(data))
}
/*
  关联项目 - 获取未关联的组织列表
*/
export function getNotBindOrgList(data) {
  return service.post(ORGS_API + '/pj/getNotBindOrgList.do', qs.stringify(data))
}
/* 
  关联项目 - 批量把组织绑定项目
*/
export function doBatchBindOrg(data) {
  return service.post(ORGS_API + '/pj/doBatchBindOrg.do', qs.stringify(data))
}
/* 
  关联项目 - 管理已关联列表
*/
export function getManageProjectList(data) {
  return service.post(ORGS_API + '/pj/getManageProjectList.do', qs.stringify(data))
}
/* 
  管理项目 - 查询管理项目的组织列表
*/
export function getMyOrgBindList(data) {
  return service.post(ORGS_API + '/pj/getMyOrgBindList.do', qs.stringify(data))
}
/* 
  关联项目 - 对申请组织的操作
*/
export function doApplyOrg(data) {
  return service.post(ORGS_API + '/pj/doApplyOrg.do', qs.stringify(data))
}
/* 
  权限控制 - 获取项目已授权的组织列表
*/
export function getGrantOrgList(data) {
  return service.post(ORGS_API + '/pj/getGrantOrgList.do', qs.stringify(data))
}
/* 
  权限控制 - 根据组织ID查询授权与我的组织列表
*/
export function getMyOrgList(data) {
  return service.post(ORGS_API + '/pj/getMyOrgList.do', qs.stringify(data))
}
/* 
  权限控制 - 设置授权组织权限
*/
export function setOrgGrant(data) {
  return service.post(ORGS_API + '/pj/setOrgGrant.do', qs.stringify(data))
}
