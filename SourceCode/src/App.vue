<template>
  <div id="app" :class="$store.state.isOpen ? 'nav-sm' : 'nav-md'" >
    <router-view/>
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
  mounted () {
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
        }, 400)
      }
    }
  }
}
</script>
<style>
@import './assets/font/css/font-awesome.min.css';
@import './assets/css/custom.min.css';
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
