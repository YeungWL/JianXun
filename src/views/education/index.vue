<template>
  <el-container>
  <el-aside width="200px">
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
export default {
  name: 'system',
  data() {
    return {
      openeds: ['1'],
      activeIndex: '1-1',
      asideArr: [
        {title: '三级教育', content: ['班组管理', '工人管理', '课件管理', '考试管理', '教育记录', '资费管理']}
      ]
    }
  },
  created() {
    // console.log(this.$route.name)
    switch (this.$route.name) {
      case 'group': this.activeIndex = '1-1'; break
      case 'worker': this.activeIndex = '1-2'; break
      case 'courseware': this.activeIndex = '1-3'; break
      case 'exam': this.activeIndex = '1-4'; break
      case 'eduRecord': this.activeIndex = '1-5'; break
      case 'expenses': this.activeIndex = '1-6'; break      
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: '/education/group' }); break
        case '1-2': this.$router.push({ path: '/education/worker' }); break
        case '1-3': this.$router.push({ path: '/education/courseware' }); break
        case '1-4': this.$router.push({ path: '/education/exam' }); break
        case '1-5': this.$router.push({ path: '/education/eduRecord' }); break
        case '1-6': this.$router.push({ path: '/education/expenses' }); break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
