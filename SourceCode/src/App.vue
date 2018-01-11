<template>
  <div id="app" :class="$store.state.isOpen ? 'nav-sm' : 'nav-md'" >
    
      <!-- <keep-alive>
       <router-view v-if="$route.meta.keepAlive && !$store.state.poll.isRefresh"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && $store.state.poll.isRefresh"></router-view> -->

      <router-view></router-view>
    
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      timer: false,
      screenWidth: document.body.clientWidth
    }
  },
  created () {
    // console.log(this.$route.meta.keepAlive, this.$store.state.poll.isRefresh)
    this.$store.state.poll.paths = this.$route.path
  },
  mounted () {
    // console.log('keepAlive:', this.$route.meta.keepAlive, this.$store.state.poll.isRefresh)
    this.$store.state.poll.paths = this.$route.path
    let that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    // 防止频繁 触发 resize 函数，导致页面很卡的 问题
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          if (that.$store.state.myChartList.length > 0) {
            that.$store.state.myChartList.forEach((myChart) => {
              myChart.resize()
            })
          }
          that.timer = false
        }, 200)
      }
    },
    '$route.path' (val) {
     // console.log('value', this.$route.meta.keepAlive, this.$store.state.isRefresh, this.$store.state.isLoadPath)
      this.$store.state.poll.isLoadPath = true
    }
  }
}
</script>
<style>
@import './assets/css/custom.min.css';
@import './assets/font/css/font-awesome.min.css';
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
