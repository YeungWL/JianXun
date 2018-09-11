import service from '@/utils/request'
import qs from 'qs'

const OAUTH_API = '/jianzhumobile/mobile'

//获取施工日志历史记录
export function historyList(data) {
    return service.post(OAUTH_API + '/buildLog/buildAttrHistorys.do', qs.stringify(data))
  }
// 根据时间获取施工日志历史记录数据分页列表
export function historyListByTime (data) {
    return service.post(OAUTH_API + '/buildLog/buildAttrHistoryPageList.do',qs.stringify(data))
} 
//获取某个组织的主要记事表
export function organizationList (data) {
    return service.post(OAUTH_API + '/buildLog/getBuildAttrList.do',qs.stringify(data))
} 
//负责人设置分项内容
export function setBuildAttr (data) {
    return service.post(OAUTH_API + '/buildLog/setBuildAttr.do',qs.stringify(data))
} 
//负责人获取日志设置项
export function queryBuildLog (data) {
    return service.post(OAUTH_API + '/buildLog/queryBuildLog.do',qs.stringify(data))
} 
//修改某个组织的工程项内容
export function updateBuildItem (data) {
    return service.post(OAUTH_API + '/buildLog/updateBuildItem.do',qs.stringify(data))
} 
//删除某个组织的工程项
export function delBuildItem (data) {
    return service.post(OAUTH_API + '/buildLog/delBuildItem.do',qs.stringify(data))
} 
//修改某个组织的工作组
export function updateBuildGroup (data) {
    return service.post(OAUTH_API + '/buildLog/updateBuildGroup.do',qs.stringify(data))
} 

//删除某个组织的工作组项
export function delBuildGroup (data) {
    return service.post(OAUTH_API + '/buildLog/delBuildGroup.do',qs.stringify(data))
} 

//修改某个组织的层段项
export function updateBuildLayer (data) {
    return service.post(OAUTH_API + '/buildLog/updateBuildLayer.do',qs.stringify(data))
} 


//删除某个组织的层段项
export function delBuildLayer (data) {
    return service.post(OAUTH_API + '/buildLog/delBuildLayer.do',qs.stringify(data))
} 
//添加施工日志
export function buildLog (data) {
    return service.post(OAUTH_API + '/buildLog.do',qs.stringify(data))
} 
//能否编辑施工日志
export function isCanEdit (data) {
    return service.post(OAUTH_API + '/buildLog/isCanEdit.do',qs.stringify(data))
} 
//是否是组织负责人
export function isChargeMan (data) {
    return service.post(OAUTH_API + '/buildLog/isChargeMan.do',qs.stringify(data))
} 

//删除施工进度
export function deleteBuildProgress (data) {
    return service.post(OAUTH_API + '/buildLog/deleteBuildProgress.do',qs.stringify(data))
} 
//获取组织施工进度
export function getBuildLogProgressList (data) {
    return service.post(OAUTH_API + '/buildLog/getBuildLogProgressList.do',qs.stringify(data))
} 
//检查施工日志时间
export function checkLogSetTime (data) {
    return service.post(OAUTH_API + '/buildLog/checkLogSetTime.do',qs.stringify(data))
} 
//获取当前用户在组织级别
export function getUserOrgLevel (data) {
    return service.post(OAUTH_API + '/buildLog/getUserOrgLevel.do',qs.stringify(data))
} 
//获取用户填写的主要记事
export function getUserMainAttr (data) {
    return service.post(OAUTH_API + '/buildLog/getUserMainAttr.do',qs.stringify(data))
} 
//获取组织分项工程项
export function getBuildLogItemList (data) {
    return service.post(OAUTH_API + '/buildLog/getBuildLogItemList.do',qs.stringify(data))
} 
//获取组织分组
export function getBuildLogGroupList (data) {
    return service.post(OAUTH_API + '/buildLog/getBuildLogGroupList.do',qs.stringify(data))
} 
//获取组织栋和层
export function getBuildLogLayer (data) {
    return service.post(OAUTH_API + '/buildLog/getBuildLogLayer.do',qs.stringify(data))
}
//判断组织是否存在 
export function isOrgExist (data) {
    return service.post(OAUTH_API + '/buildLog/isOrgExist.do',qs.stringify(data))
}
// 获取模板分页列表
export function getTemplateList(data) {
    return service.post(OAUTH_API + '/buildLog/getTemplateList.do', qs.stringify(data))
}
// 组织关联模板
export function orgBindTemplate(data) {
    return service.post(OAUTH_API + '/buildLog/orgBindTemplate.do', qs.stringify(data))
}
// 获取日志列表
export function getAddTempListData(data) {
    return service.post(OAUTH_API + '/buildLog/getAddTempList.do', qs.stringify(data))
}
// 修改模版扩展名
export function updateExtendName(data) {
    return service.post(OAUTH_API + '/buildLog/updateExtendName.do', qs.stringify(data))
}
