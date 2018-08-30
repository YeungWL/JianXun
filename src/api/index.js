import * as login from './login' // 登录,注册,密码,用户信息
import * as library from './library' // 文库管理
import * as organization from './organization'
import * as system from './system' // 系统权限管理
import * as record from './record' // 施工日志
import * as supervisorLog from './supervisorLog' // 监理日志
import * as checking from './checking' // 现场检查
import * as project from './project' // 系统权限管理
import * as personal from './personal' // 个人中心
import * as sms from './sms' // 短信验证码

export default {
  ...login,
  ...library,
  ...organization,
  ...system,
  ...project,
  ...personal,
  ...record,
  ...supervisorLog,
  ...checking,
  ...sms
}
