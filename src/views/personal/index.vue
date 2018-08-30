<template>
  <el-container>
  <el-aside width="200px">
    <el-menu :default-openeds="openeds" @select="handleSelect" :default-active="activeIndex">
      <el-submenu :index="((index+1)+'')" v-for="(item,index) in asideArr" :key="index">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group v-for="(ele,i) in item.content" :key="i" >
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
  name: 'personal',
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      asideArr: [
        {title: '个人中心', content: ['基本资料', '学习记录','个人账户','我的收藏','反馈管理']}
      ]
    }
  },
  created() {
    // console.log(this.$route.name)
    switch (this.$route.name) {
      case 'personalInfo': this.activeIndex = '1-1'; break
      case 'personalLearn': this.activeIndex = '1-2'; break
      case 'personalAccount': this.activeIndex = '1-3'; break
      case 'personalCollection': this.activeIndex = '1-4'; break
      case 'personalFeedback': this.activeIndex = '1-5'; break
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: 'personalInfo' }); break
        case '1-2': this.$router.push({ path: 'personalLearn' }); break
        case '1-3': this.$router.push({ path: 'personalAccount' }); break
        case '1-4': this.$router.push({ path: 'personalCollection'}); break
        case '1-5': this.$router.push({ path: 'personalFeedback'}); break
      }
    }
  }
}
</script>

