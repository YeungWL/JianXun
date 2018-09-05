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
  },
  mounted(){
    // 获取当前菜单
    this.userManageList=this.$getChildrenMenu('system');
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
