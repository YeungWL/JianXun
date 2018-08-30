<template>
  <el-container>
  <el-aside width="200px">
    <el-menu :default-openeds="openeds" @select="handleSelect" :default-active="activeIndex">
      <el-submenu :index="((index+1)+'')" v-for="(item,index) in asideArr" :key="index">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group v-for="(ele,i) in item.content" :key="i"  >
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
export default {
  name: 'project',
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      asideArr: [
        {title: '项目管理', content: ['管理项目', '项目关联','项目消息']}
      ]
    }
  },
  created() {
    // console.log(this.$route.name)
    switch (this.$route.name) {
      case 'projectList': this.activeIndex = '1-1'; break
      case 'projectOrg': this.activeIndex = '1-2'; break
      case 'projectMsg': this.activeIndex = '1-3'; break
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: 'projectList' }); break
        case '1-2': this.$router.push({ path: 'projectOrg' }); break
        case '1-3': this.$router.push({ path: 'projectMsg' }); break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
