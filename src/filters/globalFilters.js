import Vue from 'vue'
import moment from 'moment'

// 时间过滤器 默认是YYYY-MM-DD HH:mm:ss
Vue.filter('dateFormat', function(val, pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(val).format(pattern);
})

let headRolesSimple = ['正','副','正','副','普'];
let headRolesFull = ['组织负责人正职','组织负责人副职','部门负责人正职','部门负责人副职','普通员工']
Vue.filter('headRole',function(val,type){
  type = type=='full'?"full":'simple';
  switch(type){
    case 'simple':
    return headRolesSimple[val];
    break;
    case 'full':
    return headRolesFull[val];
  }
})