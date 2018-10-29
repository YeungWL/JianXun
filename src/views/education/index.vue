<!--<template>
   <menu-bar :thisAside='thisAside'></menu-bar>
</template>-->
<template>
  <el-container>
  <el-aside class="aside-menu"  width="200px">
        <el-menu :default-active="$route.menuUrl"
               class="submenu"
               router>
            <div v-for="(item,index) in userManageList">
              <el-menu-item 
                :key="index" 
                :index="item.menuUrl" 
                v-if= "item.childList == null"
                :class="{'is-active':isActived(item.menuUrl)}">
                {{item.menuName}}
              </el-menu-item>
              <el-submenu v-if="item.childList != null" 
                  :index="item.menuUrl">
                  <template slot="title">{{item.menuName}}</template>
                  <el-menu-item-group 
                    v-for="(child,index) in item.childList"
                     :key="index">
                    <el-menu-item  
                     :index="child.menuUrl" 
                     :class="{'is-active':isActived(child.menuUrl)}">{{child.menuName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
            </div>         
      </el-menu>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>
<script>
export default { 
  name: 'education',  
  data() {
    return {
      userManageList:[],//当前页面所拥有的菜单权限
    }
  },
  created() {
  },
  mounted(){
    // 获取当前菜单
    this.userManageList=this.$getChildrenMenu('education');
    console.log(this.userManageList)
  },
  watch:{
    'this.$store.getters.rootLists'(v){
      this.userManageList=this.$getChildrenMenu(v,'education');
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

