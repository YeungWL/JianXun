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
</style>

