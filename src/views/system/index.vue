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
export default { 
  name: 'system',  
  data() {
    return {
      userManageList:[],//当前页面所拥有的菜单权限
    }
  },
  created() {
    // 获取当前菜单
    this.userManageList=this.$getChildrenMenu(this.$store.getters.rootLists,'system');
    // console.log(this.$store.getters.rootLists)
  },
  mounted(){
    this.userManageList=this.$getChildrenMenu(this.$store.getters.rootLists,'system');
  },
  watch:{
    'this.$store.getters.rootLists'(v){
      this.userManageList=this.$getChildrenMenu(v,'system');
    }
  },  
  methods: {
    isActived(path) {
      // 判断是否选中状态
      let isActived = this.$route.fullPath.indexOf(path) != -1
      return isActived
    },

  }
}
</script>

<style lang="scss" scoped>
// @import "../../styles/mixin.scss";
</style>
