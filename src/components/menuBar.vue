<template>
  <el-container>
    <keep-alive>
      <el-aside class="aside-menu"  width="200px">
        <el-menu :default-openeds="openeds"
                 @select="handleSelect"
                 :default-active="$route.menuUrl"
                 :router="true">
          <el-submenu :index="item.menuUrl"
                      v-for="(item,s) in thisAside.childList"
                      :key="s">
            <template slot="title">{{item.menuName}}</template>
            <el-menu-item-group v-for="(ele,i) in item.childList"
                                :key="i">
              <el-menu-item v-if="item.status" :index="ele.menuUrl">{{ele.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </keep-alive>
    <!-- 内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
</el-container>
</template>

<script>
export default {
  props: {
    thisAside: {
      type: Object,
      default: () => {}
    }
  },
  name: 'setting',
  data() {
    return {
      openeds: ['1', '2'],
      activeIndex: '/system/menu'
    }
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      //				this.activeIndex = key;
      //				console.log(key)
      //				this.$router.push({
      //							path: key
      //					});
    }
  }
}
</script>

<style lang="scss" scoped>
/*@import "../styles/mixin.scss";*/
// .settingManage {
//   position: relative;
//   padding-left: 240px;
//   /*height: 100%;*/
//   /*margin-top: -17px;*/
//   .el-aside {
//     box-sizing: border-box;
//     height: 100%;
//     overflow: auto;
//     position: absolute;
//     left: 0;
//     top: 0;
//     .el-submenu__title {
//       height: 40px;
//       line-height: 40px;
//       padding-left: 26px !important;
//     }
//   }
//   .settingCon {
//     height: 100%;
//     margin-top: 17px;
//     position: relative;
//     overflow: auto;
//   }
// }
</style>