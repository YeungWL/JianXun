<template>
  <el-container>
  <el-aside width="200px">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
       :default-active="$route.path"  router>
      <el-menu-item index="/education/group">
        <span slot="title">班组管理</span>
      </el-menu-item>
      <el-menu-item index="/education/worker">
        <span slot="title">工人管理</span>
      </el-menu-item>
      <!--<el-menu-item index="/education/courseware">
        <span slot="title">课件管理</span>
      </el-menu-item>-->
      <el-submenu index="/education/courseware">
        <template slot="title">
          <span>课件管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/education/courseware">全部课件</el-menu-item>
          <el-menu-item index="/education/myCourse">我的课件</el-menu-item>
        </el-menu-item-group>
      </el-submenu>      
      <el-submenu index="/education/exam/examQuestions">
        <template slot="title">
          <span>考试管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/education/exam/examQuestions">考卷管理</el-menu-item>
          <el-menu-item index="/education/exam/examPaper">考题管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/education/eduRecord">
        <span slot="title">教育记录</span>
      </el-menu-item>
      <el-submenu index="/education/expenses/index">
        <template slot="title">
          <span>资费管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/education/expenses/index">订单与消费</el-menu-item>
          <el-menu-item index="/education/expenses/invoice">发票管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>            
    </el-menu>

    <!--<el-menu :default-openeds="openeds" @select="handleSelect" :default-active="activeIndex">
      <el-submenu :index="((index+1)+'')" v-for="(item,index) in asideArr" :key="index">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group v-for="(ele,i) in item.content" :key="i"  >
          <el-menu-item :index="(index+1)+'-'+(i+1)" >{{ele}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>-->
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
      openeds: ['1', '2', '3', '4', '5', '6'],
      activeIndex: '1-1',
      // asideArr: [
      //   {title: '三级教育', content: ['班组管理', '工人管理', '课件管理', '考试管理', '教育记录', '资费管理']}
      // ]
      asideArr: [
        { title: '班组管理', content: ['班组管理'] },
        { title: '工人管理', content: ['工人管理'] },
        { title: '课件管理', content: ['课件管理'] },
        { title: '考试管理', content: ['考卷管理','考题管理'] },
        { title: '教育记录', content: ['教育记录'] },
        { title: '资费管理', content: ['资费管理'] }
      ]      
    }
  },
  created() {
    // console.log(this.$route.name)
    switch (this.$route.name) {
      case 'group': this.activeIndex = '1-1'; break
      case 'worker': this.activeIndex = '2-1'; break
      case 'courseware': this.activeIndex = '3-1'; break
      case 'exam': this.activeIndex = '4-1'; break
      case 'examPaper': this.activeIndex = '4-2'; break
      case 'examQuestions': this.activeIndex = '4-3'; break
      case 'eduRecord': this.activeIndex = '5-1'; break
      case 'expenses': this.activeIndex = '6-1'; break      
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },    
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      switch (key) {
        case '1-1': this.$router.push({ path: '/education/group' }); break
        case '2-1': this.$router.push({ path: '/education/worker' }); break
        case '3-1': this.$router.push({ path: '/education/courseware' }); break
        case '4-1': this.$router.push({ path: '/education/exam' }); break
        case '4-2': this.$router.push({ path: '/education/exam/examQuestions'}); break
        case '4-3': this.$router.push({ path: '/education/exam/examPaper' }); break
        case '5-1': this.$router.push({ path: '/education/eduRecord' }); break
        case '6-1': this.$router.push({ path: '/education/expenses' }); break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
