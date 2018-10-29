<!--<template>
   <menu-bar :thisAside='thisAside'></menu-bar>
</template>-->
<template>
  <el-container>
  <el-aside class="aside-menu"  width="200px">
        <el-menu :default-active="$route.menuUrl"
               class="submenu"
               router>
        <el-menu-item :index="item.menuUrl" v-for="(item,index) in userManageList" :key="index" v-if="item.status"
                      :class="{'is-active':isActived(item.menuUrl)}">{{item.menuName}}</el-menu-item>
      <!--  <el-menu-item index="/user/usergroup"
                      :class="{'is-active':isActived('/user/usergroup')}">用户组管理</el-menu-item>
        <el-menu-item index="/user/role"
                      :class="{'is-active':isActived('/user/role')}">角色管理</el-menu-item>
        <el-menu-item index="/user/usertag"
                      :class="{'is-active':isActived('/user/usertag')}">用户标签管理</el-menu-item>-->
      </el-menu>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import menuBar from '../../components/menuBar'
export default {
  components: {
    menuBar
  },
  computed: {
    ...mapGetters(['rootLists'])
  },  
  name: 'system',  
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      thisAside: [], //当前页面所拥有的菜单权限
      userManageList:[],
      asideArr: [
        {title: '权限管理', content: ['菜单管理','角色管理','用户管理','操作日志','字典管理','地区管理','施工日志模板管理','监理日志模板管理']}
      ]
    }
  },
  created() {
    this.getMenu()
    this.userManageList=this.$getChildrenMenu(this.$store.getters.rootLists,'system');
    // console.log(this.$store.getters.rootLists)
    switch (this.$route.name) {
      case 'menu': this.activeIndex = '1-1'; break
      case 'role': this.activeIndex = '1-2'; break
      case 'user': this.activeIndex = '1-3'; break
      case 'logs': this.activeIndex = '1-4'; break
      case 'dictionary': this.activeIndex = '1-5'; break
      case 'area': this.activeIndex = '1-6'; break 
      case 'buildingDiary': this.activeIndex = '1-7'; break 
      case 'supervisorDiary': this.activeIndex = '1-8'; break    
    }
  },
  mounted(){
    // this.userManageList=this.getChildrenMenu(this.$store.getters.rootLists,'/system');
    // console.log(this.userManageList)
  },
  methods: {
    isActived(path) {
      // 判断是否选中状态
      let isActived = this.$route.fullPath.indexOf(path) != -1
      return isActived
    },
    //获取当前菜单
    getMenu() {
      // console.log(this.rootLists, 1111111111111)
      let navArr = JSON.parse(this.$store.getters.rootLists)// json转数组
      navArr.forEach((item, i) => {
        if (item.menuName === '系统设置') {
          // console.log(typeof this.rootLists)
        //   this.thisAside = {
        //     "currentPage": null,
        //     "pageSize": null,
        //     "condition": {},
        //     "menuId": "1",
        //     "menuName": "系统设置",
        //     "menuCode": "system",
        //     "menuUrl": "/system",
        //     "parentId": "0",
        //     "menuOrder": 100,
        //     "menuIcon": "icon-desktop",
        //     "menuType": "1",
        //     "isDeleted": "N",
        //     "createTime": null,
        //     "creator": null,
        //     "menuLevel": 1,
        //     "isLeaf": "2",
        //     "status": true,
        //     "childList": [
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "26",
        //             "menuName": "菜单管理",
        //             "menuCode": "menuManagement",
        //             "menuUrl": "/system/menu",
        //             "parentId": "1",
        //             "menuOrder": 1,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "2",
        //             "menuName": "角色管理",
        //             "menuCode": "roleManagement",
        //             "menuUrl": "/system/role",
        //             "parentId": "1",
        //             "menuOrder": 2,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "4",
        //             "menuName": "用户管理",
        //             "menuCode": "userManagement",
        //             "menuUrl": "/system/user",
        //             "parentId": "1",
        //             "menuOrder": 3,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "32",
        //             "menuName": "日志管理",
        //             "menuCode": "operatingLogs",
        //             "menuUrl": "/system/logs",
        //             "parentId": "1",
        //             "menuOrder": 4,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "27",
        //             "menuName": "数据字典",
        //             "menuCode": "dictionaryManagement",
        //             "menuUrl": "/system/dictionary",
        //             "parentId": "1",
        //             "menuOrder": 5,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "31",
        //             "menuName": "地区管理",
        //             "menuCode": "areaManagement",
        //             "menuUrl": "/system/area",
        //             "parentId": "1",
        //             "menuOrder": 6,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "4dc13bd411db4e25ab246470459fd877",
        //             "menuName": "施工日志模板管理",
        //             "menuCode": "buildingDiary",
        //             "menuUrl": "/system/buildingDiary",
        //             "parentId": "1",
        //             "menuOrder": 7,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "N",
        //             "createTime": 1534758186000,
        //             "creator": "1",
        //             "menuLevel": 2,
        //             "isLeaf": "2",
        //             "status": true,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "33",
        //             "menuName": "短信管理",
        //             "menuCode": null,
        //             "menuUrl": "msm/listMsm.do",
        //             "parentId": "1",
        //             "menuOrder": 9,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "Y",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": false,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "5",
        //             "menuName": "系统用户",
        //             "menuCode": "listUsers",
        //             "menuUrl": "user/listUsers.do",
        //             "parentId": "1",
        //             "menuOrder": 10,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "Y",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": false,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         },
        //         {
        //             "currentPage": null,
        //             "pageSize": null,
        //             "condition": {},
        //             "menuId": "34",
        //             "menuName": "我的收藏",
        //             "menuCode": null,
        //             "menuUrl": "favourite/listFavourite.do",
        //             "parentId": "1",
        //             "menuOrder": 10,
        //             "menuIcon": null,
        //             "menuType": "2",
        //             "isDeleted": "Y",
        //             "createTime": null,
        //             "creator": null,
        //             "menuLevel": 2,
        //             "isLeaf": "1",
        //             "status": false,
        //             "childList": null,
        //             "menuIdNot": null,
        //             "roleId": null
        //         }
        //     ],
        //     "menuIdNot": null,
        //     "roleId": null
        // }

          console.log(typeof this.thisAside)
        }
      })
    },    
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: '/system/menu' }); break
        case '1-2': this.$router.push({ path: '/system/role' }); break
        case '1-3': this.$router.push({ path: '/system/user' }); break
        case '1-4': this.$router.push({ path: '/system/logs' }); break
        case '1-5': this.$router.push({ path: '/system/dictionary' }); break
        case '1-6': this.$router.push({ path: '/system/area' }); break
        case '1-7': this.$router.push({ path: '/system/buildingDiary' }); break
        case '1-8': this.$router.push({ path: '/system/supervisorDiary' }); break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";
</style>
