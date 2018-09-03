
<template>
  <el-container>
  <el-aside class="aside-menu"  width="200px">
    <el-menu :default-openeds="openeds" @select="handleSelect" :default-active="activeIndex">
      <el-submenu :index="((index+1)+'')" v-for="(item,index) in asideArr" :key="index">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group v-for="(ele,i) in item.content" :key="i"  >
          <!-- :class="{'is-active': selActive == selActive }" -->
          <el-menu-item :index="(index+1)+'-'+(i+1)" >{{ele}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </el-aside>
  <!-- 内容区域 -->
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'system',
  computed: {
    ...mapGetters(['rootLists'])
  },  
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      asideArr: [
        {title: '权限管理', content: ['菜单管理','角色管理','用户管理','操作日志','字典管理','地区管理','施工日志模板管理','监理日志模板管理']}
      ]
    }
  },
  created() {
    // console.log(this.$route.name)
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
  methods: {
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
