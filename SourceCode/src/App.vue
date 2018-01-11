<template>
  <div id="app" :class="$store.state.isOpen ? 'nav-sm' : 'nav-md'" >
    
      <keep-alive>
       <router-view v-if="$route.meta.keepAlive && $store.state.isRefresh && $store.state.isLoadPath"></router-view>
      </keep-alive>
      <router-view v-if="!($route.meta.keepAlive && $store.state.isRefresh && $store.state.isLoadPath)"></router-view>
    
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
    this.$store.state.paths = this.$route.path
    console.log(5325326)
  },
  mounted () {
    this.$store.state.paths = this.$route.path
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
      console.log(5432654724)
      this.$store.state.isLoadPath = true
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
