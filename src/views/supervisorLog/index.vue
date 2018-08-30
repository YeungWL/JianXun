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
  name: 'supervisorLog',
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      asideArr: [
        {title: '施工日志', content: ['日志主页', '资费管理']}
      ]
    }
  },
  created() {
    // console.log(this.$route.name)
    switch (this.$route.name) {
      case 'homeRecord': this.activeIndex = '1-1'; break
      case 'payCharge': this.activeIndex = '1-2'; break
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: 'homeRecord' }); break
        case '1-2': this.$router.push({ path: 'payCharge' }); break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
