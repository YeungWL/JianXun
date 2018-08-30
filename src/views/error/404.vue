<template>
  <div>
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="../../assets/images/404.png" alt="404">
        <img class="pic-404__child left" src="../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="../../assets/images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有建讯互联</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a href="/" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      message() {
        return '悄悄的告诉你这个页面不存在......'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "404.scss";
</style>
