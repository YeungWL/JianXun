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
						<h2>基本注册信息</h2>
            <el-row>
              <el-col :span="16">
                <div class="grid-content bd-r">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="registered-form">
                    <el-form-item label="用户名">
                      <el-input v-model="ruleForm.userName" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" >
                      <el-input v-model="ruleForm.name"  placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" >
                      <el-input v-model="ruleForm.companyName "  placeholder="公司名称"></el-input>
                    </el-form-item>                    
                    <el-form-item label="设置密码" >
                      <el-input v-model="ruleForm.password"  placeholder="设置密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                      <el-input v-model="ruleForm.pwdRepeat"  placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                      <el-input v-model="ruleForm.code" class="input-code"  placeholder="验证码"></el-input>
                      <span class="yzm-pic">
                        <img src="" alt="验证码">
                        <!--<img @click="switchCode()" v-show="imgShow" :src="imgSrc">-->
                      </span>
                    </el-form-item>
                    <el-form-item label="短信验证码">
                      <el-input v-model="ruleForm.smsCode"  class="input-code"  placeholder="短信验证码"></el-input>
                      <el-button type="primary" >获取短信验证码</el-button>
                    </el-form-item>
                    <el-form-item label="">
                      <el-checkbox label="已阅读" name="type" v-model="checked"></el-checkbox>
                      <el-button type="text"  class="btn-text" >帐号注册申明 </el-button>
                    </el-form-item>                    
                    <el-form-item>
                      <el-button type="primary" class="btn-submit" @click="submitForm('ruleForm')">注册</el-button>
                    </el-form-item>
                  </el-form>

                </div>
                </el-col>
              <el-col :span="8">
                <div class="grid-content pl15">
                  <el-form>
                    <h3>已有建讯互联账号？请直接登录</h3>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm()">登录</el-button>                      
                    </el-form-item>
                    <div class="mt20">
                        <p class="blue">使用第三方账号登录</p>
                        <div class="pt10"><a target="_blank" title="QQ" href="../../assets/images/qqLogin.do" class="u-qq"></a><a target="_blank" title="微信" href="javascript:;" class="u-wecat"></a></div>
                    </div>

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
export default {
  data() {
    //自定义校验规则
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (value === ''){

      } else{
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('username');
        }
        callback();
      }
    };    
    return {
      //验证码图片
      imgSrc: '',
      //是否显示
      imgShow: false,
      //验证码标识
      imgKey: '',
      isAbleCommit: {
        phone: false,
        psw: false,
        code: false
      },
      ruleForm: {
        userName: '',
        name:'',
        companyName: '',
        password: '',
        smsCode: '',
        pwdRepeat: '',
        code: ''           
      },
      rules: {
        userName: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'phone',message: '请输入正确的手机号码', trigger: 'blur,change' }
        ],
        userName: [{ required: true, trigger: "change", message: "用户名不能为空" }],
        password: [{ required: true, trigger: "change", message: "密码不能为空" }],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
          { min: 4, max: 4, trigger: "change", message: "长度为4个字符" }
        ]        
      },
      checked: true          
    }
  },  
  methods: {
    //更换验证码
    switchCode() {
      this.$api.captchas().then(data => {
        this.imgSrc = 'data:image/png;base64,' + data["data"].image_base64
        this.imgKey = data["data"].image_key
      }).catch( error => {
//        this.$message.error("获取验证码失败");
      });
    },    
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
//   mounted() {
//     this.$api.captchas().then(data => {
//       this.imgShow = true
//       this.imgSrc = 'data:image/png;base64,' + data["data"].image_base64
//       this.imgKey = data["data"].image_key
//     });
//     let userName = localStorage.getItem('email');
//     this.infoArr[0] = userName;
//     if(this.$cookie.get(this.$api.ctk)){
//       this.$api.getPersonalData(this.$cookie.get(this.$api.ctk)).then(res=>{
//         this.$router.push('/console');
//       })
//     }
//   }
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
.registered-box{
  margin-top:30px;background:#fff;padding:30px;border:1px solid #eee;box-shadow:0px 0px 12px rgba(0,0,0,0.1);
  -webkit-box-shadow:0px 0px 12px rgba(0,0,0,0.1);-ms-box-shadow:0px 0px 12px rgba(0,0,0,0.1);-o-box-shadow:0px 0px 12px rgba(0,0,0,0.1);
  h2{padding-bottom:10px;margin-bottom:10px;font-size:18px;color:#666;font-weight:normal;border-bottom:1px solid #eee;}
  .input-code{width:58%;}
  .yzm-pic {
    width: 84px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
}
.btn-submit{width:100%;}
.bd-r{border-right:1px dashed #eee;}
.registered-form{width:64%;}
.has-account{
   h3{font-size:14px;color:#555;}
}
.u-qq,.u-wecat{float:left;width:24px;height:24px;margin-right:8px;background-image:url('../../assets/images/sprite-hash.png')}
.u-qq{background-position: -84px 0px;}
.u-qq:hover{background-position: -196px 0px;}
.u-wecat{background-position: -56px 0px;}
.u-wecat:hover{background-position: -168px 0px;}
</style>
