import OrganizationView from "./Organization-View/index";//组织结构图
// import Massage from './message/message'
import pagination from './pagecomponents/pagination.vue'//分页


const components = [
    OrganizationView,
    pagination
    // Massage
]


const install = function(Vue, opts = {}) {
    components.map((component)=>{
        console.log(component.name)
        Vue.component(component.name, component);
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

module.exports = {
    version: '0.0.0',
    install,
    OrganizationView,
    pagination
};

module.exports.default = module.exports;