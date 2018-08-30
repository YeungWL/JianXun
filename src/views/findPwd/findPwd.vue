<template>
  <div class="login-wrap">
		<header class="login-header">
			<div class="login-header-ctn mx-width clearfix">
				<h1 class="logo">
					<img src="../../assets/images/logo.png" alt="">
				</h1>
			</div>
		</header>
		<article class="login-content">
			<div class="login-content-ctn mx-width">
					<section class="registered-box">
						<h2 class="head">找回密码 </h2>
            <div class="tips"><router-link class="btn-text" tag="span" :to="{name:'login'}">返回登录 ></router-link></div>
            <el-row>
              <el-col :span="24">
                <div class="grid-content">
                  <el-form :model="findPwdForm" :rules="rules" ref="findPwdForm" label-width="100px" class="registered-form">
                    <el-form-item label="手机号码"  prop="phone">
                      <el-input v-model="findPwdForm.phone" placeholder="请输入手机号码" autoComplete="off" @blur="checkUserName()" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="findPwdForm.password"  placeholder="请输入密码(6~16位数字和字母组合)" autoComplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="findPwdForm.checkPass"  placeholder="请重复密码(6~16位数字和字母组合)" autoComplete="off" ></el-input>
                    </el-form-item> 
                    <el-form-item label="验证码" prop="smsCode">
                      <el-input v-model="findPwdForm.smsCode" :maxlength="6" @blur="checkMsmCode()" class="input-code"  placeholder="请输入验证码"></el-input>
                      <el-button  type="primary" class="btn-code-send" v-show="show" @click="sendMsmCode">获取验证码</el-button>
                      <el-button  type="primary" class="btn-code-send" v-show="!show" disabled>重新发送{{count}}s</el-button>
                    </el-form-item>                   
                    <el-form-item>
                      <el-button type="primary" class="btn-submit" @click="handleSubmit()">确定</el-button>
                    </el-form-item>
                  </el-form>

                </div>
              </el-col>
            </el-row>            

					</section>

			</div>
		</article>
 
  </div> 
