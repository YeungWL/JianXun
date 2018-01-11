<template>
<div class="style-3">
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-push-8">
            <!-- Start Sign In Form -->
            <div  class="fh5co-form animate-box" data-animate-effect="fadeInRight">
                <h2 style="color: #33cccc">数据统计系统后台</h2>
                <div class="form-group">
                    <label for="username" class="sr-only">账号</label>
                    <input type="text" class="form-control" id="username" placeholder="账号" v-model.trim="loginInfo.userAccount" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="password" class="sr-only">密码</label>
                    <input type="password" class="form-control" id="password" placeholder="密码" v-model.trim="loginInfo.password" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="remember"><input type="checkbox" id="remember" v-model.trim="loginInfo.isRemember"> 记住密码</label>
                </div>
                <div class="form-group">
                    <div class="btn btn-lg btn-primary"style="width: 100%" @click="login">登录</div>
                </div>
            </div>
            <!-- END Sign In Form -->
        </div>
    </div>
</div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
  data () {
    return {}
  },
  created () {
      // 检测是否已经登录
    this.$store.commit('CHECKISLOGIN', {paths: this.$route.path, $router: this.$router})
      // 获取公钥
    this.$store.commit('GETPUBLICKEY')
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  methods: {
    login () {
      this.$store.commit('LOGIN')
      // this.$router.push('/userManagement')
    }
  }
}
</script>
<style scoped>
@import '../../assets/css/login.css';
.container{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}
.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;float: none
}
</style>