</template>
<script>
import { toCheckPwd2, isvalidPhone } from '@/utils/validate'
export default {
  name: 'register',
  data() {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          if (!isvalidPhone(this.findPwdForm.phone)) {
            callback(new Error('手机号码格式错误'));    
          }
          callback();
        }
      };    
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!toCheckPwd2(this.findPwdForm.password)) {
            callback(new Error('密码6-16位字符（包含数字和字母两种）'));    
        } else {
          if (this.findPwdForm.checkPass !== '') {
            this.$refs.findPwdForm.validateField('checkPass');
          } 
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!toCheckPwd2(this.findPwdForm.checkPass)) {
            callback(new Error('密码6-16位字符（包含数字和字母两种）'));    
        } else if (value !== this.findPwdForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }; 
    return {
      findPwdForm: {
        phone: '',
        password: '',
        smsCode: '',
        token: this.getToken()     
      },
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' },
        ],
        password: [{ required: true, validator: validatePass, trigger: 'blur'}],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],         
        smsCode: [
          { required: true, message: "验证码不能为空", trigger: "blur"},
          { min: 6, max: 6, message: "长度为4个字符", trigger: "blur"}
        ]        
      },
      checked: true,
      // 倒计时部分
      show: true,
      count: '',
      timer: null             
    }
  },  
  methods: {  
    handleSubmit() {
      this.$refs.findPwdForm.validate((valid) => {
        if (valid) {
          this.$api.findPwd(this.findPwdForm).then( response => {
            if (response.errorCode === '1') {
              let vm = this;
              this.$message({
                showClose: true,
                duration:1200,
                message: '找回密码成功！',
                type: 'success',
                onClose: function(){
                  vm.$router.push('/login');
                }
              });                              
              // this.$message.success('找回密码成功！')
            } else {
              this.$message.warning(response.resultMsg)
            }
          }).catch(error => {
            this.$message.error(error)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    checkUserName(){
      if(!isvalidPhone(this.findPwdForm.phone)){ 
        this.$message.warning('请输入正确的手机号码！')
        return 
      }       
      let prams = {
        userName: this.findPwdForm.phone, 
        actionCode: 'USER_FIND_PWD',
        token: this.getToken()
      }
      this.$api.checkUserName(prams).then( response => {
        if(response.errorCode === '1'){
            this.$message.success('该用户账号可以正常使用！')
        } else {
            this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
      })     
    },
    timeCount(){
      //短信验证码发送倒计时
     const TIME_COUNT = 60;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
    },    
    sendMsmCode(){
      if(!isvalidPhone(this.findPwdForm.phone)){ 
        this.$message.warning('请输入正确的手机号码！')
        return 
      }     
      let prams = {
        phone: this.findPwdForm.phone,
        actionCode: 'USER_FIND_PWD',
        token: this.getToken()
      }
      this.$api.sendMsmCode(prams).then( response => {
        if (response.errorCode === '1') {
            this.$message.success('短信验证码已发送成功！')
            this.timeCount()
        } else {
            this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
     
    },
    checkMsmCode(){
       if (this.findPwdForm.smsCode === '') { 
        this.$message.warning('请输入手机获取到的短信验证码！')
        return 
      }      
      let prams = {
        phone: this.findPwdForm.phone,
        smsCode: this.findPwdForm.smsCode,
        actionCode: 'USER_FIND_PWD',
        token: this.getToken()
      }
      this.$api.checkMsmCode(prams).then( response => {
        if(response.errorCode === '1'){
            this.$message.success('该短信验证码有效！')
        } else {
            this.$message.warning(response.resultMsg)
        }
      }).catch(error => {
        this.$message.error(error)
      })     
    }
  }
}
</script>

<style lang='scss' scoped>
/*-----login----*/
.login-wrap{height:100%;}
.login-wrap {
  .login-header {
    width: 100%;
    height: 80px;
    background-color: #438fe5;
    background-image:url('../../assets/images/header_bg.png');
    background-position:710px bottom;
    background-repeat:no-repeat;
    border: none;
    color: #fff;
    font-size: 14px;
    }
}
.mx-width{width:1000px;margin:0 auto;}
@media screen and (max-width:1000px) {
  .mx-width{width:100%;}
  .full-width{width:auto !important;}
}
.login-header {
  .logo{float:left;margin-top:15px;font-size:26px;color:#fff;font-weight:bold;}
  img{vertical-align:middle;margin-right:10px;}
}

.login-content{height:auto;}
.login-content-ctn{position:relative;}
/*registered*/
.registered-header {
  height:100px;background:#438eb9;box-shadow:0 3px 3px #697D89;
  .logo{float:left;margin-top:15px;font-size:26px;color:#fff;line-height:70px;font-weight:bold;}
  img{height:70px;vertical-align:middle;margin-right:10px;}
}
.login-content-ctn{
  margin-top:30px;background:#fff;border:1px solid #eee;box-shadow:0px 0px 12px rgba(0,0,0,0.1);
  -webkit-box-shadow:0px 0px 12px rgba(0,0,0,0.1);-ms-box-shadow:0px 0px 12px rgba(0,0,0,0.1);-o-box-shadow:0px 0px 12px rgba(0,0,0,0.1);
}
.registered-box{
  width: 460px;
  margin: 0 auto;
  padding:30px;
  .head {
    font-size: 30px;
    color: #666;
    letter-spacing: 1px;
    line-height: 36px;
    padding-bottom:10px;
    margin-bottom:10px;
    font-weight:normal;
    text-align: center;
  }
  .tips {
      position: absolute;
      top: 43px;
      right: 40px;
      font-size: 12px;
      letter-spacing: .4px;
      line-height: 30px;
      text-align: left;
  }
  // h2{font-size:18px;color:#666;border-bottom:1px solid #eee;}
  .input-code{width:58%;}
}
.btn-submit{width:100%;}
.bd-r{border-right:1px dashed #eee;}
// .registered-form{width:64%;}
.has-account{
   h3{font-size:14px;color:#555;}
}
.u-qq,.u-wecat{float:left;width:24px;height:24px;margin-right:8px;background-image:url('../../assets/images/sprite-hash.png')}
.u-qq{background-position: -84px 0px;}
.u-qq:hover{background-position: -196px 0px;}
.u-wecat{background-position: -56px 0px;}
.u-wecat:hover{background-position: -168px 0px;}
.btn-text{color: #409EFF; cursor: pointer;}
</style>
